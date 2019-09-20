"use strict";

class Pago {
  /**
   * @constructor
   * @param {String} identificador, identificador del pago
   * @param {String} fechaPago, fecha del pago
   * @param {Double} imptPago, importe del pago
   * @param {String} codMonedaPago, tipo de moneda del pago
   */
  constructor(identificador=null, fechaPago=null, imptPago=null, codMonedaPago=null) {
    this._identificador = identificador;
    this._fechaPago = fechaPago;
    this._imptPago = imptPago;
    this._codMonedaPago = codMonedaPago;
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
    get codMonedaPago() {
      return this._codMonedaPago;
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
    set codMonedaPago(codMonedaPago) {
      this._codMonedaPago = codMonedaPago;
    }
}

module.exports = Pago;
