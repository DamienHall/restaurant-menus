const path = require('path');
const { Sequelize, DataTypes, Model } = require('sequelize');

let sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite"
});

module.exports = {
    sequelize,
    DataTypes,
    Model
};
