module.exports = (sequelize, DataTypes) => {
    const user_group = sequelize.define('user_group', {
            // Model attributes are defined here
    isAdmin: DataTypes.BOOLEAN
}, {
    tableName: 'user_group'
});

return user_group;
};
