/**
 * Constants enumerating the xmlns.
 */

"use strict";

const utils = require('../utils');

const xmlns = {};

const UNECE_URI = 'urn:un:unece:uncefact',
      OASIS_URI = 'urn:oasis:names:specification:ubl:schema:xsd',
      SUNAT_URI = 'urn:sunat:names:specification:ubl:peru:schema:xsd';

xmlns[exports.ds = 'ds'] = {
  uri: 'http://www.w3.org/2000/09/xmldsig#',
  prefix: true,
};
xmlns[exports.sac = 'sac'] = {
  uri: `${SUNAT_URI}:SunatAggregateComponents-1`,
  prefix: true,
};
xmlns[exports.ext = 'ext'] = {
  uri: `${OASIS_URI}:CommonExtensionComponents-2`,
  prefix: true,
};
xmlns[exports.cbc = 'cbc'] = {
  uri: `${OASIS_URI}:CommonBasicComponents-2`,
  prefix: true,
};
xmlns[exports.cac = 'cac'] = {
  uri: `${OASIS_URI}:CommonAggregateComponents-2`,
  prefix: true,
};
xmlns[exports.debit = 'debit'] = {
  uri: `${OASIS_URI}:DebitNote-2`,
  prefix: false,
};
xmlns[exports.credit = 'credit'] = {
  uri: `${OASIS_URI}:CreditNote-2`,
  prefix: false,
};
xmlns[exports.invoice = 'invoice'] = {
  uri: `${OASIS_URI}:Invoice-2`,
  prefix: false,
};
xmlns[exports.ccts = 'ccts'] = {
  uri: `${UNECE_URI}:documentation:2`,
  prefix: true,
};
xmlns[exports.udt = 'udt'] = {
  uri: `${UNECE_URI}:data:specification:UnqualifiedDataTypesSchemaModule:2`,
  prefix: true,
};
xmlns[exports.qdt = 'qdt'] = {
  uri: `${OASIS_URI}:QualifiedDatatypes-2`,
  prefix: true,
};
xmlns[exports.xsi = 'xsi'] = {
  uri: 'http://www.w3.org/2001/XMLSchema-instance',
  prefix: true,
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

function getPrefix(code) {
  const prefixIndicator = _getInfo(code, 'prefix');

  if (prefixIndicator === true) {
    return `${code}:`;
  } else {
    return '';
  }
}

function getNS(code) {
  const prefixIndicator = _getInfo(code, 'prefix');

  if (prefixIndicator === true) {
    return `xmlns:${code}`;
  } else {
    return 'xmlns';
  }
}

function getURI(code) {
  return _getInfo(code, 'uri');
}

exports.getNS = getNS;
exports.getURI = getURI;
exports.getPrefix = getPrefix;

