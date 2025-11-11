const express = require("express");
const productsServices = require("../services/productsServices");

const router = express.Router();
const service = new productsServices();

/**
 * @swagger
 * /products:
 *  get:
 *      summary: Obtiene una lista de productos
 *      tags:
 *          -   Products
 *      parameters:
 *          -   in: query
 *              name: category
 *              required: false
 *              description: Filtrar por categoria
 *              schema:
 *                  type: string
 *          -   in: query
 *              name: brand
 *              required: false
 *              description: Filtrar por marca
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: Lista de productos
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
 *                                          image: 
 *                                              type: string
 *                                          productName: 
 *                                              type: string
 *                                          description: 
 *                                              type: string
 *                                          price: 
 *                                              type: string
 *                                          stock: 
 *                                              type: number
 *                                          categoryId: 
 *                                              type: number
 *                                          brandId: 
 *                                              type: number
 *          404:
 *              description: No se encontro la marca o la categoria
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
 *                                      example: {}
 */
router.get("/", (req, res) => {
    const response = service.getAllProducts(req.query);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

/**
 * @swagger
 * /products/{id}:
 *  get:
 *      summary: Obtiene un producto por ID
 *      tags:
 *          -   Products
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: ID del producto
 *              schema:
 *                  type: number
 *      responses:
 *          200:
 *              description: Producto por id
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
 *                                      image: 
 *                                          type: string
 *                                      productName: 
 *                                          type: string
 *                                      description: 
 *                                          type: string
 *                                      price: 
 *                                          type: string
 *                                      stock: 
 *                                          type: number
 *                                      categoryId: 
 *                                          type: number
 *                                      brandId: 
 *                                          type: number
 */
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const response = service.getProductById(id);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

/**
 * @swagger
 * /products:
 *  post:
 *      summary: Crear un nuevo producto
 *      tags:
 *          -   Products
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          image: 
 *                              type: string
 *                          productName: 
 *                              type: string
 *                          description: 
 *                              type: string
 *                          price: 
 *                              type: string
 *                          stock: 
 *                              type: number
 *                          categoryId: 
 *                              type: number
 *                          brandId: 
 *                              type: number
 *      responses:
 *          201:
 *              description: Se creo el producto
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
 *                                      image: 
 *                                          type: string
 *                                      productName: 
 *                                          type: string
 *                                      description: 
 *                                          type: string
 *                                      price: 
 *                                          type: string
 *                                      stock: 
 *                                          type: number
 *                                      categoryId: 
 *                                          type: number
 *                                      brandId: 
 *                                          type: number
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
 *          404:
 *              description: La marca o la categoria no existen
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
router.post("/", (req, res) => {
    const response = service.createProduct(req.body);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

/**
 * @swagger
 * /products/{id}:
 *  patch:
 *      summary: Actualizar un producto por ID
 *      tags:
 *          -   Products
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: ID del producto
 *              schema:
 *                  type: number     
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          image: 
 *                              type: string
 *                          productName: 
 *                              type: string
 *                          description: 
 *                              type: string
 *                          price: 
 *                              type: string
 *                          stock: 
 *                              type: number
 *                          categoryId: 
 *                              type: number
 *                          brandId: 
 *                              type: number
 *      responses:
 *          200:
 *              description: Se actualizó el producto
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
 *                                      image: 
 *                                          type: string
 *                                      productName: 
 *                                          type: string
 *                                      description: 
 *                                          type: string
 *                                      price: 
 *                                          type: string
 *                                      stock: 
 *                                          type: number
 *                                      categoryId: 
 *                                          type: number
 *                                      brandId: 
 *                                          type: number
 *          404:
 *              description: No se encontro el producto y/o la marca y/o la categoria no existen
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
router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const response = service.updateProduct(id, req.body);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *      summary: Eliminar un producto por ID
 *      tags:
 *          -   Products
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Id del producto
 *              schema:
 *                  type: number
 *      responses:
 *          200:
 *              description: Se eliminó la el producto
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
 */
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const response = service.deleteProduct(id);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

module.exports = router;