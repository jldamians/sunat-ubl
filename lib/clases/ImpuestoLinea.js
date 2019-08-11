"use strict";

const Impuesto = require('./Impuesto');

class ImpuestoLinea extends Impuesto {
  /**
   * @constructor
   * @param {String} codigo, código
   * @param {Double} base, total valor de venta
   * @param {Double} tasa, tasa
   * @param {Double} monto, importe
   * @param {String} tipoAfectacionIgv, tipo de afectación del igv
   * @param {String} tipoAfectacionIsc, tipo de sistema de cálculo del isc
   */
  constructor(codigo, base, tasa, monto, tipoAfectacionIgv = null, tipoAfectacionIsc = null) {
    super(codigo, base, monto, null);

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

module.exports = ImpuestoLinea;
