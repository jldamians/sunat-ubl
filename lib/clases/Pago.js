"use strict";

class Pago {
  /**
   * @constructor
   * @param {String} identificador, identificador del pago
   * @param {String} fechaPago, fecha del pago
   * @param {Double} imptPago, importe del pago
   * @param {String} codMoneda, tipo de moneda del pago
   */
  constructor(identificador=null, fechaPago=null, imptPago=null, codMoneda=null) {
    this._identificador = identificador;
    this._fechaPago = fechaPago;
    this._imptPago = imptPago;
    this._codMoneda = codMoneda;
  }

  // Getters
    get identificador() {
      return this._identificador;
    }
    get fechaPago() {
      return this._fechaPago;
    }
    get imptPago() {
      return this._imptPago;
    }
    get codMoneda() {
      return this._codMoneda;
    }
  // Setters
    set identificador(identificador) {
      this._identificador = identificador;
    }
    set fechaPago(fechaPago) {
      this._fechaPago = fechaPago;
    }
    set imptPago(imptPago) {
      this._imptPago = imptPago;
    }
    set codMoneda(codMoneda) {
      this._codMoneda = codMoneda;
    }
}

module.exports = Pago;
