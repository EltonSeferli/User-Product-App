const { DataTypes } = require("sequelize");
const sequelize = require("../config/db_connection");
const User = require("./userModel");
const { type } = require("../validation/contactValidation");

const Contact = sequelize.define("Contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
});

User.hasMany(Contact, { foreignKey: "user_id", onDelete: "CASCADE" });
Contact.belongsTo(User, { foreignKey: "user_id" });

module.exports = Contact;
