const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      hooks: {
        beforeSave: async (user, options) => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8);
          }
        },
      },
    }
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Board);
  };

  /* User.methods.generateHash = function(password) {
    return bcrypt.hash(password, 8);
  };

  User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
  }; */

  return User;
};
