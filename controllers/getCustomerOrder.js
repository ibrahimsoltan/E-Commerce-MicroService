const Order = require("../models/order");

const getCustomerOrder = async (req, res) => {
  try {
    const customer = req.session.user;

    // Check if the customer is logged in
    if (!customer) {
      return res.status(401).json({ error: "You must be logged in to view your order" });
    }

    // Find the current order for the customer that is not completed
    const order = await Order.findOne({ customer: customer._id, completed: false });

    if (!order) {
      return res.status(404).json({ error: "No active order found" });
    }

    // Retrieve the products from the order
    const products = order.products;

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the customer's order" });
  }
};


module.exports = getCustomerOrder;
