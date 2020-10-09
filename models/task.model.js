module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define('task', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    isComplete: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    listId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Task;
};
