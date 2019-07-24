/**
 * Constants enumerating the currency type codes.
 * Catálogo No. 02: "Códigos de Tipo de Moneda"
 */

"use strict";

const utils = require('../utils');

const currencyTypeCodes = {};

currencyTypeCodes[exports.PEN = 'PEN'] = 'Sol';
currencyTypeCodes[exports.USD = 'USD'] = 'US Dollar';
currencyTypeCodes[exports.EUR = 'EUR'] = 'Euro';
currencyTypeCodes[exports.BRL = 'BRL'] = 'Brazilian Real';

/**
 * Comprobar la existencia del código de tipo de moneda
 * @param {string} code, código de tipo de moneda
 * @return {boolean}
 */
function checkCode(code) {
  const hasOwnProperty = utils.hasOwnProperty(currencyTypeCodes, code);

  if (hasOwnProperty === true) {
    return true;
  } else {
    return false;
  }
}

/**
 * Obtener la descripción del tipo de moneda
 * @param {string} currencyTypeCode, código de tipo moneda
 * @return {string}
 */
function getText(currencyTypeCode) {
  const checking = checkCode(currencyTypeCode);

  if (checking === true) {
    return currencyTypeCodes[currencyTypeCode];
  } else {
    throw new Error(`El código del tipo de moneda no existe: ${currencyTypeCode}`);
  }
};

exports.checkCode = checkCode;
exports.getText = getText;
