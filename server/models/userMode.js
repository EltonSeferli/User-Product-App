const sequelize = require("../config/db_connection");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allownull: false,
  },
  email: {
    type: DataTypes.STRING,
    allownull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allownull: false,
  },
});
module.exports = User;
