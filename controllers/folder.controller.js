const database = require('../models');
const Folder = database.folders;
const List = database.lists;
const Op = database.Sequelize.Op;

exports.create = async (req, res, next) => {
  try {

    const folder = {
      name: req.body.name,
    };

    let newFolder = await Folder.create(folder);

    res.status(201).json({
      data: newFolder,
      message: 'Dossier créé avec succès.',
      statusCode: 201,
      success: true,
    });
  } catch (err) {
    console.error(`${err}`.bgRed);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la création du dossier.',
      statusCode: 500,
      success: false,
      error: err,
    });
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const folders = await Folder.findAll();

    res.status(200).json({
      data: folders,
      statusCode: 200,
      success: true,
      data: folders,
    });
  } catch (err) {
    console.error(`${err}`.bgRed);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la recherche des dossiers.',
      statusCode: 500,
      success: false,
      error: err,
    });
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const id = req.params.id;

    const folder = await Folder.findByPk(id);

    if (!folder) {
      return res.status(404).json({
        statusCode: 404,
        success: true,
        message: `Aucun dossier ne correspond à l'id ${id}`,
      });
    }

    res.status(200).json({
      data: folder,
      statusCode: 200,
      success: true,
      data: folder,
    });
  } catch (err) {
    console.error(`${err}`.bgRed);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la recherche du dossier.',
      statusCode: 500,
      success: false,
      error: err,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const folder = await Folder.findByPk(id);

    if (!folder) {
      res.status(200).json({
        statusCode: 404,
        success: true,
        message: `Aucun dossier ne correspond à l'id ${id}.`,
      });
    }

    let updatedFolder = await folder.update(req.body, {
      returning: true,
      plain: true,
    });

    res.status(200).json({
      data: updatedFolder['dataValues'],
      statusCode: 200,
      success: true,
      message: `Le dossier a bien été modifié.`,
    });
  } catch (err) {
    console.error(`${err}`.bgRed);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la modification du dossier.',
      statusCode: 500,
      success: false,
      error: err,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;

    const folder = await Folder.findByPk(id);

    if (!folder) {
      res.status(200).json({
        statusCode: 404,
        success: true,
        message: `Aucun dossier ne correspond à l'id ${id}.`,
      });
    }

    await folder.destroy();

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: `Le dossier a bien été supprimé.`,
    });
  } catch (err) {
    console.error(`${err}`.bgRed);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la suppression du dossier.',
      statusCode: 500,
      success: false,
      error: err,
    });
  }
};

exports.count = async (req, res, next) => {
  try {
    let count = await Folder.count();

    res.status(200).json({
      statusCode: 200,
      success: true,
      data: count,
    });
  } catch (err) {
    console.error(`${err}`.bgRed);
    res.status(500).json({
      message: 'Une erreur est survenue lors du comptage des dossiers.',
      statusCode: 500,
      success: false,
      error: err,
    });
  }
};
