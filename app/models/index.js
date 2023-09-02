const dbConfig = require('../../config/db.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.posts = require('./post.model')(mongoose);
db.products = require('./product.model')(mongoose);
db.categories = require('./category.model')(mongoose);
db.customers = require('./customer.model')(mongoose);
db.carts = require('./cart.model')(mongoose);
db.sells = require('./sell.model')(mongoose);

module.exports = db;
