const { json, where } = require("sequelize");
const Contact = require("../models/contactModel");

const getContacts = async (req, res) => {
  const contacts = await Contact.findAll({ where: { user_id: req.user.id } });
  if (!contacts) return res.status(404).json({ message: "Contacts not found" });
  return res.status(200).json(contacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const user = await Contact.findByPk({ where: { id } });
  if (!user) return res.status(404).json({ message: "Contact not found" });
  return res.status(200).json(user);
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const isExist = await Contact.findAll({ where: { email } });
  if (isExist)
    return res
      .status(401)
      .json({ param: "email", message: "This email is exists" });

  const contact = await Contact.create({
    name: name,
    email: email,
    phone: phone,
    user_id: req.user.id,
  });

  return res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findAll({
    where: { id, user_id: req.user.id },
  });

  if (!contact) return res.status(404).json({ message: "User not foun" });

  await contact.update(req.body);
  return res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findAll({
    where: { id, user_id: req.user.id },
  });

  if (!contact) return res.status(404).json({ message: "User not found" });

  await contact.destroy();

  return res.status(200).json({ message: "Deleted successfully" });
};

module.exports = {
  getContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
};
