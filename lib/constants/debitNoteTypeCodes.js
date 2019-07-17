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

exports.getCreditNoteText = function(debitNoteTypeCode) {
  if (utils.hasOwnProperty(debitNoteTypeCodes, debitNoteTypeCode)) {
    return debitNoteTypeCodes[debitNoteTypeCode];
  } else {
    throw new Error(`El código del tipo de nota de débito electrónica no existe: ${debitNoteTypeCode}`);
  }
};
