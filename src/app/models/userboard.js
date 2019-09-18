module.exports = (sequelize, DataTypes) => {
  const UserBoard = sequelize.define(
    'UserBoard',
    {
      board_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {}
  );
  UserBoard.associate = function(models) {
    // associations can be defined here
    UserBoard.belongsTo(models.User);
    UserBoard.belongsTo(models.Board);
  };
  return UserBoard;
};
