"use strict";

class Comprobante {
  /**
   * @constructor
   * @param {String} tipoCpe, tipo de cpe
   * @param {String} serie, serie de cpe
   * @param {Integer} numero, número de cpe
   * @param {String} fechaEmision, fecha de emisión del cpe
   * @param {Double} imptTotalVenta, importe total de venta del cpe
   * @param {String} codMonedaVenta, moneda del importe total de venta del cpe
   */
  constructor(
    tipoCpe,
    serie,
    numero/*,
    fechaEmision,
    imptTotalVenta,
    codMonedaVenta*/
  ) {
    this._tipoCpe = tipoCpe;
    this._serie = serie;
    this._numero = numero;
    /*this._fechaEmision = fechaEmision;
    this._imptTotalVenta = imptTotalVenta;
    this._codMonedaVenta = codMonedaVenta;*/
  }

  // Getters
    get tipoCpe() {
      return this._tipoCpe;
    }
    get serie() {
      return this._serie;
    }
    get numero() {
      return this._numero;
    }
    /*get fechaEmision() {
      return this._fechaEmision;
    }
    get imptTotalVenta() {
      return this._imptTotalVenta;
    }
    get codMonedaVenta() {
      return this._codMonedaVenta;
    }*/
  // Setters
    set tipoCpe(tipoCpe) {
      this._tipoCpe = tipoCpe;
    }
    set serie(serie) {
      this._serie = serie;
    }
    set numero(numero) {
      this._numero = numero;
    }
    /*set fechaEmision(fechaEmision) {
      this._fechaEmision = fechaEmision;
    }
    set imptTotalVenta(imptTotalVenta) {
      this._imptTotalVenta = imptTotalVenta;
    }
    set codMonedaVenta(codMonedaVenta) {
      this._codMonedaVenta = codMonedaVenta;
    }*/
}

module.exports = Comprobante;
