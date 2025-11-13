const express = require("express");
const brandsServices = require("../services/brandsServices");

const router = express.Router();
const service = new brandsServices();

/**
 * @swagger
 * /brands:
 *  get:
 *      summary: Obtiene una lista de marcas
 *      tags:
 *          -   Brands
 *      responses:
 *          200:
 *              description: Lista de marcas
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          id:
 *                                              type: number
 *                                          brandName:
 *                                              type: string
 *                                          description:
 *                                              type: string
 *                                          active:
 *                                              type: boolean
 */
router.get("/", async (req, res) => {
    const response = await service.getAllBrands();
    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

/**
 * @swagger
 * /brands/{id}:
 *  get:
 *      summary: Obtiene una marca por id
 *      tags:
 *          -   Brands
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: ID de la marca
 *              schema:
 *                  type: number
 *      responses:
 *          200:
 *              description: Marca por id
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: number
 *                                      brandName:
 *                                          type: string
 *                                      description:
 *                                          type: string
 *                                      active:
 *                                          type: boolean
 */
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const response = await service.getBrandById(id);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

/**
 * @swagger
 * /brands:
 *  post:
 *      summary: Crear una nueva marca
 *      tags:
 *          -   Brands
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          brandName:
 *                              type: string
 *                          description:
 *                              type: string
 *                          active:
 *                              type: boolean
 *      responses:
 *          201:
 *              description: Se creo la marca
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      id: 
 *                                          type: number
 *                                      brandName:
 *                                          type: string   
 *                                      description:
 *                                          type: string
 *                                      active:
 *                                          type: boolean
 *          400:
 *              description: Faltan atributos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  example: {}                            
 */
router.post("/", async (req, res) => {
    const response = await service.createBrand(req.body);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

/**
 * @swagger
 * /brands/{id}:
 *  patch:
 *      summary: Actualizar valores de una marca por ID
 *      tags:
 *          -   Brands
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Id de la marca
 *              schema:
 *                  type: number
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          brandName:
 *                              type: string
 *                          description:
 *                              type: string
 *                          active:
 *                              type: boolean
 *      responses:
 *          200:
 *              description: Se actualizó la marca
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: number
 *                                      brandName:
 *                                          type: string
 *                                      description:
 *                                          type: string
 *                                      active:
 *                                          type: boolean
 *          404:
 *              description: No se encontro la marca
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  example: {}
 */
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const response = await service.updateBrand(id, req.body);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

/**
 * @swagger
 * /brands/{id}:
 *  delete:
 *      summary: Eliminar una marca por ID
 *      tags:
 *          -   Brands
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Id de la marca
 *              schema:
 *                  type: number
 *      responses:
 *          200:
 *              description: Se eliminó la marca
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: number     
 *          404:
 *              description: No se encontro la marca
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  example: {}        
 *          409:
 *              description: No puede eliminar por que esta asociada a productos existentes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  example: {}        
 */
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const response = await service.deleteBrand(id)

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

module.exports = router;