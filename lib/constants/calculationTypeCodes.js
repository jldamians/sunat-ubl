/**
 * Constants enumerating the calculation type codes.
 * Catálogo No. 08: "Códigos de Tipo de Sistema de Cálculo del ISC"
 */

"use strict";

const utils = require('../utils');

const calculationTypeCodes = {};

calculationTypeCodes[exports.SISTEMA_VALOR = '01'] = 'Sistema al valor (Apéndice IV, lit. A – T.U.O IGV e ISC)';
calculationTypeCodes[exports.APLICACION_MONTO_FIJO = '02'] = 'Aplicación del Monto Fijo (Apéndice IV, lit. B – T.U.O IGV e ISC)';
calculationTypeCodes[exports.SISTEMA_PRECIO_PUBLICO = '03'] = 'Sistema de Precios de Venta al Público (Apéndice IV, lit. C – T.U.O IGV e ISC)';

/**
 * Comprobar la existencia del código de tipo de sistema de cálculo
 * @param {string} code, código de tipo de sistema de cálculo
 * @return {boolean}
 */
function checkCode(code) {
  const hasOwnProperty = utils.hasOwnProperty(calculationTypeCodes, code);

  if (hasOwnProperty === true) {
    return true;
  } else {
    return false;
  }
}

/**
 * Obtener la descripción del tipo de sistema de cálculo
 * @param {string} calculationTypeCode, código de tipo de sistema de cálculo
 * @return {string}
 */
function getText(calculationTypeCode) {
  const checking = checkCode(calculationTypeCode);

  if (checking === true) {
    return calculationTypeCodes[calculationTypeCode];
  } else {
    throw new Error(`Catálogo Nro. 08, el código de tipo de sistema de cálculo no existe: ${calculationTypeCode}`);
  }
}

exports.checkCode = checkCode;
exports.getText = getText;
