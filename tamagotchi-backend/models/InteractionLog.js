const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const InteractionLog = sequelize.define('InteractionLog', {
  interactionType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  effectOnHunger: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  effectOnHappiness: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  effectOnHealth: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = InteractionLog;
