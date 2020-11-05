module.exports = (sequelize, DataTypes) => {
    const Media = sequelize.define('Media', {
        // Model attributes are defined here
        type: {
            type: DataTypes.STRING(1234),
            allowNull: false
        }, 
    }, {
        tableName: 'Media'
    });
        
            return Media;
        };