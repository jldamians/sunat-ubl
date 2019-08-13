"use strict";

const Comprobante = require('./Comprobante');

class ComprobanteAnticipo extends Comprobante{
  /**
   * @constructor
   * @param {String} tipo, tipo de comprobante de anticpo
   * @param {String} serie, serie de comprobante de anticipo
   * @param {Integer} numero, número de comprobante de anticipo
   * @param {String} fechaPago, fecha de pago del anticipo
   * @param {Double} monto, monto anticipado
   * @param {Emisor} emisor, emisor del anticipo
   */
  constructor(tipo, serie, numero, fechaPago, monto, emisor) {
    super(tipo, serie, numero);

    this._fechaPago = fechaPago;
    this._monto = monto;
    this._identificador = `${this._tipo}-${this._serie}-${this._numero}`;
    this._emisor = emisor;
  }

  get identificador() {
    return this._identificador;
  }

  get emisor() {
    return this._emisor;
  }

  get fechaPago() {
    return this._fechaPago;
  }

  get monto() {
    return this._monto;
  }
}

module.exports = ComprobanteAnticipo;
