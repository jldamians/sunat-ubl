"use strict";

const ConceptoTributo = require('./ConceptoTributo');

class ConceptoTributoLinea extends ConceptoTributo {
  /**
   * @constructor
   * @param {String} codigo, código de tributo
   * @param {Double} base, total valor de venta
   * @param {Double} tasa, tasa del tributo
   * @param {Double} monto, importe del tributo
   * @param {String} tipoAfectacionIgv, tipo de afectación del igv
   * @param {String} tipoAfectacionIsc, tipo de sistema de cálculo del isc
   */
  constructor(codigo, base, tasa, monto, tipoAfectacionIgv, tipoAfectacionIsc) {
    super(codigo, base, monto);

    this._tasa = tasa;
    this._tipoAfectacionIgv = tipoAfectacionIgv;
    this._tipoAfectacionIsc = tipoAfectacionIsc;
  }

  set tasa(tasa) {
    this._tasa = tasa;
  }
  get tasa() {
    return this._tasa;
  }

  set tipoAfectacionIgv(tipoAfectacionIgv) {
    this._tipoAfectacionIgv = tipoAfectacionIgv;
  }
  get tipoAfectacionIgv() {
    return this._tipoAfectacionIgv;
  }

  set tipoAfectacionIsc(tipoAfectacionIsc) {
    this._tipoAfectacionIsc = tipoAfectacionIsc;
  }
  get tipoAfectacionIsc() {
    return this._tipoAfectacionIsc;
  }
}

module.exports = ConceptoTributoLinea;
