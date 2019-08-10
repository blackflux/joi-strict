module.exports = require('@hapi/joi').defaults((schema) => schema.options({
  presence: 'required'
}));
