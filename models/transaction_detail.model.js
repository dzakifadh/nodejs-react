module.exports = (sequelize, Sequelize) => {
    const TransactionDetail = sequelize.define('transaction_detail', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        qty: {
            type: Sequelize.INTEGER
        }
    })
    return TransactionDetail
}