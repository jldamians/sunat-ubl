"use strict";

const { TipoTributo, TipoSistemaIsc } = require('sunat-catalogs');

const Impuesto = require('./Impuesto');

class ImpuestoLineaIsc extends Impuesto {
  /**
   * @constructor
   * @param {String} codAfectacionIsc, código de sistema de cálculo del isc
   * @param {Double} imptBase, importe base para el cálculo del impuesto
   * @param {Double} tasa, tasa del impuesto
   * @param {Double} imptImpuesto, importe del impuesto
   * @param {String} codMoneda, código de moneda
   */
  constructor(
    codAfectacionIsc=null,
    imptBase=null,
    tasa=null,
    imptImpuesto=null,
    codMoneda=null
  ) {
    let isc;

    try {
      isc = new TipoSistemaIsc(codAfectacionIsc);
    } catch (error) {
      // Capturamos el error lanzado si el tipo de sistema de cálculo es incorrecto
      throw error;
    }

    super(TipoTributo.ISC, imptBase, imptImpuesto, codMoneda);

    this._tasa = tasa;
    this._codAfectacionIsc = isc.codigoCat;
  }

  // Getters
    get tasa() {
      return this._tasa;
    }
    get codAfectacionIsc() {
      return this._codAfectacionIsc;
    }
}

module.exports = ImpuestoLineaIsc;
