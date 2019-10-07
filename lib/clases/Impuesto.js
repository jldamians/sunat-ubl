"use strict";

const { TipoTributo } = require('sunat-catalogs');

class Impuesto {
  /**
   * @constructor
   * @param {String} codImpuesto, código del tipo de impuesto
   * @param {Number} imptBase, importe base para el cálculo del impuesto
   * @param {Number} imptImpuesto, importe del impuesto
   * @param {String} codMoneda, código de moneda
   */
  constructor(codImpuesto=null, imptBase=null, imptImpuesto=null, codMoneda=null) {
    const tributo = new TipoTributo(codImpuesto);

    this._codImpuesto = codImpuesto;
    this._imptBase = imptBase;
    this._imptImpuesto = imptImpuesto;
    this._codMoneda = codMoneda;

    this._nombre = tributo.nombre();
    this._codInternacional = tributo.codigo();
    this._categoria = tributo.categoria();
  }

  // Getters
    get codImpuesto() {
      return this._codImpuesto;
    }
    get imptBase() {
      return this._imptBase;
    }
    get imptImpuesto() {
      return this._imptImpuesto;
    }
    get codMoneda() {
      return this._codMoneda;
    }
    get nombre() {
      return this._nombre;
    }
    get codInternacional() {
      return this._codInternacional;
    }
    get categoria() {
      return this._categoria;
    }
}

module.exports = Impuesto;
