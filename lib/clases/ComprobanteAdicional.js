"use strict";

const Comprobante = require('./Comprobante');

class ComprobanteAdicional extends Comprobante{
  constructor() {
    super(...arguments);
  }
}

module.exports = ComprobanteAdicional;
