const express = require("express");

const router = express.Router();
const jwtHandler = require("../middleware/jwtHandler");
const roleHandler = require("../middleware/roleHandler");

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controller/productcontroller");


// Public routes
router.get("/products", getAllProducts);

router.get("/products/:id", getProductById);


// Admin-only routes
router.post(
    "/products",
    jwtHandler,
    roleHandler("admin"),
    createProduct
);

router.put(
    "/products/:id",
    jwtHandler,
    roleHandler("admin"),
    updateProduct
);

router.delete(
    "/products/:id",
    jwtHandler,
    roleHandler("admin"),
    deleteProduct
);


module.exports = router;