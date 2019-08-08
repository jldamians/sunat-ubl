"use strict";

class Tributo {
  /**
   * @constructor
   * @param {Double} mntTotal, monto total del tributo
   * @param {ConceptoTributo[] | ConceptoTributoLinea[]} conceptos, conceptos tributarios
   */
  constructor(mntTotal, conceptos) {
    this._mntTotal = mntTotal;
    this._conceptos = conceptos;
  }

  set mntTotal(mntTotal) {
    this._mntTotal = mntTotal;
  }
  get mntTotal() {
    return this._mntTotal;
  }

  set conceptos(conceptos) {
    this._conceptos = conceptos;
  }
  get conceptos() {
    return this._conceptos;
  }
}

module.exports = Tributo;
