"use strict";

const Comprobante = require('./Comprobante');

class ComprobanteRelacionado extends Comprobante{
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
    tipoCpe=null,
    serie=null,
    numero=null,
    fechaEmision=null,
    imptTotalVenta=null,
    codMonedaVenta=null
  ) {
    super(tipoCpe, serie, numero);

    this._fechaEmision = fechaEmision;
    this._imptTotalVenta = imptTotalVenta;
    this._codMonedaVenta = codMonedaVenta;
  }

  // Getters
    get fechaEmision() {
      return this._fechaEmision;
    }
    get imptTotalVenta() {
      return this._imptTotalVenta;
    }
    get codMonedaVenta() {
      return this._codMonedaVenta;
    }
  // Setters
    set fechaEmision(fechaEmision) {
      this._fechaEmision = fechaEmision;
    }
    set imptTotalVenta(imptTotalVenta) {
      this._imptTotalVenta = imptTotalVenta;
    }
    set codMonedaVenta(codMonedaVenta) {
      this._codMonedaVenta = codMonedaVenta;
    }
}

module.exports = ComprobanteRelacionado;
