module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define('cart', {
        qty: {
            type: Sequelize.INTEGER
        },
        session_id: {
            type: Sequelize.STRING
        }
    })
    return Cart
}