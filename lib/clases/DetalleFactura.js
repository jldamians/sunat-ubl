"use strict";

const Detalle = require('./Detalle');

class DetalleFactura extends Detalle{
  constructor() {
    super(...arguments);
  }
}

module.exports = DetalleFactura;
