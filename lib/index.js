"use strict";

const //InvoiceXML = require('./xml/Invoice'),
      //DebitNoteXML = require('./xml/DebitNote'),
      //CreditNoteXML = require('./xml/CreditNote'),
      RetentionXML = require('./xml/Retention'),
      PerceptionXML = require('./xml/Perception');

const CPERetencion = require('./clases/CPERetencion'),
      CPEPercepcion = require('./clases/CPEPercepcion');

exports = module.exports = (cpe) => {
  let ubl;

  if (cpe instanceof CPERetencion === true) {
    ubl = new RetentionXML(cpe);
  } else if (cpe instanceof CPEPercepcion === true) {
    ubl = new PerceptionXML(cpe);
  }

  return ubl.toString();
};

exports.Emisor = require('./clases/Emisor');
exports.Receptor = require('./clases/Receptor');
exports.Direccion = require('./clases/Direccion');
exports.TipoCambio = require('./clases/TipoCambio');
exports.CPERetencion = CPERetencion;
exports.DetalleRetencion = require('./clases/DetalleRetencion');
exports.CPEPercepcion = CPEPercepcion;
exports.DetallePercepcion = require('./clases/DetallePercepcion');
exports.ComprobanteRelacionado = require('./clases/ComprobanteRelacionado');
