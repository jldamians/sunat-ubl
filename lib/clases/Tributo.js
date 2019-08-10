"use strict";

const ConceptoTributoLinea = require('./ConceptoTributoLinea'),
      ConceptoTributoGlobal = require('./ConceptoTributoGlobal');

class Tributo {
  /**
   * @constructor
   * @param {String} codMoneda, código del tipo de moneda
   * @param {Double} mntTotal, monto total del tributo
   * @param {ConceptoTributo[] | ConceptoTributoLinea[]} conceptos, conceptos tributarios
   */
  constructor(codMoneda, mntTotal, conceptos = []) {
    this._codMoneda = codMoneda;
    this._mntTotal = mntTotal;
    this._conceptos = conceptos;
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

  set conceptos(conceptos) {
    this._conceptos = conceptos;
  }
  get conceptos() {
    return this._conceptos;
  }

  addConcept(concept) {
    const instanceOfConcept = (
      concept instanceof ConceptoTributoLinea === true ||
      concept instanceof ConceptoTributoGlobal === true
    );

    if (instanceOfConcept === true) {
      concept.codMoneda = this._codMoneda;

      this._conceptos.push(concept);
    } else {
      throw new Error('');
    }
  }
}

module.exports = Tributo;
