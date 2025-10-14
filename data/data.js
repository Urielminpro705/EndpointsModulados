const { faker } = require("@faker-js/faker");
const cantidad = 10;

const brands = Array.from({ length: cantidad }, (_, i) => {
    return {
        id: i + 1,
        brandName: faker.company.name(),
        description: faker.commerce.productDescription(),
        active: faker.helpers.arrayElement([false, true])
    }
});

const categories = Array.from({ length: cantidad }, (_, i) => {
    return {
        id: i + 1,
        categoryName: faker.commerce.department(),
        description: faker.lorem.sentence(),
        active: faker.helpers.arrayElement([false, true])
    }
});

const products = Array.from({ length: cantidad }, (_, i) => {
    return {
        id: i + 1,
        image: faker.image.url(),
        productName: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.number.int({ min: 0, max: 100 }),
        categoryId: faker.number.int({ min: 1, max: cantidad }),
        brandId: faker.number.int({ min: 1, max: cantidad })
    }
});

const users = Array.from({ length: cantidad }, (_, i) => {
    return {
        id: i + 1,
        name: faker.person.fullName(),
        username: faker.internet.username(),
        password: faker.internet.password(),
    }
});

module.exports = { brands, categories, products, users };