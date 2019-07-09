/**
 * Constants enumerating the document types.
 */

"use strict";

const utils = require('../utils');

const documentTypes = {};

documentTypes[exports.FA = '01'] = 'Factura';

documentTypes[exports.BV = '03'] = 'Boleta de venta';

documentTypes[exports.NC = '07'] = 'Nota de crédito';

documentTypes[exports.ND = '08'] = 'Nota de débito';

exports.getDocumentText = function(documentType) {
  if (utils.hasOwnProperty(documentTypes, documentType)) {
    return documentTypes[documentType];
  } else {
    throw new Error(`El tipo de documento no existe: ${documentType}`);
  }
};
