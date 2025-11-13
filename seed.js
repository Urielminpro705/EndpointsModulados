const mongoose = require('mongoose');

const Brand = require('./models/Brand'); 
const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');

const { brands, categories, products, users } = require('./data/data');

const DB_URI = "mongodb+srv://uriel:Hola1234$@cluster25711.fc8peuv.mongodb.net/";

const seedDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('Conectado a MongoDB...');

        // Borrar los registros existentes
        console.log('Limpiando colecciones...');
        await Brand.deleteMany({});
        await Category.deleteMany({});
        await Product.deleteMany({});
        await User.deleteMany({});

        // Se insertan los datos
        console.log('Insertando datos...');
        
        await Brand.create(brands);
        console.log('Marcas insertadas');

        await Category.create(categories);
        console.log('Categorías insertadas');

        await Product.create(products);
        console.log('Productos insertados');

        await User.create(users);
        console.log('Usuarios insertados');

        console.log('¡¡¡¡Base de datos sembrada con exito (Que prime)!!!!');

    } catch (error) {
        console.error('Error sembrando la base de datos :v :', error);
    } finally {
        await mongoose.connection.close();
        console.log('Desconectado de MongoDB');
    }
};

seedDatabase();