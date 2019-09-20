"use string";

const { TipoMoneda } = require('sunat-catalogs');

class DetallePercepcion {
  constructor(
    /*tipoCpe=null,
    serie=null,
    numero=null,
    fechaEmision=null,
    imptTotalVenta=null,
    codMonedaVenta=null,*/
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
    //super(tipoCpe, serie, numero, fechaEmision, imptTotalVenta, codMonedaVenta);

    /*this._tipoCpe = tipoCpe;
    this._serie = serie;
    this._numero = numero;
    this._fechaEmision = fechaEmision;
    this._imptTotalVenta = imptTotalVenta;
    this._codMonedaVenta = codMonedaVenta;*/
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
  // Setters
    set cpe(cpe) {
      this._cpe = cpe;
    }
    set fechaCobro(fechaCobro) {
      this._fechaCobro = fechaCobro;
    }
    set numeroCobro(numeroCobro) {
      this._numeroCobro = numeroCobro;
    }
    set imptCobro(imptCobro) {
      this._imptCobro = imptCobro;
    }
    set codMonedaCobro(codMonedaCobro) {
      this._codMonedaCobro = codMonedaCobro;
    }
    set imptPercibido(imptPercibido) {
      this._imptPercibido = imptPercibido;
    }
    /*set codMonedaPercibido(codMonedaPercibido) {
      this._codMonedaPercibido = codMonedaPercibido;
    }*/
    set fechaPercepcion(fechaPercepcion) {
      this._fechaPercepcion = fechaPercepcion;
    }
    set imptCobrado(imptCobrado) {
      this._imptCobrado = imptCobrado;
    }
    /*set codMonedaCobrado(codMonedaCobrado) {
      this._codMonedaCobrado = codMonedaCobrado;
    }*/
    set tipoCambio(tipoCambio) {
      this._tipoCambio = tipoCambio;
    }
}

module.exports = DetallePercepcion;
