// const User = require("./User");
const User = require("./userMode");
const Contact = require("./contactModel");

User.hasMany(Contact, {
  foreignKey: "user_id",
  as: "contacts",
});
Contact.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

module.exports = { User, Contact };
