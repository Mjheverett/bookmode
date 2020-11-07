module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('Author', {
        // Model attributes are defined here
        authorName: {
            type: DataTypes.STRING(1234),
            allowNull: false
        },
    });

    return Author;
}
