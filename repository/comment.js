const sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    "use strict";
    let Comment = sequelize.define("Comment", {
        author: DataTypes.STRING,
        author_mail: DataTypes.STRING,
        content: DataTypes.STRING
    });

    Comment.associate = (models) => {
        Comment.belongsTo(models.Post, {
            foreignKey: 'postId',
            onDelete: 'CASCADE'
        })
    };

    return Comment;
};
