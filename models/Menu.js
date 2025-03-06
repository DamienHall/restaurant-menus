const { sequelize, DataTypes, Model } = require('../db');

class Menu extends Model {};
Menu.init({
    title: DataTypes.STRING
}, {
    sequelize: sequelize,
    modelName: "Menu"
});

module.exports = {Menu};
