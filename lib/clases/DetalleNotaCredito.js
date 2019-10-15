"use strict";

const DetalleNota = require('./DetalleNota');

class DetalleNotaCredito extends DetalleNota {
  constructor() {
    super(...arguments);
  }
}

module.exports = DetalleNotaCredito;
