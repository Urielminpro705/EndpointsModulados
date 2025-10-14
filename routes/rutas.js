const brandsRouter = require("./brandsRouter");
const categoriesRouter = require("./categoriesRouter");
const productsRouter = require("./productsRouter");
const usersRouter = require("./usersRouter");

function routerApi(app) {
    app.use("/brands", brandsRouter);
    app.use("/categories", categoriesRouter);
    app.use("/products", productsRouter);
    app.use("/users", usersRouter);
}

module.exports = routerApi;