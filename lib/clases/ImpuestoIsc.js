"use strict";

const { TipoTributo, TipoSistemaIsc } = require('sunat-catalogs');

const Impuesto = require('./Impuesto');

class ImpuestoLineaIsc extends Impuesto {
  /**
   * @constructor
   * @param {String} codAfectacion, código de sistema de cálculo del isc
   * @param {Double} imptBase, importe base para el cálculo del impuesto
   * @param {Double} tasa, tasa del impuesto
   * @param {Double} imptImpuesto, importe del impuesto
   * @param {String} codMoneda, código de moneda
   */
  constructor(
    codAfectacion=null,
    imptBase=null,
    tasa=null,
    imptImpuesto=null,
    codMoneda=null
  ) {
    let isc;

    try {
      isc = new TipoSistemaIsc(codAfectacion);
    } catch (error) {
      // Capturamos el error lanzado si el tipo de sistema de cálculo es incorrecto
      throw error;
    }

    super(TipoTributo.ISC, imptBase, imptImpuesto, codMoneda);

    this._tasa = tasa;
    this._codAfectacion = isc.codigoCat;
  }

  // Getters
    get tasa() {
      return this._tasa;
    }
    get codAfectacion() {
      return this._codAfectacion;
    }
}

module.exports = ImpuestoLineaIsc;
