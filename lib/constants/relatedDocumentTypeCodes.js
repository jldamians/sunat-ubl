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

exports.getRelatedDocumentText = function(relatedDocumentTypeCode) {
  if (utils.hasOwnProperty(relatedDocumentTypeCodes, relatedDocumentTypeCode)) {
    return relatedDocumentTypeCodes[relatedDocumentTypeCode];
  } else {
    throw new Error(`El código del documento relacionado no existe: ${relatedDocumentTypeCode}`);
  }
};
