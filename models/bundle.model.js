const Sequelize = require("sequelize");
const dbConfig = require("../config/config")

const sequelize = new Sequelize(
    dbConfig.DBNAME,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,
        port: dbConfig.DBPORT,
        pool:{
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquired: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.product = require('./product.model')(sequelize, Sequelize)
db.category = require('./category.model')(sequelize, Sequelize)
db.transaction = require('./transaction.model')(sequelize, Sequelize)
db.transaction_detail = require('./transaction_detail.model')(sequelize, Sequelize)
db.customer = require('./customer.model')(sequelize, Sequelize)
db.cart = require('./cart.model')(sequelize, Sequelize)

db.category.hasMany(db.product, {foreignKey: 'category_id', onDelete: 'SET NULL'})
db.product.belongsTo(db.category, {foreignKey: 'category_id', onDelete: 'SET NULL'})

db.product.hasMany(db.cart, {foreignKey: 'product_id', onDelete: 'CASCADE'})
db.cart.belongsTo(db.product, {foreignKey: 'product_id'})

db.product.hasMany(db.transaction_detail, {foreignKey: 'product_id', onDelete: 'SET NULL'})
db.transaction_detail.belongsTo(db.product, {foreignKey: 'product_id'})

db.transaction.hasMany(db.transaction_detail, {foreignKey: 'transaction_id'})
db.transaction_detail.belongsTo(db.transaction, {foreignKey: 'transaction_id'})

db.transaction.hasOne(db.customer, {foreignKey: 'transaction_id', onDelete: 'CASCADE'})
db.customer.belongsTo(db.transaction, {foreignKey: 'transaction_id'})

module.exports = db