
const Sequelize = require('sequelize');
const db = require('../config/dbConfig');
const { DataTypes } = require('sequelize');

const Feed = db.define('Feed', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  url: DataTypes.STRING,
  description: DataTypes.STRING
});

module.exports = Feed;
