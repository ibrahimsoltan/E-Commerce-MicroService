// Controller to fetch all products from GET request
const axios = require("axios");
const Products = require("../models/product");
const url = require("../controllers/url");

const getAllProducts = async (req, res) => {
    try {
        const url = `${url}/AdminService-1.0-SNAPSHOT/api/selling/viewproducts`
        // Find all products
        const products = await axios.get(url);

        // Send fetched JSON data in the response
        res.json(products.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getAllProducts;

