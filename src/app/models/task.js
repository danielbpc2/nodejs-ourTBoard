module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      list_id: DataTypes.INTEGER,
      owner: DataTypes.INTEGER,
      assigned: DataTypes.INTEGER,
    },
    {}
  );
  Task.associate = models => {
    // associations can be defined here
    Task.belongsTo(models.User, { foreignKey: 'owner' });
    Task.belongsTo(models.User, { foreignKey: 'assigned' });
    Task.belongsTo(models.List, { foreignKey: 'list_id' });
  };
  return Task;
};
