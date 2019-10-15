"use strict";

const Comprobante = require('./Comprobante');

class ComprobanteFacturacion extends Comprobante{
  constructor() {
    super(...arguments);
  }
}

module.exports = ComprobanteFacturacion;
