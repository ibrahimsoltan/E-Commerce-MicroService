const Order = require("../models/order");

const addToOrder = async (req, res) => {
  try {
    const product = req.body;
    const customer = req.session.user;

    // Check if the customer is logged in
    if (!customer) {
      return res.status(401).json({ error: "You must be logged in to add a product to the order" });
    }

    // Find an existing order for the current customer that is not completed
    let order = await Order.findOne({ customer: customer._id, completed: false });

    // If an order doesn't exist, create a new one
    if (!order) {
      order = new Order({
        customer: customer._id,
        products: [product],
        total: product.price,
        completed: false,
      });
    } else {
      // If the order exists, add the product to the order
      order.products.push(product);
      order.total += product.price;
    }

    // Save the order
    await order.save();

    res.status(200).json({ message: "Product added to the order", order });
  } catch (error) {
    // res.status(500).json({ error: "An error occurred while adding the product to the order" });
    res.status(500).json({ error: error.message });
  }
};

module.exports = addToOrder;
