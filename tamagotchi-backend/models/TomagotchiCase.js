const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const TamagotchiCase = sequelize.define('TamagotchiCase', {
  caseColor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = TamagotchiCase;
