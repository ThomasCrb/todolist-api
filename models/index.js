const dbConfig = require('../config/database.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const database = {};

database.Sequelize = Sequelize;
database.sequelize = sequelize;

database.folders = require('./folder.model.js')(sequelize, Sequelize);
database.lists = require('./list.model.js')(sequelize, Sequelize);
database.tasks = require('./task.model.js')(sequelize, Sequelize);

database.folders.hasMany(database.lists);
database.lists.belongsTo(database.folders);

database.lists.hasMany(database.tasks);
database.tasks.belongsTo(database.lists);

module.exports = database;
