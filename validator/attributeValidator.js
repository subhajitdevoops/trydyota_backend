const Joi = require('joi');

const attributeValidation = async (req, res, next) => {
  try {
    const attributeValidate = Joi.object({
      title: Joi.string().required(),
      name: Joi.string().required(),
      variants: Joi.array().items(
        Joi.object({
          name: Joi.string(),
          status: Joi.string().valid('show', 'hide').default('show'),
        })
      ),
      option: Joi.string().valid('Dropdown', 'Radio', 'Checkbox'),
      type: Joi.string().valid('attribute', 'extra').default('attribute'),
      status: Joi.string().valid('show', 'hide').default('show'),
    });
    const value = await attributeValidate.validateAsync(req.body);
    console.log("attributeValidation");
    next();
  } catch (error) {
    return res.status(400).send({
      code: 3,
      message: "Bad Request: Invalid Parameters",
      payload: error,
    });
  }
};

module.exports = attributeValidation;
