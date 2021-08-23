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

db.category.hasMany(db.product, {foreignKey: 'product_id', onDelete: 'SET NULL'})
db.product.belongsTo(db.category, {foreignKey: 'product_id', onDelete: 'SET NULL'})

module.exports = db