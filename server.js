
const express = require("express");

const apirouter = require("./route/userroute");
const productrouter = require("./route/productroute");

const errorHandler = require("./middleware/errorHandler");

const PORT = 5000;

const app = express();

app.use(express.json());


// User APIs
app.use("/api/auth", apirouter);


// Product APIs
app.use("/api", productrouter);


// Error handler
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});