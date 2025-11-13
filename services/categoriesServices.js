const Category = require("../models/Category");
const Product = require("../models/Product");

class categoriesServices {
    getAllCategories () {
        return Category.find()
            .then(data => {
                return {
                    succeded: true,
                    statusCode: 200,
                    message: "OK",
                    data: data
                }
            })
            .catch(err => {
                console.log(err);
                return {
                    succeded: false,
                    statusCode: 500,
                    message: "Error interno del servidor",
                    data: []
                }
            })
    }

    getCategoryById (id) {
        return Category.findOne({ id })
            .then(category => {
                return {
                    succeded: true,
                    statusCode: 200,
                    message: "OK",
                    data: category
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

    async createCategory (newData) {
        const { categoryName, description, active } = newData;
    
        const missingFields = [];

        if (!categoryName) missingFields.push("categoryName");
        if (!description) missingFields.push("description");
        if (active === undefined) missingFields.push("active");

        if (missingFields.length > 0) {
            return {
                succeded: false,
                statusCode: 400,
                message: `Missing required fields: ${missingFields.join(", ")}`,
                data: {}
            }
        }

        const numRegistros = await Brand.countDocuments();

        const newCategory = {
            id: numRegistros + 1,
            categoryName,
            description,
            active
        }

        return Category.create(newCategory)
            .then(data => {
                return {
                    succeded: true,
                    statusCode: 201,
                    message: "Category created",
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
            })

    }

    updateCategory (id, newData) {
        const { categoryName, description, active } = newData;
        var category = {}

        if (categoryName) category.categoryName = categoryName;
        if (description) category.description = description;
        if (active) category.active = active;

        return Category.updateOne(
            { id },
            { $set: category }
        )
            .then(data => {
                if (data.matchedCount > 0) {
                    return {
                        succeded: true,
                        statusCode: 200,
                        message: "Updated",
                        data: category
                    }
                } else {
                    return {
                        succeded: false,
                        statusCode: 404,
                        message: 'Category Not Found',
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
            });
    }

    async deleteCategory (id) {
        const canBeDeleted = await this.canBeDeleted(id);

        if(!canBeDeleted) {
            return {
                succeded: false,
                statusCode: 409,
                message: "Category cannot be deleted because it is associated with existing products.",
                data: {}
            }
        }
    
        return Category.deleteOne({ id })
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
                        message: 'Category Not Found',
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

    canBeDeleted(categoryId) {
        return Product.findOne({ categoryId })
            .then(data => {
                return !data;
            })
            .catch(err => {
                return false;
            })
    }
}

module.exports = categoriesServices;