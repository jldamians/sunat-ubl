"use strict";

const InvoiceXML = require('./xml/Invoice'),
      RetentionXML = require('./xml/Retention'),
      DebitNoteXML = require('./xml/DebitNote'),
      PerceptionXML = require('./xml/Perception'),
      CreditNoteXML = require('./xml/CreditNote');

const {
  CPEBoleta,
  CPEFactura,
  CPERetencion,
  CPEPercepcion,
  CPENotaDebito,
  CPENotaCredito,
} = require('./clases');

exports = module.exports = (cpe) => {
  let ubl;

  if (cpe instanceof CPERetencion === true) {
    ubl = new RetentionXML(cpe);
  } else if (cpe instanceof CPEPercepcion === true) {
    ubl = new PerceptionXML(cpe);
  } else if (cpe instanceof CPEFactura === true || cpe instanceof CPEBoleta === true) {
    ubl = new InvoiceXML(cpe);
  } else if (cpe instanceof CPENotaCredito === true) {
    ubl = new CreditNoteXML(cpe);
  } else if (cpe instanceof CPENotaDebito === true) {
    ubl = new DebitNoteXML(cpe);
  }

  return ubl.toString();
};

exports.CPEBoleta = CPEBoleta;
exports.CPEFactura = CPEFactura;
exports.CPERetencion = CPERetencion;
exports.CPEPercepcion = CPEPercepcion;
exports.CPENotaDebito = CPENotaDebito;
exports.CPENotaCredito = CPENotaCredito;

exports.DetalleFactura = require('./clases/DetalleFactura');
exports.DetalleRetencion = require('./clases/DetalleRetencion');
exports.DetallePercepcion = require('./clases/DetallePercepcion');
exports.DetalleNotaDebito = require('./clases/DetalleNotaDebito');
exports.DetalleNotaCredito = require('./clases/DetalleNotaCredito');
