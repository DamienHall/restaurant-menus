const { sequelize, DataTypes, Model } = require('../db');

class Restaurant extends Model {};
Restaurant.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    cuisine: DataTypes.STRING
}, {
    sequelize: sequelize,
    modelName: "Restaurant"
});

module.exports = {Restaurant};
