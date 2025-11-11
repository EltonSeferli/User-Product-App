const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");

const Contact = sequelize.define("Contact", {
  name: {
    type: DataTypes.STRING,
    allownull: false,
  },
  email: {
    type: DataTypes.STRING,
    allownull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allownull: false,
  },
});

module.exports = Contact;
