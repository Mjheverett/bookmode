module.exports = (sequelize, DataTypes) => {
const Genre = sequelize.define('Genre', {
    // Model attributes are defined here
    genreName: {
        type: DataTypes.STRING(1234),
        allowNull: false
    },
        });

    
        return Genre;
    };
    