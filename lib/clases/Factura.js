"use strict";

const constants = require('../constants');

const CPE = require('./CPE');

const DOCUMENT_TYPE_CODES = constants.documentTypeCodes;

class Factura extends CPE{
  constructor() {
    super(DOCUMENT_TYPE_CODES.FA, ...arguments);
  }
}

module.exports = Factura;
