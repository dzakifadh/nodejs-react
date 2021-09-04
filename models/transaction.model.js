module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define('transaction', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        transaction_number: {
            type: Sequelize.STRING
        }
    })
    return Transaction
}