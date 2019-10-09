"use strict";

class Tributo {
  /**
   * @constructor
   * @param {String} codMoneda, código del tipo de moneda
   * @param {Double} imptTotal, monto total del tributo
   * @param {ImpuestoLinea[] | ImpuestoGlobal[]} impuestos, impuestos
   */
  constructor(codMoneda=null, imptTotal=null, impuestos = []) {
    this._codMoneda = codMoneda;
    this._imptTotal = imptTotal;
    this._impuestos = impuestos;
  }

  // Getters
    get codMoneda() {
      return this._codMoneda;
    }
    get imptTotal() {
      return this._imptTotal;
    }
    get impuestos() {
      return this._impuestos;
    }

  // Methods
    agrImpuesto(impuesto) {
      this._impuestos.push(impuesto);
    }
}

module.exports = Tributo;
