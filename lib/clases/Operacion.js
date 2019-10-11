"use strict";

class Operacion {
  constructor(
    codOperacion=null,
    tasa=null,
    imptBase=null,
    imptOperacion=null,
    codMoneda=null,
    indicador=null
  ) {
    this._codOperacion = codOperacion;
    this._tasa = tasa;
    this._imptBase = imptBase;
    this._imptOperacion = imptOperacion;
    this._codMoneda = codMoneda;
    this._indicador = indicador;
  }

  // Getters
    get imptBase(){
      return this._imptBase;
    }
    get codMoneda(){
      return this._codMoneda;
    }
    get indicador() {
      return this._indicador;
    }

  // Methods
  defCodMoneda(codMoneda=null) {
    this._codMoneda = codMoneda;
  }
}

module.exports = Operacion;
