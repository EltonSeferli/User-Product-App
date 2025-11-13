const formatErrors = (error) => {
  if (!error || !error.details) return [];
  return error.details.map((err) => ({
    param: err.path.join("."),
    message: err.message,
  }));
};
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = formatErrors(error);
      return res.status(400).json({ errors });
    }
    next();
  };
};
module.exports = validate;
