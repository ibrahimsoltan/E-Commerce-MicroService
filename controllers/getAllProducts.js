// Controller to fetch all products from GET request
const axios = require("axios");
const Products = require("../models/product");

const getAllProducts = async (req, res) => {
    try {
        const url = "https://1d5b-196-157-37-120.ngrok-free.app/AdminService-1.0-SNAPSHOT/api/selling/viewproducts"
        // Find all products
        const products = await axios.get(url);

        // Send fetched JSON data in the response
        res.json(products.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getAllProducts;

