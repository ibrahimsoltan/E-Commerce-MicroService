const Customer = require("../models/customer");

const getAllCustomers = async (req, res) => {
    try {
        // Find all customers from the database
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getAllCustomers;
