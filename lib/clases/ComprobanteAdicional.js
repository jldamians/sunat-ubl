"use strict";

const Comprobante = require('./Comprobante');

class ComprobanteAdicional extends Comprobante{
  /**
   * @constructor
   * @param {String} tipo, tipo de comprobante
   * @param {String} serie, serie de comprobante
   * @param {Integer} numero, número de comprobante
   */
  constructor(tipo, serie, numero) {
    super(tipo, serie, numero);
  }
}

module.exports = ComprobanteAdicional;
