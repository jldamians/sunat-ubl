"use strict";

const Operacion = require('./Operacion');

class Cargo extends Operacion{
  constructor() {
    super(...arguments);
  }
}

module.exports = Cargo;
