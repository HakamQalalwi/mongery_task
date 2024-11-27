const ordersData = require("../data/orders.json");
const {
    calculateOrderProfit,
    calculateProductProfit,
} = require("../utils/calculateProfit");

// Get all orders
exports.getOrders = (req, res) => {
    res.status(200).json(ordersData.orders);
};

// Calculate profitability
exports.calculateProfit = (req, res) => {
    const { type, currency } = req.query;

    // Validate query params
    if (!type || (type !== "order" && type !== "product")) {
        return res
            .status(400)
            .json({ error: "Invalid type. Use 'order' or 'product'." });
    }

    if (!currency || (currency !== "USD" && currency !== "TL")) {
        return res
            .status(400)
            .json({ error: "Invalid currency. Use 'USD' or 'TL'." });
    }

    // Calculate profitability
    let result;
    if (type === "order") {
        result = calculateOrderProfit(ordersData.orders, currency);
    } else if (type === "product") {
        result = calculateProductProfit(ordersData.orders, currency);
    }

    res.status(200).json(result);
};
