module.exports = (sequelize, DataTypes) => {
const Shelf = sequelize.define('Shelf', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        shelfName: {
            type: DataTypes.STRING(1234),
            defaultValue: 'General'
            },
        shelfDescription: {
            type: DataTypes.STRING(1234),
        }, 
        }, {
            tableName: 'Shelves'
        });
        
    return Shelf;
};