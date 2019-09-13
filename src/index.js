const JoiOriginal = require('@hapi/joi');
const assert = require('assert');

const Joi = JoiOriginal.defaults((schema) => schema.options({
  presence: 'required'
}));
assert(Joi.test === undefined);

module.exports = {
  test: (object, schema) => {
    if (!Joi.isSchema(schema)) {
      throw new Error(`Not a Joi schema: ${typeof schema === 'string' ? schema : JSON.stringify(schema)}`);
    }
    return schema.validate(object).error === undefined;
  },
  ...Joi
};
