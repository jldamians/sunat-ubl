/**
 * Constants enumerating the debit note type codes.
 * Catálogo No. 10: "Códigos de Tipo de Nota de Débito Electrónica"
 */

"use strict";

const utils = require('../utils');

const debitNoteTypeCodes = {};

debitNoteTypeCodes[exports.INTERESES_MORA = '01'] = 'Intereses por mora';
debitNoteTypeCodes[exports.AUMENTO_VALOR = '02'] = 'Aumento en el valor';
debitNoteTypeCodes[exports.PENALIDADES = '03'] = 'Penalidades/ otros conceptos';
debitNoteTypeCodes[exports.AJUSTES_EXPORTACION = '11'] = 'Ajustes de operaciones de exportación';
debitNoteTypeCodes[exports.AJUSTES_IVAP = '12'] = 'Ajustes afectos al IVAP';

/**
 * Comprobar la existencia del código de tipo de nota de débito
 * @param {string} code, código de tipo de nota de débito
 * @return {boolean}
 */
function checkCode(code) {
  const hasOwnProperty = utils.hasOwnProperty(debitNoteTypeCodes, code);

  if (hasOwnProperty === true) {
    return true;
  } else {
    return false;
  }
}

/**
 * Obtener la descripción del tipo de nota de débito
 * @param {string} creditNoteTypeCode, código de tipo de nota de débito
 * @return {string}
 */
function getText(debitNoteTypeCode) {
  const checking = checkCode(debitNoteTypeCode);

  if (checking === true) {
    return debitNoteTypeCodes[debitNoteTypeCode];
  } else {
    throw new Error(`Catálogo Nro. 10, el código de tipo de nota de débito no existe: ${debitNoteTypeCode}`);
  }
}

exports.checkCode = checkCode;
exports.getText = getText;
