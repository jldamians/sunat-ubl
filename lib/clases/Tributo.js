"use strict";

const ImpuestoLinea = require('./ImpuestoLinea'),
      ImpuestoGlobal = require('./ImpuestoGlobal');

class Tributo {
  /**
   * @constructor
   * @param {String} codMoneda, código del tipo de moneda
   * @param {Double} mntTotal, monto total del tributo
   * @param {ImpuestoLinea[] | ImpuestoGlobal[]} impuestos, impuestos
   */
  constructor(codMoneda, mntTotal, impuestos = []) {
    this._codMoneda = codMoneda;
    this._mntTotal = mntTotal;
    this._impuestos = impuestos || [];
  }

  set codMoneda(codMoneda) {
    this._codMoneda = codMoneda;
  }
  get codMoneda() {
    return this._codMoneda;
  }

  set mntTotal(mntTotal) {
    this._mntTotal = mntTotal;
  }
  get mntTotal() {
    return this._mntTotal;
  }

  set impuestos(impuestos) {
    this._impuestos = impuestos;
  }
  get impuestos() {
    return this._impuestos;
  }

  addTax(tax) {
    const instanceOfTax = (
      tax instanceof ImpuestoLinea === true || tax instanceof ImpuestoGlobal === true
    );

    if (instanceOfTax === true) {
      tax.codMoneda = this._codMoneda;

      this._impuestos.push(tax);
    } else {
      throw new Error('Tipo de dato no permitido');
    }
  }
}

module.exports = Tributo;
