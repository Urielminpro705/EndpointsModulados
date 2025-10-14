const { products, brands, categories } = require("../data/data");

class productsServices {
    getAllProducts (query) {
        const { category, brand } = query;
        let result = products;
    
        if (brand) {
            const brandId = this.obtenerBrandId(brand);
            if (brandId) {
                result = products.filter(p => p.brandId === brandId);
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
            const categoryId = this.obtenerCategoryId(category);
            if (categoryId) {
                result = products.filter(p => p.categoryId === categoryId);
            } else {
                return {
                    succeded: false,
                    statusCode: 404,
                    message: 'Category Not Found',
                    data: {}
                }
            }
        }
    
        return {
            succeded: true,
            statusCode: 200,
            message: "OK",
            data: result
        }
    }

    getProductById (id) {
        const product = products.find(p => p.id === parseInt(id));
        
        return {
            succeded: true,
            statusCode: 200,
            message: "OK",
            data: product
        }
    }

    createProduct (newData) {
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
    
        if (!this.doesBrandExist(brandId)) {
            return {
                succeded: true,
                statusCode: 404,
                message: "brandId does not exist",
                data: {}
            }
        }
    
        if (!this.doesCategoryExist(categoryId)) {
            return {
                succeded: true,
                statusCode: 404,
                message: "categoryId does not exist",
                data: {}
            }
        }
    
        const newProduct = {
            id: products.length + 1,
            image,
            productName,
            description,
            price,
            stock,
            categoryId,
            brandId
        }
    
        products.push(newProduct);
    
        return {
            succeded: true,
            statusCode: 201,
            message: "Product created",
            data: newProduct
        }
    }

    updateProduct (id, newData) {
        const { image, productName, description, price, stock, categoryId, brandId } = newData;
        const product = products.find(p => p.id == id);

        if (brandId && !this.doesBrandExist(brandId)) {
            return {
                succeded: false,
                statusCode: 404,
                message: "brandId does not exist",
                data: {}
            }
        }

        if (categoryId && !this.doesCategoryExist(categoryId)) {
            return {
                succeded: false,
                statusCode: 404,
                message: "categoryId does not exist",
                data: {}
            }
        }

        if (product) {
            if (image) product.image = image;
            if (productName) product.productName = productName;
            if (description) product.description = description;
            if (price) product.price = price;
            if (stock) product.stock = stock;
            if (categoryId) product.categoryId = categoryId;
            if (brandId) product.brandId = brandId;

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
    }

    deleteProduct (id) {
        const productIndex = products.findIndex(p => p.id == id);

        if(productIndex !== -1) {
            products.splice(productIndex, 1);

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
    }

    obtenerBrandId(brandName) {
        const brand = brands.find(b => b.brandName === brandName);
        return brand ? brand.id : null;
    }

    obtenerCategoryId(categoryName) {
        const category = categories.find(c => c.categoryName === categoryName);
        return category ? category.id : null;
    }

    doesBrandExist(brandId) {
        return brands.some(b => b.id === brandId);
    }

    doesCategoryExist(categoryId) {
        return categories.some(c => c.id === categoryId);
    }
}

module.exports = productsServices;