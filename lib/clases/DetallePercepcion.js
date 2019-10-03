"use string";

const {
  TipoMoneda,
} = require('sunat-catalogs');

class DetallePercepcion {
  constructor(
    cpe=null,
    fechaCobro=null,
    numeroCobro=null,
    imptCobro=null,
    codMonedaCobro=null,
    imptPercibido=null,
    fechaPercepcion=null,
    imptCobrado=null,
    tipoCambio=null
  ) {
    this._cpe = cpe;
    this._fechaCobro = fechaCobro;
    this._numeroCobro = numeroCobro;
    this._imptCobro = imptCobro;
    this._codMonedaCobro = codMonedaCobro;
    this._imptPercibido = imptPercibido;
    this._codMonedaPercibido = TipoMoneda.SOL;
    this._fechaPercepcion = fechaPercepcion;
    this._imptCobrado = imptCobrado;
    this._codMonedaCobrado = TipoMoneda.SOL;
    this._tipoCambio = tipoCambio;
  }

  // Getters
    get cpe() {
      return this._cpe;
    }
    get fechaCobro() {
      return this._fechaCobro;
    }
    get numeroCobro() {
      return this._numeroCobro;
    }
    get imptCobro() {
      return this._imptCobro;
    }
    get codMonedaCobro() {
      return this._codMonedaCobro;
    }
    get imptPercibido() {
      return this._imptPercibido;
    }
    get codMonedaPercibido() {
      return this._codMonedaPercibido;
    }
    get fechaPercepcion() {
      return this._fechaPercepcion;
    }
    get imptCobrado() {
      return this._imptCobrado;
    }
    get codMonedaCobrado() {
      return this._codMonedaCobrado;
    }
    get tipoCambio() {
      return this._tipoCambio;
    }
}

module.exports = DetallePercepcion;
