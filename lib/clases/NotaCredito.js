"use strict";

const constants = require('../constants');

const CPE = require('./CPE');

const DOCUMENT_TYPE_CODES = constants.documentTypeCodes;

class NotaCredito extends CPE{
  constructor() {
    super(DOCUMENT_TYPE_CODES.NC, ...arguments);
  }
}

module.exports = NotaCredito;
