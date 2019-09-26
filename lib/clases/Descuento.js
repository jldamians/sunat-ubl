"use strict";

const Operacion = require('./Operacion');

class Descuento extends Operacion{
  constructor(
    codDescuento=null,
    tasa=null,
    imptBase=null,
    imptDescuento=null,
    codMoneda=null
  ) {
    super(codDescuento, tasa, imptBase, imptDescuento, codMoneda, false);
  }

  get codDescuento() {
    return this._codOperacion;
  }

  get imptDescuento() {
    return this._imptOperacion;
  }
}

module.exports = Descuento;
