module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        // Model attributes are defined here
        id: {
            type: DataTypes.STRING(1234),
            primaryKey: true,
            autoIncrement: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(1234),
            allowNull: false
        },
        });
        
            return User;
        };
