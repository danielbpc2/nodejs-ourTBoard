module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Board);
  };
  return User;
};
