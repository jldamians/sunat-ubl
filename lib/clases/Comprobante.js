"use strict";

class Comprobante {
  /**
   * @constructor
   * @param {String} tipo, tipo de comprobante
   * @param {String} serie, serie de comprobante
   * @param {Integer} numero, número de comprobante
   */
  constructor(tipo, serie, numero) {
    this._tipo = tipo;
    this._serie = serie;
    this._numero = numero;
  }

  get tipo() {
    return this._tipo;
  }

  get serie() {
    return this._serie;
  }

  get numero() {
    return this._numero;
  }
}

module.exports = Comprobante;
