/**
 * Constants enumerating the sales price type codes.
 * Catálogo No. 16: "Códigos de Tipo de Precio de Venta Unitario"
 */

"use strict";

const utils = require('../utils');

const salePriceTypeCodes = {};

salePriceTypeCodes[exports.PRECIO = '01'] = 'Precio unitario (incluye el IGV)';
salePriceTypeCodes[exports.VALOR = '02'] = 'Valor referencial unitario en operaciones no onerosas (Gratuitas)';

/**
 * Comprobar la existencia del código de tipo de precio de venta
 * @param {string} code, código de tipo de precio de venta
 * @return {boolean}
 */
function checkCode(code) {
  const hasOwnProperty = utils.hasOwnProperty(salePriceTypeCodes, code);

  if (hasOwnProperty === true) {
    return true;
  } else {
    return false;
  }
}

/**
 * Obtener la descripción del tipo de precio de venta
 * @param {string} salePriceTypeCode, código de tipo de precio de venta
 * @return {string}
 */
function getText(salePriceTypeCode) {
  const checking = checkCode(salePriceTypeCode);

  if (checking === true) {
    return salePriceTypeCodes[salePriceTypeCode];
  } else {
    throw new Error(`Catálogo Nro. 16, el código de tipo de precio de venta no existe: ${salePriceTypeCode}`);
  }
}

exports.getText = getText;
exports.checkCode = checkCode;
