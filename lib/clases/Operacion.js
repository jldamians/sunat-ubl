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
    /*get codOperacion(){
      return this._codOperacion;
    }*/
    get tasa(){
      return this._tasa;
    }
    get imptBase(){
      return this._imptBase;
    }
    /*get imptOperacion(){
      return this._imptOperacion;
    }*/
    get codMoneda(){
      return this._codMoneda;
    }
    get indicador() {
      return this._indicador;
    }
}

module.exports = Operacion;
