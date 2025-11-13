const Product = require("../models/Product");
const Brand = require("../models/Brand");
const Category = require("../models/Category");

class productsServices {
    async getAllProducts (query) {
        const { category, brand } = query;
        let filtros = {};
    
        try {
            if (brand) {
                const brandId = await this.obtenerBrandId(brand);
                if (brandId) {
                    filtros.brandId = brandId;
                    // result = await Product.find({ brandId });
                } else {
                    return {
                        succeded: false,
                        statusCode: 404,
                        message: 'Brand Not Found',
                        data: {}
                    }
                }
            }
        
            if (category) {
                const categoryId = await this.obtenerCategoryId(category);
                if (categoryId) {
                    filtros.categoryId = categoryId;
                    // result = await Product.find({ categoryId });
                } else {
                    return {
                        succeded: false,
                        statusCode: 404,
                        message: 'Category Not Found',
                        data: {}
                    }
                }
            }
        
            const result = await Product.find(filtros);
            
            return {
                succeded: true,
                statusCode: 200,
                message: "OK",
                data: result
            }
        } catch(err) {
            console.log(err);
            return {
                succeded: false,
                statusCode: 500,
                message: "Error interno del servidor",
                data: []
            }
        }
    }

    getProductById (id) {
        return Product.findOne({ id })
            .then(product => {
                return {
                    succeded: true,
                    statusCode: 200,
                    message: "OK",
                    data: product
                }
            })
            .catch(err => {
                console.log(err);
                return {
                    succeded: false,
                    statusCode: 500,
                    message: "Error interno del servidor",
                    data: {}
                }
            })
    }

    async createProduct (newData) {
        const { image, productName, description, price, stock, categoryId, brandId } = newData;
        
        const missingFields = [];
    
        if (!image) missingFields.push("image");
        if (!productName) missingFields.push("productName");
        if (!description) missingFields.push("description");
        if (!price) missingFields.push("price");
        if (!stock) missingFields.push("stock");
        if (!categoryId) missingFields.push("categoryId");
        if (!brandId) missingFields.push("brandId");
    
        if (missingFields.length > 0) {
            return {
                succeded: true,
                statusCode: 400,
                message: `Missing required fields: ${missingFields.join(", ")}`,
                data: {}
            }
        }
        
        if (!(await this.doesCategoryExist(categoryId))) {
            return {
                succeded: true,
                statusCode: 404,
                message: "categoryId does not exist",
                data: {}
            }
        }

        if (!(await this.doesBrandExist(brandId))) {
            return {
                succeded: true,
                statusCode: 404,
                message: "brandId does not exist",
                data: {}
            }
        }

        const numRegistros = await Brand.countDocuments();
    
        const newProduct = {
            id: numRegistros + 1,
            image,
            productName,
            description,
            price,
            stock,
            categoryId,
            brandId
        }
    
        return Product.create(newProduct)
            .then(data => {
                return {
                    succeded: true,
                    statusCode: 201,
                    message: "Product created",
                    data: data
                }
            })
            .catch(err => {
                console.log(err);
                return {
                    succeded: false,
                    statusCode: 500,
                    message: "Error interno del servidor",
                    data: {}
                }
            });
    }

    async updateProduct (id, newData) {
        const { image, productName, description, price, stock, categoryId, brandId } = newData;
        var product = {}

        if (brandId && !(await this.doesBrandExist(brandId))) {
            return {
                succeded: false,
                statusCode: 404,
                message: "brandId does not exist",
                data: {}
            }
        }

        if (categoryId && !(await this.doesCategoryExist(categoryId))) {
            return {
                succeded: false,
                statusCode: 404,
                message: "categoryId does not exist",
                data: {}
            }
        }
        
        if (image) product.image = image;
        if (productName) product.productName = productName;
        if (description) product.description = description;
        if (price) product.price = price;
        if (stock) product.stock = stock;
        if (categoryId) product.categoryId = categoryId;
        if (brandId) product.brandId = brandId;

        return Product.updateOne(
            { id },
            { $set: product }
        )
            .then(data => {
                if (data.matchedCount > 0) {
                    return {
                        succeded: true,
                        statusCode: 200,
                        message: "Updated",
                        data: product
                    }
                } else {
                    return {
                        succeded: false,
                        statusCode: 404,
                        message: 'Product Not Found',
                        data: {}
                    }
                }
            })
            .catch(err => {
                console.log(err);
                return {
                    succeded: false,
                    statusCode: 500,
                    message: "Error interno del servidor",
                    data: {}
                }
            })
    }

    deleteProduct (id) {
        return Product.deleteOne({ id })
            .then(data => {
                if (data.deletedCount > 0) {
                    return {
                        succeded: true,
                        statusCode: 200,
                        message: "Deleted",
                        data: {id}
                    }
                } else {
                    return {
                        succeded: false,
                        statusCode: 404,
                        message: 'Product Not Found',
                        data: {}
                    }
                }
            })
            .catch(err => {
                console.log(err);
                return {
                    succeded: false,
                    statusCode: 500,
                    message: "Error interno del servidor",
                    data: {}
                }
            })
    }

    obtenerBrandId(brandName) {
        return Brand.findOne({ brandName })
            .then(data => {
                return data ? data.id : null;
            })
            .catch(err => {
                console.log(err);
                return null;
            });
    }

    obtenerCategoryId(categoryName) {
        return Category.findOne({ categoryName })
            .then(data => {
                return data ? data.id : null;
            })
            .catch(err => {
                console.log(err);
                return null;
            });
    }

    doesBrandExist(brandId) {
        return Brand.findOne({ id: brandId })
            .then(brand => {
                return brand ? true : false;
            })
            .catch(err => {
                console.log(err);
                return false;
            });
    }

    doesCategoryExist(categoryId) {
        return Category.findOne({ id: categoryId })
            .then(category => {
                return category ? true : false;
            })
            .catch(err => {
                console.log(err);
                return false;
            });
    }
}

module.exports = productsServices;