"use strict";

const Persona = require('./Persona');

class Receptor extends Persona {
  constructor(razonSocial, tipoDocumento, numeroDocumento, direccion) {
    super(razonSocial, tipoDocumento, numeroDocumento, direccion);
  }
}

module.exports = Receptor;
