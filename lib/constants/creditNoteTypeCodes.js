/**
 * Constants enumerating the credit note type codes.
 * Catálogo No. 09: "Códigos de Tipo de Nota de Crédito Electrónica"
 */

"use strict";

const utils = require('../utils');

const creditNoteTypeCodes = {};

creditNoteTypeCodes[exports.ANULACION_OPERACION = '01'] = 'Anulación de la operación';

creditNoteTypeCodes[exports.ANULACION_ERROR_RUC = '02'] = 'Anulación por error en el RUC';

creditNoteTypeCodes[exports.CORRECCION_DESCRIPCION = '03'] = 'Corrección por error en la descripción';

creditNoteTypeCodes[exports.DESCUENTO_GLOBAL = '04'] = 'Descuento global';

creditNoteTypeCodes[exports.DESCUENTO_ITEM = '05'] = 'Descuento por ítem';

creditNoteTypeCodes[exports.DEVOLUCION_TOTAL = '06'] = 'Devolución total';

creditNoteTypeCodes[exports.DEVOLUCION_ITEM = '07'] = 'Devolución por ítem';

creditNoteTypeCodes[exports.BONIFICACION = '08'] = 'Bonificación';

creditNoteTypeCodes[exports.DISMINUCION_VALOR = '09'] = 'Disminución en el valor';

creditNoteTypeCodes[exports.OTROS_CONCEPTOS = '10'] = 'Otros Conceptos';

creditNoteTypeCodes[exports.AJUSTES_EXPORTACION = '11'] = 'Ajustes de operaciones de exportación';

creditNoteTypeCodes[exports.AJUSTES_IVAP = '12'] = 'Ajustes afectos al IVAP';

/**
 * Comprobar la existencia del código de tipo de nota de crédito
 * @param {string} code, código de tipo de nota de crédito
 * @return {boolean}
 */
function checkCode(code) {
  const hasOwnProperty = utils.hasOwnProperty(creditNoteTypeCodes, code);

  if (hasOwnProperty === true) {
    return true;
  } else {
    return false;
  }
}

/**
 * Obtener la descripción del tipo de nota de crédito
 * @param {string} creditNoteTypeCode, código de tipo de nota de crédito
 * @return {string}
 */
function getText(creditNoteTypeCode) {
  const checking = checkCode(creditNoteTypeCode);

  if (checking === true) {
    return creditNoteTypeCodes[creditNoteTypeCode];
  } else {
    throw new Error(`El código del tipo de nota de crédito electrónica no existe: ${creditNoteTypeCode}`);
  }
};

exports.checkCode = checkCode;
exports.getText = getText;
