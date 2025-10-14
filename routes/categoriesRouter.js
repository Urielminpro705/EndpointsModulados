const express = require("express");
const categoriesServices = require("../services/categoriesServices");

const router = express.Router();
const service = new categoriesServices();

router.get("/", (req, res) => {
    const response = service.getAllCategories();

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const response = service.getCategoryById(id);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

router.post("/", (req, res) => {
    const response = service.createCategory(req.body);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const response = service.updateCategory(id, req.body);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const response = service.deleteCategory(id);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

module.exports = router;