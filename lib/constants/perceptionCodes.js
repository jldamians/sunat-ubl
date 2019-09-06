/**
 * Constants enumerating the perception codes.
 * Catálogo No. 22: "Código de Régimen de Percepciones"
 */

"use strict";

const utils = require('../utils');

const perceptionCodes = {};

perceptionCodes[exports.VENTA_INTERNA = '01'] = {
  text: 'Percepción Venta Interna',
  rate: 2.0,
};
perceptionCodes[exports.ADQUISICION_COMBUSTIBLE = '02'] = {
  text: 'Percepción a la adquisición de combustible',
  rate: 1.0,
};
perceptionCodes[exports.TASA_ESPECIAL = '03'] = {
  text: 'Percepción realizada al agente de percepción con tasa especial',
  rate: 0.5,
};

/**
 * Comprobar la existencia del código de percepción
 * @param {string} code, código de percepción
 * @return {boolean}
 */
function checkCode(code) {
  const hasOwnProperty = utils.hasOwnProperty(perceptionCodes, code);

  if (hasOwnProperty === true) {
    return true;
  } else {
    return false;
  }
}

function _getInfo(perceptionCode, fieldName) {
  const checking = checkCode(perceptionCode);

  if (checking === true) {
    return perceptionCodes[perceptionCode][fieldName];
  } else {
    throw new Error(`Catálogo Nro. 22, el código de tipo de percepción no existe: ${perceptionCode}`);
  }
}

/**
 * Obtener la descripción del tipo de percepción
 * @param {string} perceptionCode, código de tipo de percepción
 * @return {string}
 */
function getText(perceptionCode) {
  return _getInfo(perceptionCode);
}

/**
 * Obtener la tasa del tipo de percepción
 * @param {string} perceptionCode, código de tipo de percepción
 * @return {string}
 */
function getRate(perceptionCode) {
  return _getInfo(perceptionCode, 'rate');
}

exports.checkCode = checkCode;
exports.getText = getText;
exports.getRate = getRate;
