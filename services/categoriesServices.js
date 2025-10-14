const { categories, products } = require("../data/data");

class categoriesServices {
    getAllCategories () {
        return {
            succeded: true,
            statusCode: 200,
            message: "OK",
            data: categories
        }
    }

    getCategoryById (id) {
        const category = categories.find(c => c.id === parseInt(id));
        return {
            succeded: true,
            statusCode: 200,
            message: "OK",
            data: category
        }
    }

    createCategory (newData) {
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

        const newCategory = {
            id: categories.length + 1,
            categoryName,
            description,
            active
        }

        categories.push(newCategory);

        return {
            succeded: true,
            statusCode: 201,
            message: "Category created",
            data: newCategory
        }
    }

    updateCategory (id, newData) {
        const { categoryName, description, active } = newData;
        const category = categories.find(c => c.id == id);

        if (category) {
            if (categoryName) category.categoryName = categoryName;
            if (description) category.description = description;
            if (active) category.active = active;

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
    }

    deleteCategory (id) {
        const categoryIndex = categories.findIndex(c => c.id == id);
        
        if(!this.canBeDeleted(id)) {
            return {
                succeded: false,
                statusCode: 409,
                message: "Category cannot be deleted because it is associated with existing products.",
                data: {}
            }
        }
    
        if(categoryIndex !== -1) {
            categories.splice(categoryIndex, 1);
    
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
    }

    canBeDeleted(categoryId) {
        return !products.some(product => product.categoryId == categoryId);
    }
}

module.exports = categoriesServices;