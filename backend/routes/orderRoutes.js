const express = require("express");
const {
    getOrders,
    calculateProfit,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/", getOrders);

router.get("/profitability", calculateProfit);

module.exports = router;
