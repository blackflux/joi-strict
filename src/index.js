import Joi_ from 'joi';

const Joi = Joi_.defaults((schema) => schema.options({
  presence: 'required',
  convert: true
}));

export default {
  test: (object, schema) => {
    if (!Joi.isSchema(schema)) {
      throw new Error(`Not a Joi schema: ${typeof schema === 'string' ? schema : JSON.stringify(schema)}`);
    }
    return schema.validate(object).error === undefined;
  },
  ...Joi,
  boolean: (...args) => Joi.boolean(...args).strict(),
  number: (...args) => Joi.number(...args).strict(),
  string: (...args) => Joi.string(...args).strict()
};
