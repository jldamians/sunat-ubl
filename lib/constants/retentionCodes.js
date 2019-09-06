/**
 * Constants enumerating the retention codes.
 * Catálogo No. 23: "Código de Régimen de Retenciones"
 */

"use strict";

const utils = require('../utils');

const retentionCodes = {};

retentionCodes[exports.TASA_3 = '01'] = {
  text: 'Tasa 3%',
  rate: 3.0,
};
retentionCodes[exports.TASA_6 = '02'] = {
  text: 'Tasa 6%',
  rate: 6.0,
};

/**
 * Comprobar la existencia del código de retención
 * @param {string} code, código de retención
 * @return {boolean}
 */
function checkCode(code) {
  const hasOwnProperty = utils.hasOwnProperty(retentionCodes, code);

  if (hasOwnProperty === true) {
    return true;
  } else {
    return false;
  }
}

function _getInfo(retentionCode, fieldName) {
  const checking = checkCode(retentionCode);

  if (checking === true) {
    return retentionCodes[retentionCode][fieldName];
  } else {
    throw new Error(`Catálogo Nro. 23, el código de tipo de retención no existe: ${retentionCode}`);
  }
}

/**
 * Obtener la descripción del tipo de retención
 * @param {string} retentionCode, código de tipo de retención
 * @return {string}
 */
function getText(retentionCode) {
  return _getInfo(retentionCode, 'text');
}

/**
 * Obtener la tasa del tipo de retención
 * @param {string} perceptionCode, código de tipo de retención
 * @return {string}
 */
function getRate(retentionCode) {
  return _getInfo(retentionCode, 'rate');
}

exports.checkCode = checkCode;
exports.getText = getText;
exports.getRate = getRate;
