module.exports = (sequelize, DataTypes) => {

    const Recommendation = sequelize.define('Recommendation', {
        // Model attributes are defined here
        comment: {
            type: DataTypes.STRING(1234),
        },
        });
        
            return Recommendation;
        };
