"use strict";

const Detalle = require('./Detalle');

class DetalleNotaDebito extends Detalle {
  constructor() {
    super(...arguments);
  }
}

module.exports = DetalleNotaDebito;
