const express = require("express");
const authMiddleware = require("../middlewares/auth.middelware");
const {
  getContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validate = require("../middlewares/validate.middleware");
const contactSchema = require("../validation/contactValidation");
const router = express.Router();

router.get("/", authMiddleware, getContacts);
router
  .route("/:id")
  .get(authMiddleware, getOneContact)
  .put(authMiddleware, validate(contactSchema), updateContact)
  .delete(authMiddleware, deleteContact);
router.post("/", authMiddleware, validate(contactSchema), createContact);

module.exports = router;
