"use strict";

const DetalleNota = require('./DetalleNota');

class DetalleNotaDebito extends DetalleNota {
  constructor() {
    super(...arguments);

    this.tagCantidad = 'DebitedQuantitys';
    this.tagDetalle = 'DebitNoteLine';
  }
}

module.exports = DetalleNotaDebito;
