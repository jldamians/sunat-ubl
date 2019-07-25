/**
 * Constants enumerating the related document type codes.
 * Catalog No 12: "Códigos de documentos relacionados tributarios"
 */

"use strict";

const utils = require('../utils');

const relatedDocumentTypeCodes = {};

relatedDocumentTypeCodes[exports.FA_CORREGIR_RUC = '01'] = 'Factura - emitida para corregir error en el RUC';
relatedDocumentTypeCodes[exports.FA_ANTICIPO = '02'] = 'Factura - emitida por anticipos';
relatedDocumentTypeCodes[exports.BV_ANTICIPO = '03'] = 'Boleta de Venta - emitida por anticipos';
relatedDocumentTypeCodes[exports.TICKET_SALIDA_ENAPU = '04'] = 'Ticket de Salida - ENAPU';
relatedDocumentTypeCodes[exports.CODIGO_SCOP = '05'] = 'Código SCOP';
relatedDocumentTypeCodes[exports.OTROS = '99'] = 'Otros';

/**
 * Comprobar la existencia del código de tipo de documento relacionado
 * @param {string} code, código de tipo de documento relacionado
 * @return {boolean}
 */
function checkCode(code) {
  const hasOwnProperty = utils.hasOwnProperty(relatedDocumentTypeCodes, code);

  if (hasOwnProperty === true) {
    return true;
  } else {
    return false;
  }
}

/**
 * Obtener la descripción del tipo de documento relacionado
 * @param {string} relatedDocumentTypeCode, código de tipo de documento relacionado
 * @return {string}
 */
function getText(relatedDocumentTypeCode) {
  const checking = checkCode(relatedDocumentTypeCode);

  if (checking === true) {
    return relatedDocumentTypeCodes[relatedDocumentTypeCode];
  } else {
    throw new Error(`Catálogo Nro. 12, el código de documento relacionado no existe: ${relatedDocumentTypeCode}`);
  }
};

exports.checkCode = checkCode;
exports.getText = getText;
