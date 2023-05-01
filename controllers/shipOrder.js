const CustomerOrder = require("../models/CustomerOrder");

const shipOrder = async (req, res) => {
    try {
        console.log(req.body);
        
        const orderId = req.body._id;
        const order = await CustomerOrder.findById(orderId);
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        order.shipped = true;
        await order.save();
        res.status(200).json({ message: "Order has been shipped" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = shipOrder;
