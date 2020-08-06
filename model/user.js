module.exports = User;

const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
    }
}, {});