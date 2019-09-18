module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      list: DataTypes.INTEGER,
      owner: DataTypes.INTEGER,
      assigned: DataTypes.INTEGER,
    },
    {}
  );
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User, { as: 'owner', foreignKey: 'owner' });
    Task.belongsTo(models.User, { as: 'assigned', foreignKey: 'assigned' });
    Task.belongsTo(models.List);
  };
  return Task;
};
