"use strict";

const Impuesto = require('./Impuesto');

class ImpuestoGlobal extends Impuesto {
  /**
   * @constructor
   * @param {String} codigo, código de tributo
   * @param {Double} base, total valor de venta
   * @param {Double} monto, importe del tributo
   */
  constructor(codigo, base, monto) {
    super(codigo, base, monto, null);
  }
}

module.exports = ImpuestoGlobal;
