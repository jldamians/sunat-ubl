"use strict";

const Operacion = require('./Operacion');

class Cargo extends Operacion{
  constructor(
    codCargo=null,
    tasa=null,
    imptBase=null,
    imptCargo=null,
    codMoneda=null
  ) {
    super(codCargo, tasa, imptBase, imptCargo, codMoneda, true);
  }

  get codCargo() {
    return this._codOperacion;
  }

  get imptCargo() {
    return this._imptOperacion;
  }
}

module.exports = Cargo;
