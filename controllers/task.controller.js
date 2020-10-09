const database = require('../models');
const Task = database.tasks;
const List = database.lists;
const Op = database.Sequelize.Op;

exports.create = async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: 'Les champs ne peuvent pas être vide!',
      });
      return;
    }

    const task = {
      title: req.body.title,
      description: req.body.description,
      listId: req.body.listId,
    };

    let newTask = await Task.create(task);

    res.status(201).json({
      data: newTask,
      message: 'Tâche créé avec succès.',
      statusCode: 201,
      success: true,
    });
  } catch (err) {
    console.error(`${err}`.bgRed);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la création de la tâche.',
      statusCode: 500,
      success: false,
      error: err,
    });
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      include: [
        {
          model: List,
        },
      ],
    });

    res.status(200).json({
      data: tasks,
      statusCode: 200,
      success: true,
      data: tasks,
    });
  } catch (err) {
    console.error(`${err}`.bgRed);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la recherche des tâches.',
      statusCode: 500,
      success: false,
      error: err,
    });
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const id = req.params.id;

    const task = await Task.findByPk(id, {
      include: [
        {
          model: List,
        },
      ],
    });

    if (!task) {
      return res.status(404).json({
        statusCode: 404,
        success: true,
        message: `Aucune tâche ne correspond à l'id ${id}`,
      });
    }

    res.status(200).json({
      data: task,
      statusCode: 200,
      success: true,
      data: task,
    });
  } catch (err) {
    console.error(`${err}`.bgRed);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la recherche de la tâche.',
      statusCode: 500,
      success: false,
      error: err,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const task = await Task.findByPk(id, {
      include: [
        {
          model: List,
        },
      ],
    });

    if (!task) {
      res.status(200).json({
        statusCode: 404,
        success: true,
        message: `Aucune tâche ne correspond à l'id ${id}.`,
      });
    }

    let updatedTask = await task.update(req.body, {
      returning: true,
      plain: true,
    });

    res.status(200).json({
      data: updatedTask['dataValues'],
      statusCode: 200,
      success: true,
      message: `La tâche a bien été modifié.`,
    });
  } catch (err) {
    console.error(`${err}`.bgRed);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la modification de la tâche.',
      statusCode: 500,
      success: false,
      error: err,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;

    const task = await Task.findByPk(id);

    if (!task) {
      res.status(200).json({
        statusCode: 404,
        success: true,
        message: `Aucune tâche ne correspond à l'id ${id}.`,
      });
    }

    await task.destroy();

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: `La tâche a bien été supprimé.`,
    });
  } catch (err) {
    console.error(`${err}`.bgRed);
    res.status(500).json({
      message: 'Une erreur est survenue lors de la suppression de la tâche.',
      statusCode: 500,
      success: false,
      error: err,
    });
  }
};

exports.count = async (req, res, next) => {
  try {
    let count = await Task.count();

    res.status(200).json({
      statusCode: 200,
      success: true,
      data: count,
    });
  } catch (err) {
    console.error(`${err}`.bgRed);
    res.status(500).json({
      message: 'Une erreur est survenue lors du comptage des tâches.',
      statusCode: 500,
      success: false,
      error: err,
    });
  }
};
