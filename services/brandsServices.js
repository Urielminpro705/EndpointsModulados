const Brand = require("../models/Brand");
const Product = require("../models/Product");

class brandsServices {
    getAllBrands () {
        return Brand.find()
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

    getBrandById (id) {
        return Brand.findOne({id: id})
            .then(brand => {
                return {
                    succeded: true,
                    statusCode: 200,
                    message: "OK",
                    data: brand
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

    async createBrand (newData) {
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

        const numRegistros = await Brand.countDocuments();

        const newBrand = new Brand({
            id: numRegistros + 1,
            brandName,
            description,
            active
        });

        return newBrand.save()
            .then(data => {
                return {
                    succeded: true,
                    statusCode: 201,
                    message: "Brand created",
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

    updateBrand (id, newData) {
        const { brandName, description, active } = newData;
        var brand = {}

        if (brandName) brand.brandName = brandName;
        if (description) brand.description = description;
        if (active) brand.active = active;

        return Brand.updateOne(
            { id },
            { $set: brand }
        )
            .then(data => {
                if (data.matchedCount > 0) {
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

    async deleteBrand (id) {
        const canBeDeleted = await this.canBeDeleted(id);
        
        if(!canBeDeleted) {
            return {
                succeded: false,
                statusCode: 409,
                message: "Brand cannot be deleted because it is associated with existing products.",
                data: {}
            }
        }

        return Brand.deleteOne({ id })
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
                        message: 'Brand Not Found',
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

    canBeDeleted(brandId) {
        return Product.findOne({ brandId: brandId })
            .then(data => {
                return !data;
            })
            .catch(err => {
                return false;
            })
    }
}

module.exports = brandsServices;