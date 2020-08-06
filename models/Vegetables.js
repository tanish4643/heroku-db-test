'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vegetables = sequelize.define('Vegetables', {
    name: DataTypes.STRING,
    color: DataTypes.STRING
  }, {});

  Vegetables.sync({ force: false , alter : true });

  return Vegetables;
};