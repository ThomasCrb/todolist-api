module.exports = (sequelize, Sequelize) => {
  const Folder = sequelize.define('folder', {
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Veuillez donner un nom à votre dossier."
        }, 
      },
    },
  });
  return Folder;
};
