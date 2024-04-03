const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const PokemonPet = sequelize.define('PokemonPet', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  speciesId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imageURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hunger: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100,
  },
  happiness: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100,
  },
  health: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100,
  },
});

module.exports = PokemonPet;
