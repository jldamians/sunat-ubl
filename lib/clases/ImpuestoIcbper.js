"use strict";

const { TipoTributo } = require('sunat-catalogs');

const Impuesto = require('./Impuesto');

class ImpuestoLineaIsc extends Impuesto {
  /**
   * @constructor
   * @param {Double} imptBase, importe base para el cálculo del impuesto
   * @param {Double} tasa, tasa del impuesto
   * @param {Double} imptImpuesto, importe del impuesto
   * @param {String} codMoneda, código de moneda
   */
  constructor(
    imptBase=null,
    tasa=null,
    imptImpuesto=null,
    codMoneda=null
  ) {
    super(TipoTributo.ICBPER, imptBase, imptImpuesto, codMoneda);

    this._tasa = tasa;
  }

  // Getters
    get tasa() {
      return this._tasa;
    }
}

module.exports = ImpuestoLineaIsc;
