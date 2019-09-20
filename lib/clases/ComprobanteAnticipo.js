"use strict";

const Comprobante = require('./Comprobante');

class ComprobanteAnticipo extends Comprobante{
  /**
   * @constructor
   * @param {String} tipoCpe, tipo de comprobante de anticipo
   * @param {String} serie, serie de comprobante de anticipo
   * @param {Integer} numero, número de comprobante de anticipo
   * @param {String} fechaPago, fecha de pago del anticipo
   * @param {Double} monto, monto anticipado
   * @param {Emisor} emisor, emisor del anticipo
   */
  constructor(
    tipoCpe=null,
    serie=null,
    numero=null,
    fechaPago=null,
    monto=null,
    codMoneda=null,
    emisor=null
  ) {
    super(tipoCpe, serie, numero);

    this._identificador = `${this._tipo}-${this._serie}-${this._numero}`;
    this._fechaPago = fechaPago;
    this._monto = monto;
    this._codMoneda = codMoneda;
    this._emisor = emisor;
  }

  get identificador() {
    return this._identificador;
  }

  get fechaPago() {
    return this._fechaPago;
  }

  get monto() {
    return this._monto;
  }

  get codMoneda() {
    return this._codMoneda;
  }

  get emisor() {
    return this._emisor;
  }
}

module.exports = ComprobanteAnticipo;
