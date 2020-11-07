module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        // Model attributes are defined here
        groupName: {
            type: DataTypes.STRING(1234),
            allowNull: false
        },
        groupDescription: {
            type: DataTypes.STRING(1234),
        },
        });

    return Group;
};
