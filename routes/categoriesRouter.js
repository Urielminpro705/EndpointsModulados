const express = require("express");
const categoriesServices = require("../services/categoriesServices");

const router = express.Router();
const service = new categoriesServices();

/**
 * @swagger
 * /categories:
 *  get:
 *      summary: Obtiene una lista de categorias
 *      responses:
 *          200:
 *              description: Lista de categorias
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
 *                                          categoryName:
 *                                              type: string
 *                                          description:
 *                                              type: string
 *                                          active:
 *                                              type: boolean
 */
router.get("/", (req, res) => {
    const response = service.getAllCategories();

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

/**
 * @swagger
 * /categories/{id}:
 *  get:
 *      summary: Obtiene una categoria por id
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: ID de la categoria
 *              schema:
 *                  type: string
 *      responses:
 *          200:
 *              description: Categoria por id
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
 *                                      categoryName:
 *                                          type: string
 *                                      description:
 *                                          type: string
 *                                      active:
 *                                          type: boolean
 */
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const response = service.getCategoryById(id);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

/**
 * @swagger
 * /categories:
 *  post:
 *      summary: Crear una nueva categoria
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          categoryName:
 *                              type: string
 *                          description:
 *                              type: string
 *                          active:
 *                              type: boolean
 *      responses:
 *          201:
 *              description: Se creo la categoria
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
 *                                      categoryName:
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
router.post("/", (req, res) => {
    const response = service.createCategory(req.body);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

/**
 * @swagger
 * /categories/{id}:
 *  patch:
 *      summary: Actualizar valores de una categoria por ID
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Id de la categoria
 *              schema:
 *                  type: number
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          categoryName:
 *                              type: string
 *                          description:
 *                              type: string
 *                          active:
 *                              type: boolean
 *      responses:
 *          200:
 *              description: Se actualizó la categoria
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
 *                                      categoryName:
 *                                          type: string
 *                                      description:
 *                                          type: string
 *                                      active:
 *                                          type: boolean
 *          404:
 *              description: No se encontro la categoria
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
    const response = service.updateCategory(id, req.body);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

/**
 * @swagger
 * /categories/{id}:
 *  delete:
 *      summary: Eliminar una categoria por ID
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Id de la categoria
 *              schema:
 *                  type: number
 *      responses:
 *          200:
 *              description: Se eliminó la categoria
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
 *              description: No se encontro la categoria
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
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const response = service.deleteCategory(id);

    res.status(response.statusCode).json({
        message: response.message,
        data: response.data
    });
});

module.exports = router;