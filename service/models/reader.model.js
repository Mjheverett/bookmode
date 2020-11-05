module.exports = (sequelize, DataTypes) => {
    const Reader = sequelize.define('Reader', {
        // Model attributes are defined here
        readerName: {
            type: DataTypes.STRING(1234),
            allowNull: false
        },
        });
  
    return Reader;
  };