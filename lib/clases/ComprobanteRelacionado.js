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
   * @param {String} codMoneda, moneda del importe total de venta del cpe
   */
  constructor(
    tipoCpe=null,
    serie=null,
    numero=null,
    fechaEmision=null,
    imptTotalVenta=null,
    codMoneda=null
  ) {
    super(tipoCpe, serie, numero);

    this._fechaEmision = fechaEmision;
    this._imptTotalVenta = imptTotalVenta;
    this._codMoneda = codMoneda;
  }

  // Getters
    get fechaEmision() {
      return this._fechaEmision;
    }
    get imptTotalVenta() {
      return this._imptTotalVenta;
    }
    get codMoneda() {
      return this._codMoneda;
    }
}

module.exports = ComprobanteRelacionado;
