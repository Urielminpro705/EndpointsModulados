const express = require("express");
const usersServices = require("../services/usersServices");

const router = express.Router();
const service = new usersServices();

router.get("/", (req, res) => {
    const response = service.getAllUsers();

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    })
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const response = service.getUserById(id);
    
    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    })
});

router.post("/", (req, res) => {
    const response = service.createUser(req.body);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    })
});

router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const response = service.updateUser(id, req.body);
    
    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    })
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const response = service.deleteUser(id);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    })
});

module.exports = router;