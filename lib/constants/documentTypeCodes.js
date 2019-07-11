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

exports.getDocumentText = function(documentTypeCode) {
  if (utils.hasOwnProperty(documentTypeCodes, documentTypeCode)) {
    return documentTypeCodes[documentTypeCode];
  } else {
    throw new Error(`El código del tipo de documento no existe: ${documentTypeCode}`);
  }
};
