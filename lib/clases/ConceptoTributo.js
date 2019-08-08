"use strict";

class ConceptoTributo {
  /**
   * @constructor
   * @param {String} codigo, código de tributo
   * @param {Double} base, total valor de venta
   * @param {Double} monto, importe del tributo
   */
  constructor(codigo, base, monto) {
    this._codigo = codigo;
    this._base = base;
    this._monto = monto;
  }

  set codigo(codigo) {
    this._codigo = codigo;
  }
  get codigo() {
    return this._codigo;
  }

  set base(base) {
    this._base = base;
  }
  get base() {
    return this._base;
  }

  set monto(monto) {
    this._monto = monto;
  }
  get monto() {
    return this._monto;
  }
}

module.exports = ConceptoTributo;
