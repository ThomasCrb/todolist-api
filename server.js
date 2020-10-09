const express = require('express');
const dotenv = require('dotenv').config({ path: './config/config.env' });
const colors = require('colors');
const cors = require('cors');

const folderRoutes = require('./routes/folder.routes');
const listRoutes = require('./routes/list.routes');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const database = require('./models');
database.sequelize.sync({ force: true }).then(() => {
  console.log('Drop et re-sync.'.bgBlue);
});

app.use('/api/v1/folders', folderRoutes);
app.use('/api/v1/lists', listRoutes);
app.use('/api/v1/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}`);
});
