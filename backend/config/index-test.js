import db from "../config/dbconnect.js" 

async function getSalesReportWithoutAggregation(db) {
  const orders = await db.collection('orders')
    .find({ status: 'completed' })
    .toArray();
  const report = {};
  for (const order of orders) {
    const key = order.category;
    if (!report[key]) {
      report[key] = { totalRevenue: 0, totalOrders: 0, totalQuantity: 0 };
    }
    report[key].totalRevenue += order.price * order.quantity;
    report[key].totalOrders += 1;
    report[key].totalQuantity += order.quantity;
  }

  const sorted = Object.entries(report)
    .map(([category, data]) => ({ category, ...data }))
    .sort((a, b) => b.totalRevenue - a.totalRevenue);

  return sorted;
}

async function getSalesReportWithAggregation(db) {
  const report = await db.collection('orders').aggregate([
    
    { $match: { status: 'completed' } },

    {
      $group: {
        _id: '$category',
        totalRevenue: { $sum: { $multiply: ['$price', '$quantity'] } },
        totalOrders: { $sum: 1 },
        totalQuantity: { $sum: '$quantity' },
        avgOrderValue: { $avg: { $multiply: ['$price', '$quantity'] } }
      }
    },

    // Stage 3: Reshape the output
    {
      $project: {
        _id: 0,
        category: '$_id',
        totalRevenue: 1,
        totalOrders: 1,
        totalQuantity: 1,
        avgOrderValue: { $round: ['$avgOrderValue', 2] }
      }
    },

    // Stage 4: Sort by revenue (done in DB, uses indexes/memory efficiently)
    { $sort: { totalRevenue: -1 } }
  ]).toArray();

  return report;
}
// Benefits: only the FINAL aggregated result is sent over the network,
// computation happens inside MongoDB's optimized engine,
// scales much better with large datasets, fewer lines of app code.


// ============================================
// BONUS: Aggregation with $lookup (joins) — hard to replicate cleanly without it
// ============================================
async function getOrdersWithCustomerDetails(db) {
  return db.collection('orders').aggregate([
    { $match: { status: 'completed' } },
    {
      $lookup: {
        from: 'customers',
        localField: 'customerId',
        foreignField: '_id',
        as: 'customerInfo'
      }
    },
    { $unwind: '$customerInfo' },
    {
      $project: {
        product: 1,
        price: 1,
        quantity: 1,
        'customerInfo.name': 1,
        'customerInfo.email': 1
      }
    }
  ]).toArray();
}

// ============================================
// Quick benchmark helper (run both and compare time)
// ============================================