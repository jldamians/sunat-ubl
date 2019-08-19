"use strict";

const Operacion = require('./Operacion');

class Descuento extends Operacion{
  constructor() {
    super(...arguments);
  }
}

module.exports = Descuento;
