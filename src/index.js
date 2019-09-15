const Joi = require('@hapi/joi').defaults((schema) => schema.options({
  presence: 'required'
}));

module.exports = {
  test: (object, schema) => {
    if (!Joi.isSchema(schema)) {
      throw new Error(`Not a Joi schema: ${typeof schema === 'string' ? schema : JSON.stringify(schema)}`);
    }
    return schema.validate(object).error === undefined;
  },
  ...Joi
};
