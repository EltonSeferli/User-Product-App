const Joi = require("joi");

// Safe, clear validation messages that avoid Joi template parsing issues
const passwordSchema = Joi.string()
  .min(8)
  .max(128)
  .required()
  .pattern(/[A-Z]/)
  .pattern(/[a-z]/)
  .pattern(/[0-9]/)
  .pattern(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
  .messages({
    "string.base": "Password must be text.",
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 8 characters long.",
    "string.max": "Password must not exceed 128 characters.",
    "string.pattern.base":
      "Password must include at least one uppercase letter, one lowercase letter, one number and one special character.",
    "any.required": "Password is required.",
  });

const registerSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(50)
    .required()
    .pattern(/^[a-zA-Z0-9_-]+$/)
    .messages({
      "string.base": "Username must be text.",
      "string.empty": "Username is required.",
      "string.min": "Username must be at least 3 characters long.",
      "string.max": "Username must not exceed 50 characters.",
      "string.pattern.base":
        "Username can only contain letters, numbers, hyphens and underscores.",
      "any.required": "Username is required.",
    }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be text.",
    "string.empty": "Email is required.",
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),
  password: passwordSchema,
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be text.",
    "string.empty": "Email is required.",
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must be text.",
    "string.empty": "Password is required.",
    "any.required": "Password is required.",
  }),
});

module.exports = { registerSchema, loginSchema };
