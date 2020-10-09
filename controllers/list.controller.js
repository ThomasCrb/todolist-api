const database = require('../models');
const List = database.lists;
const Folder = database.folders;
const Op = database.Sequelize.Op;

exports.create = async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: 'Les champs ne peuvent pas être vide!',
      });
      return;
    }

    const list = {
      name: req.body.name,
      folderId: req.body.folderId,
    };

    let newList = await List.create(list);

    res.status(201).json({
      data: newList,
      message: 'Liste créée avec succès.',
      statusCode: 201,
      success: true,
    });
  } catch (err) {
    console.error(`${err}`.bgRed);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la création de la liste.',
      statusCode: 500,
      success: false,
      error: err,
    });
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const lists = await List.findAll({
      where: req.query,
      include: [
        {
          model: Folder,
        },
      ],
    });

    res.status(200).json({
      data: lists,
      statusCode: 200,
      success: true,
      data: lists,
    });
  } catch (err) {
    console.error(`${err}`.bgRed);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la recherche des listes.',
      statusCode: 500,
      success: false,
      error: err,
    });
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const id = req.params.id;

    const list = await List.findByPk(id, {
      include: [
        {
          model: Folder,
        },
      ],
    });

    if (!list) {
      return res.status(404).json({
        statusCode: 404,
        success: true,
        message: `Aucune liste ne correspond à l'id ${id}`,
      });
    }

    res.status(200).json({
      data: list,
      statusCode: 200,
      success: true,
      data: list,
    });
  } catch (err) {
    console.error(`${err}`.bgRed);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la recherche de la liste.',
      statusCode: 500,
      success: false,
      error: err,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const list = await List.findByPk(id, {
      include: [
        {
          model: Folder,
        },
      ],
    });

    if (!list) {
      res.status(200).json({
        statusCode: 404,
        success: true,
        message: `Aucune liste ne correspond à l'id ${id}.`,
      });
    }

    let updatedList = await list.update(req.body, {
      returning: true,
      plain: true,
    });

    res.status(200).json({
      data: updatedList['dataValues'],
      statusCode: 200,
      success: true,
      message: `Le liste a bien été modifié.`,
    });
  } catch (err) {
    console.error(`${err}`.bgRed);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la modification de la liste.',
      statusCode: 500,
      success: false,
      error: err,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;

    const list = await List.findByPk(id);

    if (!list) {
      res.status(200).json({
        statusCode: 404,
        success: true,
        message: `Aucune liste ne correspond à l'id ${id}.`,
      });
    }

    await list.destroy();

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: `Le liste a bien été supprimé.`,
    });
  } catch (err) {
    console.error(`${err}`.bgRed);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la suppression de la liste.',
      statusCode: 500,
      success: false,
      error: err,
    });
  }
};

exports.count = async (req, res, next) => {
  try {
    let count = await List.count();

    res.status(200).json({
      statusCode: 200,
      success: true,
      data: count,
    });
  } catch (err) {
    console.error(`${err}`.bgRed);
    res.status(500).json({
      message: 'Une erreur est survenue lors du comptage des listes.',
      statusCode: 500,
      success: false,
      error: err,
    });
  }
};
