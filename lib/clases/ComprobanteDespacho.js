"use strict";

const Comprobante = require('./Comprobante');

class ComprobanteDespacho extends Comprobante{
  constructor() {
    super(...arguments);
  }
}

module.exports = ComprobanteDespacho;
