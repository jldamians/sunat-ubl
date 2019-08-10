"use strict";

const ConceptoTributo = require('./ConceptoTributo');

class ConceptoTributoGlobal extends ConceptoTributo {
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

module.exports = ConceptoTributoGlobal;
