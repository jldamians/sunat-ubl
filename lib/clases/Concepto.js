"use strict";

const { ConceptoTributario } = require('sunat-catalogs');

class Concepto {
  constructor(codigo=null, valor=null) {
    let concepto;

    try {
      concepto = new ConceptoTributario(codigo);
    } catch(error) {
      throw error;
    }

    this._codigo = codigo;
    this._valor = valor;
    this._nombre = concepto.descripcion();
  }

  // Getters
    get codigo() {
      return this._codigo;
    }

    get valor() {
      return this._valor;
    }

    get nombre() {
      return this._nombre;
    }
}

module.exports = Concepto;
