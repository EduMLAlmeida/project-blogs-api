const sequelize = require("sequelize");

const BlogPost = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: {
           type: DataTypes.INTEGER,
           primaryKey: true,
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
    },
    {
        timestamps: false,
        // underscored: true,
        tableName: 'BlogPosts',
    });
    BlogPost.associate = (db) => {
        BlogPost.belongsTo(db.User, { as: 'Users', primaryKey: 'id' });
    }
    return BlogPost;
};

module.exports = BlogPost;