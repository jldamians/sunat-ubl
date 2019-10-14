"use strict";

class Concepto {
  constructor(codConcepto=null, valor=null, nombre=null) {
    this._codConcepto = codConcepto;
    this._valor = valor;
    this._nombre = nombre;
  }

  // Getters
    get codConcepto() {
      return this._codConcepto;
    }

    get valor() {
      return this._valor;
    }

    get nombre() {
      return this._nombre;
    }
}

module.exports = Concepto;
