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
  Task.associate = models => {
    // associations can be defined here
    Task.belongsTo(models.User, { foreignKey: 'owner' });
    Task.belongsTo(models.User, { foreignKey: 'assigned' });
    Task.belongsTo(models.List, { foreinKey: 'list' });
  };
  return Task;
};
