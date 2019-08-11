"use strict";

class ConceptoTributario {
  constructor(codigo, valor) {
    this._codigo = codigo;
    this._valor = valor;
  }

  get codigo() {
    return this._codigo;
  }

  get valor() {
    return this._valor;
  }
}

module.exports = ConceptoTributario;
