
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const db  = require('../config/dbConfig');

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  role: DataTypes.STRING,
  password: DataTypes.STRING,
});

module.exports = User;