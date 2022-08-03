const sequelize = require("sequelize");

const Category = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
           type: DataTypes.INTEGER,
           primaryKey: true,
        },
        name: DataTypes.STRING,
    },
    {
        timestamps: false,
        underscored: true,
        tableName: 'Categories',
    })
    return Category;
};

module.exports = Category;