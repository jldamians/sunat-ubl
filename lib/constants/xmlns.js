/**
 * Constants enumerating the xmlns.
 */

"use strict";

const utils = require('../utils');

const xmlns = {};

const SUNAT_URI = 'urn:sunat:names:specification:ubl:peru:schema:xsd';

const UBL_URI = 'urn:oasis:names:specification:ubl:schema:xsd';

xmlns[exports.ds = 'ds'] = {
  uri: 'http://www.w3.org/2000/09/xmldsig#',
  prefix: 'ds',
};
xmlns[exports.sac = 'sac'] = {
  uri: `${SUNAT_URI}:SunatAggregateComponents-1`,
  prefix: 'sac',
};
xmlns[exports.ext = 'ext'] = {
  uri: `${UBL_URI}:CommonExtensionComponents-2`,
  prefix: 'ext',
};
xmlns[exports.cbc = 'cbc'] = {
  uri: `${UBL_URI}:CommonBasicComponents-2`,
  prefix: 'cbc',
};
xmlns[exports.cac = 'cac'] = {
  uri: `${UBL_URI}:CommonAggregateComponents-2`,
  prefix: 'cac',
};
xmlns[exports.debit = 'debit'] = {
  uri: `${UBL_URI}:DebitNote-2`,
  prefix: null,
};
xmlns[exports.credit = 'credit'] = {
  uri: `${UBL_URI}:CreditNote-2`,
  prefix: null,
};
xmlns[exports.invoice = 'invoice'] = {
  uri: `${UBL_URI}:Invoice-2`,
  prefix: null,
};

/**
 * Comprobar la existencia del espacio de nombre (namespace)
 * @param {string} code, código del espacio de nombre (namespace)
 * @return {boolean}
 */
function _checkCode(code) {
  const hasOwnProperty = utils.hasOwnProperty(xmlns, code);

  if (hasOwnProperty === true) {
    return true;
  } else {
    return false;
  }
}

/**
 * Obtener la información del espacio de nombre
 * @param {String} code, código del espacio de nombre
 * @param {String} field, nombre del campo requerido
 * @return {String}
 */
function _getInfo(code, field) {
  const checking = _checkCode(code);

  if (checking === true) {
    return xmlns[code][field];
  } else {
    throw new Error(`El código del espacio de nombre no existe: ${code}`);
  }
}

function getNS(code) {
  const prefix = _getInfo(code, 'prefix');

  if (prefix !== null) {
    return `xmlns:${prefix}`;
  } else {
    return 'xmlns';
  }
}

function getURI(code) {
  return _getInfo(code, 'uri');
}

function getPrefix(code) {
  const prefix = _getInfo(code, 'prefix');

  return prefix || '';
}

exports.getNS = getNS;
exports.getURI = getURI;
exports.getPrefix = getPrefix;

