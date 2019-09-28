module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    'Board',
    {
      name: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      owner: DataTypes.INTEGER,
    },
    {}
  );
  Board.associate = function(models) {
    // associations can be defined here
    Board.belongsTo(models.User, { foreignKey: 'owner' });
  };
  return Board;
};
