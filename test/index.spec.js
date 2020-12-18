const expect = require('chai').expect;
const JoiOriginal = require('@hapi/joi');
const Joi = require('../src/index');

describe('Testing Strict Mode', () => {
  const validated = (schema, input, expectedErrorMessage = null) => {
    const error = schema.validate(input).error;
    if (expectedErrorMessage === null) {
      expect(error).to.equal(undefined);
    } else {
      expect(error.name).to.equal('ValidationError');
      expect(error.message).to.equal(expectedErrorMessage);
    }
  };

  it('Testing string required by default', () => {
    validated(
      Joi.string(),
      undefined,
      '"value" is required'
    );
  });

  it('Testing unknown key not allowed by default', () => {
    validated(
      Joi.object().keys({}),
      { a: 'thing' },
      '"a" is not allowed'
    );
  });

  it('Testing key required by default', () => {
    validated(
      Joi.object().keys({ a: Joi.string() }),
      {},
      '"a" is required'
    );
  });

  it('Testing deeply nested key required by default', () => {
    validated(
      Joi.object().keys({ a: Joi.object().keys({ b: Joi.string() }) }),
      { a: {} },
      '"a.b" is required'
    );
  });

  it('Testing deeply nested, explicitly optional key', () => {
    validated(
      Joi.object().keys({ a: Joi.object().keys({ b: Joi.string().optional() }) }),
      { a: {} }
    );
  });

  it('Testing unknown key explicitly allowed', () => {
    validated(
      Joi.object().keys({}).unknown(true),
      { a: 'thing' }
    );
  });

  it('Testing Joi.test is not overwritten', () => {
    expect(JoiOriginal.test).to.equal(undefined);
    expect(Joi.test).to.not.equal(undefined);
  });

  describe('Testing Joi.test()', () => {
    it('Testing true', () => {
      expect(Joi.test('string', Joi.string())).to.equal(true);
    });

    it('Testing false', () => {
      expect(Joi.test('', Joi.number())).to.equal(false);
    });

    it('Testing not a schema (object)', () => {
      expect(() => Joi.test({}, {})).to.throw('Not a Joi schema: {}');
    });

    it('Testing not a schema (string)', () => {
      expect(() => Joi.test({}, 'string')).to.throw('Not a Joi schema: string');
    });
  });

  describe('Testing Joi.boolean() is strict()', () => {
    it('Testing string not allowed', () => {
      expect(Joi.test('true', Joi.boolean())).to.equal(false);
      expect(Joi.test('false', Joi.boolean())).to.equal(false);
    });

    it('Testing boolean allowed', () => {
      expect(Joi.test(true, Joi.boolean())).to.equal(true);
      expect(Joi.test(false, Joi.boolean())).to.equal(true);
    });
  });

  describe('Testing Joi.number() is strict()', () => {
    it('Testing string not allowed', () => {
      expect(Joi.test('1', Joi.number())).to.equal(false);
      expect(Joi.test('2', Joi.number())).to.equal(false);
    });

    it('Testing number allowed', () => {
      expect(Joi.test(1, Joi.number())).to.equal(true);
      expect(Joi.test(2, Joi.number())).to.equal(true);
    });
  });

  describe('Testing Joi.string() is lowercase()', () => {
    it('Testing uppercase string not allowed', () => {
      expect(Joi.test('STR', Joi.string().lowercase())).to.equal(false);
    });

    it('Testing lowercase string allowed', () => {
      expect(Joi.test('str', Joi.string().lowercase())).to.equal(true);
    });
  });

  describe('Testing Joi.date() accepts string', () => {
    it('Testing string allowed', () => {
      expect(Joi.test('2020-06-04T09:42:17-07:00', Joi.date())).to.equal(true);
    });

    it('Testing date allowed', () => {
      expect(Joi.test(new Date(), Joi.date())).to.equal(true);
    });
  });
});
