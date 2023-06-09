const CustomerOrder = require("../models/CustomerOrder");

const addToOrder = async (req, res) => {
  try {
    const product = req.body;
    
    console.log("product", product);
    console.log("req.session.user", req.session.user);

    const customer = req.session.user;
    const customerName = customer.email;
    const customerAddress = customer.address;

    // Check if the customer is logged in
    if (!customer) {
      return res.status(401).json({ error: "You must be logged in to add a product to the order" });
    }

    // Find an existing order for the current customer that is not completed
    let order = await CustomerOrder.findOne({ customer: customer._id, completed: false });

    // If an order doesn't exist, create a new one
    if (!order) {
      order = new CustomerOrder({
        customer: customer._id,
        products: [product],
        total: product.price,
        completed: false,
        customerName: customerName,
        customerAddress: customerAddress
      });
    } else {
      // If the order exists, add the product to the order
      order.products.push(product);
      order.total += product.price;
    }

    // Save the order
    await order.save();

    res.status(200).json({order});
  } catch (error) {
    // res.status(500).json({ error: "An error occurred while adding the product to the order" });
    res.status(500).json({ error: error.message });
  }
};

module.exports = addToOrder;
