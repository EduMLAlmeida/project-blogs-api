const sequelize = require("sequelize");

const PostCategory = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: {
           type: DataTypes.INTEGER,
           primaryKey: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
         },
    },
    {
        timestamps: false,
        tableName: 'PostCategories',
    });
    PostCategory.associate = (db) => {
        db.Category.belongsToMany(db.BlogPost, {
            as: 'BlogPosts',
            through: PostCategory,
            foreignKey: 'categoryId',
            otherKey: 'postId',
        });
        db.BlogPost.belongsToMany(db.Category, {
            as: 'Categories',
            through: PostCategory,
            foreignKey: 'postId',
            otherKey: 'categoryId',
        });
    }
    return PostCategory;
};

module.exports = PostCategory;