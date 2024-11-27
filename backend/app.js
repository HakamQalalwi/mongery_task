const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
    console.log(`Server running on Localhost:${PORT}`);
});
