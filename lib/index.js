"use strict";

const InvoiceXML = require('./xml/Invoice'),
      RetentionXML = require('./xml/Retention'),
      PerceptionXML = require('./xml/Perception');

const CPEFactura = require('./clases/CPEFactura'),
      CPERetencion = require('./clases/CPERetencion'),
      CPEPercepcion = require('./clases/CPEPercepcion');

exports = module.exports = (cpe) => {
  let ubl;

  if (cpe instanceof CPERetencion === true) {
    ubl = new RetentionXML(cpe);
  } else if (cpe instanceof CPEPercepcion === true) {
    ubl = new PerceptionXML(cpe);
  } else if (cpe instanceof CPEFactura === true) {
    ubl = new InvoiceXML(cpe);
  }

  return ubl.toString();
};

exports.CPEFactura = CPEFactura;
exports.CPERetencion = CPERetencion;
exports.CPEPercepcion = CPEPercepcion;

exports.DetalleFactura = require('./clases/DetalleFactura');
exports.DetalleRetencion = require('./clases/DetalleRetencion');
exports.DetallePercepcion = require('./clases/DetallePercepcion');
