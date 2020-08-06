'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fruits = sequelize.define('Fruits', {
    name: DataTypes.STRING,
    color: DataTypes.STRING
  }, {});

  Fruits.sync({ force: false , alter : true });

  return Fruits;
};