const sequelize = require("sequelize");

const User = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
           type: DataTypes.INTEGER,
           primaryKey: true,
        },
        displayName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    },
    {
        timestamps: false,
        // underscored: true, (o seeder do projeto está em cammelCase)
        tableName: 'Users',
    })
    return User;
};

module.exports = User;