const axios = require("axios");
const CustomerOrder = require("../models/CustomerOrder");

const completeOrder = async (req, res) => {
  try {
    const customer = req.session.user;

    // Check if the customer is logged in
    if (!customer) {
      return res.status(401).json({ error: "You must be logged in to complete your order" });
    }

    // Find the current order for the customer that is not completed
    const order = await CustomerOrder.findOne({ customer: customer._id, completed: false });

    if (!order) {
      return res.status(404).json({ error: "No active order found" });
    }

    // Mark the order as completed
    order.completed = true;
    await order.save();

    // Process each product in the order
    const products = order.products;
    for (const product of products) {
      const productId = product.id;
      console.log(productId);
      const sellingCompanyUrl = `https://1d5b-196-157-37-120.ngrok-free.app/AdminService-1.0-SNAPSHOT/api/selling/sellproduct/${productId}`;
      // Send the order data to the selling company
      await axios.put(sellingCompanyUrl, { productId, customer });
    }

    res.status(200).json({ message: "Order completed successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = completeOrder;
