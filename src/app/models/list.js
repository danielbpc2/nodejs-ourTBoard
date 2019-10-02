module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    'List',
    {
      name: DataTypes.STRING,
      board_id: DataTypes.INTEGER,
    },
    {}
  );
  List.associate = function(models) {
    // associations can be defined here
    List.belongsTo(models.Board, { foreignKey: 'board_id' });
    List.hasMany(models.Task, { foreignKey: 'list_id' });
  };
  return List;
};
