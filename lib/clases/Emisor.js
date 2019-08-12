"use strict";

const Persona = require('./Persona');

class Emisor extends Persona {
  constructor(razonSocial, nombreComercial, tipoDocumento, numeroDocumento, direccion) {
    super(razonSocial, tipoDocumento, numeroDocumento, direccion);

    this._nombreComercial = nombreComercial;
  }

  set nombreComercial(nombreComercial) {
    this._nombreComercial = nombreComercial;
  }
  get nombreComercial() {
    return this._nombreComercial;
  }
}

module.exports = Emisor;
