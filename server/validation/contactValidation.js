const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .pattern(/^[a-zA-Z\s]+$/)
    .messages({
      "string.base": "Name must be text.",
      "string.empty": "Name is required. Please enter your full name.",
      "string.min": "Name is too short. Use at least 3 characters.",
      "string.max": "Name is too long. Keep it under 50 characters.",
      "string.pattern.base": "Name can only contain letters and spaces.",
      "any.required": "Name is required. Please provide your full name.",
    }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be text.",
    "string.empty": "Email is required. Please enter your email address.",
    "string.email": "Invalid email format. Please enter a valid email address.",
    "any.required": "Email is required. We will use this to contact you.",
  }),
  phone: Joi.string()
    .min(7)
    .max(20)
    .required()
    .pattern(/^[0-9+\-\s()]+$/)
    .messages({
      "string.base": "Phone number must be text.",
      "string.empty":
        "Phone number is required. Please enter a valid phone number.",
      "string.min": "Phone number is too short. Use at least 7 digits.",
      "string.max": "Phone number is too long. Keep it under 20 characters.",
      "string.pattern.base":
        "Phone number can only contain digits, plus, minus, spaces and parentheses.",
      "any.required":
        "Phone number is required. Please provide a contact number.",
    }),
});

module.exports = contactSchema;
