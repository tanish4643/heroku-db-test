'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(config.use_env_variable, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const models = ['Fruits','Vegetables'];

models.forEach((item) => {
  var model = require(__dirname +"/"+ item)(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;