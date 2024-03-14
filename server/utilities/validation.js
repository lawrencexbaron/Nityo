const Joi = require("joi");

const baseOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
  errors: {
    wrap: {
      label: "",
    },
  },
};

const createValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().messages({
      "string.empty": `First name is required`,
      "string.required": "First name is required",
      "any.required": "First name is required",
    }),
    lastName: Joi.string().required().messages({
      "string.empty": `Last name is required`,
      "string.required": "Last name is required",
      "any.required": "Last name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": `Email is required`,
      "string.required": "Email is required",
      "any.required": "Email is required",
      "string.email": `Email is invalid`,
    }),
    role: Joi.string().required().messages({
      "string.empty": `Role is required`,
      "string.required": "Role is required",
      "any.required": "Role is required",
    }),
    // password: Joi.string(),
  });

  return schema.validate(data, baseOptions);
};

module.exports = {
  createValidation,
};
