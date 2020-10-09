module.exports = (sequelize, Sequelize) => {
  const List = sequelize.define('list', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    folderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return List;
};
