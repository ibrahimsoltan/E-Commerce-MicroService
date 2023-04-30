const Order = require("../models/order");

const removeFromOrder = async (req, res) => {
  try {
    const productId = req.params.id;
    const customer = req.session.user;

    // Check if the customer is logged in
    if (!customer) {
      return res.status(401).json({ error: "You must be logged in to remove a product from the order" });
    }

    // Find an existing order for the current customer that is not completed
    let order = await Order.findOne({ customer: customer._id, completed: false });

    // If the order doesn't exist or there are no products in the order, return an error
    if (!order || order.products.length === 0) {
      return res.status(400).json({ error: "No products to remove from the order" });
    }

    // Find the product to be removed
    const productIndex = order.products.findIndex(product => product.id && product.id.toString() === productId);

    // If the product is not found, return an error
    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in the order" });
    }

    // Remove the product from the order
    const removedProduct = order.products.splice(productIndex, 1)[0];
    order.total -= removedProduct.price;

    // Save the updated order
    await order.save();

    res.status(200).json({ message: "Product removed from the order", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = removeFromOrder;
