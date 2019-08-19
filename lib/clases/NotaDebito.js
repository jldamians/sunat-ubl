"use strict";

const constants = require('../constants');

const CPE = require('./CPE');

const DOCUMENT_TYPE_CODES = constants.documentTypeCodes;

class NotaDebito extends CPE{
  constructor() {
    super(DOCUMENT_TYPE_CODES.ND, ...arguments);
  }
}

module.exports = NotaDebito;
