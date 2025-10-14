const express = require("express");
const brandsServices = require("../services/brandsServices");

const router = express.Router();
const service = new brandsServices();

router.get("/", (req, res) => {
    const response = service.getAllBrands();

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const response = service.getBrandById(id);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

router.post("/", (req, res) => {
    const response = service.createBrand(req.body);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const response = service.updateBrand(id, req.body);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const response = service.deleteBrand(id)

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

module.exports = router;