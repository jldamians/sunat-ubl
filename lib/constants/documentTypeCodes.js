/**
 * Constants enumerating the document type codes.
 * Catálogo No. 01: "Código de Tipo de Documento"
 */

"use strict";

const utils = require('../utils');

const documentTypeCodes = {};

documentTypeCodes[exports.FA = '01'] = 'Factura';
documentTypeCodes[exports.BV = '03'] = 'Boleta de venta';
documentTypeCodes[exports.NC = '07'] = 'Nota de crédito';
documentTypeCodes[exports.ND = '08'] = 'Nota de débito';
documentTypeCodes[exports.GRR = '09'] = 'Guía de remisión remitente';

/**
 * Comprobar la existencia del código de tipo de comprobante
 * @param {string} code, código de tipo de comprobante
 * @return {boolean}
 */
function checkCode(code) {
  const hasOwnProperty = utils.hasOwnProperty(documentTypeCodes, code);

  if (hasOwnProperty === true) {
    return true;
  } else {
    return false;
  }
}

/**
 * Obtener la descripción del tipo de comprobante
 * @param {string} documentTypeCode, código de tipo de comprobante
 * @return {string}
 */
function getText(documentTypeCode) {
  const checking = checkCode(documentTypeCode);

  if (checking === true) {
    return documentTypeCodes[documentTypeCode];
  } else {
    throw new Error(`Catálogo Nro. 01, el código de tipo de comprobante no existe: ${documentTypeCode}`);
  }
};

exports.checkCode = checkCode;
exports.getText = getText;

