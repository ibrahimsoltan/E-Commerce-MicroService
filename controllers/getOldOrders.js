const Order = require("../models/order");

const getOldOrders = async (req, res) => {
  try {
    const customer = req.session.user;

    // Check if the customer is logged in
    if (!customer) {
      return res.status(401).json({ error: "You must be logged in to view your old orders" });
    }

    // Find all completed orders for the customer
    const orders = await Order.find({ customer: customer._id, completed: true });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the customer's old orders" });
  }
};

module.exports = getOldOrders;

