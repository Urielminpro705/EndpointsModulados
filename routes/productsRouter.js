const express = require("express");
const productsServices = require("../services/productsServices");

const router = express.Router();
const service = new productsServices();

router.get("/", (req, res) => {
    const response = service.getAllProducts(req.query);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const response = service.getProductById(id);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

router.post("/", (req, res) => {
    const response = service.createProduct(req.body);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const response = service.updateProduct(id, req.body);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const response = service.deleteProduct(id);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

module.exports = router;