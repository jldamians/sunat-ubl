"use strict";

const DetalleNota = require('./DetalleNota');

class DetalleNotaDebito extends DetalleNota {
  constructor() {
    super(...arguments);
  }
}

module.exports = DetalleNotaDebito;
