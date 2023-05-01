const axios = require("axios");
const CustomerOrder = require("../models/CustomerOrder");
const url = require("../controllers/url");
const completeOrder = async (req, res) => {
  try {
    const customer = req.session.user;

    // Check if the customer is logged in
    if (!customer) {
      return res.status(401).json({ error: "You must be logged in to complete your order" });
    }

    // Find the current order for the customer that is not completed
    const customerOrder = await CustomerOrder.findOne({ customer: customer._id, completed: false });

    if (!customerOrder) {
      return res.status(404).json({ error: "No active order found" });
    }

    // Mark the order as completed
    customerOrder.completed = true;
    await customerOrder.save();

    // Process each product in the order
    const products = customerOrder.products;
    for (const product of products) {
      const orderId = product.id;
      console.log(orderId);
      
    }
    const sellingCompanyUrl = `${url}/AdminService-1.0-SNAPSHOT/api/selling/sendOrder`;
      // Send the order data to the selling company
      await axios.put(sellingCompanyUrl,  customerOrder );

    res.status(200).json(customerOrder);
  } catch (error) {
    res.status(500).json({ error: error.message  });
  }
};

module.exports = completeOrder;
