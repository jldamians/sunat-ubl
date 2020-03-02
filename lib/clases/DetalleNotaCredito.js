"use strict";

const DetalleNota = require('./DetalleNota');

class DetalleNotaCredito extends DetalleNota {
  constructor() {
    super(...arguments);

    this.tagCantidad = 'CreditedQuantity';
    this.tagDetalle = 'CreditNoteLine';
  }
}

module.exports = DetalleNotaCredito;
