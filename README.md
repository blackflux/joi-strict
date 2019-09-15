# joi-strict

[![Build Status](https://circleci.com/gh/blackflux/joi-strict.png?style=shield)](https://circleci.com/gh/blackflux/joi-strict)
[![Test Coverage](https://img.shields.io/coveralls/blackflux/joi-strict/master.svg)](https://coveralls.io/github/blackflux/joi-strict?branch=master)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=blackflux/joi-strict)](https://dependabot.com)
[![Dependencies](https://david-dm.org/blackflux/joi-strict/status.svg)](https://david-dm.org/blackflux/joi-strict)
[![NPM](https://img.shields.io/npm/v/joi-strict.svg)](https://www.npmjs.com/package/joi-strict)
[![Downloads](https://img.shields.io/npm/dt/joi-strict.svg)](https://www.npmjs.com/package/joi-strict)
[![Semantic-Release](https://github.com/blackflux/js-gardener/blob/master/assets/icons/semver.svg)](https://github.com/semantic-release/semantic-release)
[![Gardener](https://github.com/blackflux/js-gardener/blob/master/assets/badge.svg)](https://github.com/blackflux/js-gardener)

Thin wrapper around joi that defaults to stricter validation.

## Install

Install with [npm](https://www.npmjs.com/):

    $ npm install --save joi-strict

## Changes from default

The following changes to the default joi behaviour were made:

- Every entry is required unless explicitly marked as [optional()](https://github.com/hapijs/joi/blob/v15.0.3/API.md#anyoptional).
- Unknown object keys are not allowed unless explicitly market [unknown(true)](https://github.com/hapijs/joi/blob/v15.0.3/API.md#objectunknownallow).
- Additional function `Joi.test(object, schema)` to check if a schema matches an object

## Usage

<!-- eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies -->
```js
const Joi = require('joi-strict');

Joi.string().validate();
// => "value" is required
```

For more examples, please refer to the tests.
