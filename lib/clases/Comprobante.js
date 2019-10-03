"use strict";

class Comprobante {
  /**
   * @constructor
   * @param {String} tipoCpe, tipo de cpe
   * @param {String} serie, serie de cpe
   * @param {Integer} numero, número de cpe
   */
  constructor(tipoCpe=null, serie=null, numero=null) {
    this._tipoCpe = tipoCpe;
    this._serie = serie;
    this._numero = numero;
  }

  // Getters
    get tipoCpe() {
      return this._tipoCpe;
    }
    get serie() {
      return this._serie;
    }
    get numero() {
      return this._numero;
    }
  // Setters
    set tipoCpe(tipoCpe) {
      this._tipoCpe = tipoCpe;
    }
    set serie(serie) {
      this._serie = serie;
    }
    set numero(numero) {
      this._numero = numero;
    }
}

module.exports = Comprobante;
