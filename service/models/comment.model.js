module.exports = (sequelize, DataTypes) => {

    const Comment = sequelize.define('Comment', {
        // Model attributes are defined here
        content: {
            type: DataTypes.STRING(1234),
        },
        });
        
            return Comment;
        };