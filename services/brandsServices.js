const { brands, products } = require("../data/data");

class brandsServices {
    getAllBrands () {
        return {
            succeded: true,
            statusCode: 200,
            message: "OK",
            data: brands
        }
    }

    getBrandById (id) {
        const brand = brands.find(b => b.id === parseInt(id));
        return {
            succeded: true,
            statusCode: 200,
            message: "OK",
            data: brand
        }
    }

    createBrand (newData) {
        const { brandName, description, active } = newData;

        const missingFields = [];

        if (!brandName) missingFields.push("brandName");
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

        const newBrand = {
            id: brands.length + 1,
            brandName,
            description,
            active
        }

        brands.push(newBrand);

        return {
            succeded: true,
            statusCode: 201,
            message: "Brand created",
            data: newBrand
        }
    }

    updateBrand (id, newData) {
        const { brandName, description, active } = newData;
        const brand = brands.find(b => b.id == id);

        if (brand) {
            if (brandName) brand.brandName = brandName;
            if (description) brand.description = description;
            if (active) brand.active = active;

            return {
                succeded: true,
                statusCode: 200,
                message: "Updated",
                data: brand
            }
        } else {
            return {
                succeded: false,
                statusCode: 404,
                message: 'Brand Not Found',
                data: {}
            }
        }
    }

    deleteBrand (id) {
        const brandIndex = brands.findIndex(b => b.id == id);

        if(!this.canBeDeleted(id)) {
            return {
                succeded: false,
                statusCode: 409,
                message: "Brand cannot be deleted because it is associated with existing products.",
                data: {}
            }
        }

        if(brandIndex !== -1) {
            brands.splice(brandIndex, 1);

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
                message: 'Brand Not Found',
                data: {}
            }
        }
    }

    canBeDeleted(brandId) {
        return !products.some(product => product.brandId == brandId);
    }
}

module.exports = brandsServices;