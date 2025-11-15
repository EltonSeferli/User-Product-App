const { json, where } = require("sequelize");
const Contact = require("../models/contactModel");

const getContacts = async (req, res) => {
  const contacts = await Contact.findAll({
    where: { user_id: req.user.id },
    raw: true,
  });

  return res.status(200).json(contacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const user = await Contact.findOne({ where: { id, user_id: req.user.id } });
  if (!user) return res.status(404).json({ message: "Contact not found" });
  return res.status(200).json(user);
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const isExist = await Contact.findAll({
    where: { email, user_id: req.user.id },
  });
  console.log(isExist);
  if (isExist.length != 0)
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
  try {
    const { id } = req.params;
    const contact = await Contact.findOne({
      where: { id, user_id: req.user.id },
    });
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    await contact.update(req.body);
    return res.status(200).json(contact.toJSON());
  } catch (error) {
    console.error("Update contact error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findOne({
      where: { id, user_id: req.user.id },
    });
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    await contact.destroy();
    return res
      .status(200)
      .json({ message: "Deleted successfully", deletedId: id });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
};
