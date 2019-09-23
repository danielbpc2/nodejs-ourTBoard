module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
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
