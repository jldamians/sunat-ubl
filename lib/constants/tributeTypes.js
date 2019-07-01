/**
 * Constants enumerating the tributes codes.
 */

"use strict";

const utils = require('../utils');

let tributeCodes = {};

tributeCodes[exports.IGV = '1000'] = {
  typeCode: 'VAT',
  name: 'IGV',
  category: 'S'
};

tributeCodes[exports.IVAP = '1016'] = {
  typeCode: 'VAT',
  name: 'IVAP',
  category: 'S'
};

tributeCodes[exports.ISC = '2000'] = {
  typeCode: 'EXC',
  name: 'ISC',
  category: 'S'
};

tributeCodes[exports.EXP = '9995'] = {
  typeCode: 'FRE',
  name: 'EXP',
  category: 'G'
};

tributeCodes[exports.GRA = '9996'] = {
  typeCode: 'FRE',
  name: 'GRA',
  category: 'Z'
};

tributeCodes[exports.EXO = '9997'] = {
  typeCode: 'VAT',
  name: 'EXO',
  category: 'E'
};

tributeCodes[exports.INA = '9998'] = {
  typeCode: 'FRE',
  name: 'INA',
  category: 'O'
};

tributeCodes[exports.OTROS = '9999'] = {
  typeCode: 'OTH',
  name: 'OTROS',
  category: 'S'
};

exports.getTributeData = function(tributeCode) {
  if (utils.hasOwnProperty(tributeCodes, tributeCode)) {
    return tributeCodes[tributeCode];
  } else {
    throw new Error(`El código de tributo no existe: ${tributeCode}`);
  }
};
