const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorHelper");
const productrepository = require("../repository/productrepository");


// GET ALL PRODUCTS
const getAllProducts = asyncHandler(async (req, res, next) => {

    const products = await productrepository.getAllProducts();

    if (products.length === 0) {
        throw new ErrorResponse(404, "No products found");
    }

    res.status(200).json({
        message: "Successfully fetched all products",
        data: products
    });

});


// GET PRODUCT BY ID
const getProductById = asyncHandler(async (req, res, next) => {

    const productid = req.params.id;

    const product = await productrepository.getProductById(productid);

    if (product.length === 0) {
        throw new ErrorResponse(404, "No product found");
    }

    res.status(200).json({
        message: "Successfully fetched product",
        data: product[0]
    });

});


// CREATE PRODUCT
const createProduct = asyncHandler(async (req, res, next) => {

    const {
        title,
        image,
        price,
        offerprice
    } = req.body;

    if (!title || !price) {
        throw new ErrorResponse(400, "Title and price are required");
    }

    const createdProduct = await productrepository.createProduct(
        title,
        image,
        price,
        offerprice
    );

    res.status(201).json({
        message: "Successfully created a new product",
        data: createdProduct[0]
    });

});


// UPDATE PRODUCT
const updateProduct = asyncHandler(async (req, res, next) => {

    const productid = req.params.id;

    const {
        title,
        image,
        price,
        offerprice
    } = req.body;

    // Check whether product exists
    const existingProduct = await productrepository.getProductById(productid);

    if (existingProduct.length === 0) {
        throw new ErrorResponse(404, "Product not found");
    }

    const updatedProduct = await productrepository.updateProduct(
        productid,
        title,
        image,
        price,
        offerprice
    );

    res.status(200).json({
        message: "Successfully updated product",
        data: updatedProduct[0]
    });

});


// DELETE PRODUCT
const deleteProduct = asyncHandler(async (req, res, next) => {

    const productid = req.params.id;

    // Check whether product exists
    const existingProduct = await productrepository.getProductById(productid);

    if (existingProduct.length === 0) {
        throw new ErrorResponse(404, "Product not found");
    }

    const deletedProduct = await productrepository.deleteProduct(productid);

    res.status(200).json({
        message: "Successfully deleted product",
        data: deletedProduct[0]
    });

});


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};