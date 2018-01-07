const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    "use strict";
    let Post = sequelize.define("Post", {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        content: DataTypes.TEXT,
        createdDate: DataTypes.DATE
    });

    Post.associate = (models) => {
        Post.hasMany(models.Comment, {
            foreignKey: 'postId',
            as: 'comments'
        })
    };

    return Post;
};
