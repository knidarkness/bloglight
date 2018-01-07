const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING
    });

    return User;
};