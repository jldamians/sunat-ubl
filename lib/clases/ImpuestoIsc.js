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
      //throw new Error(`El código de sistema de cálcula del igs "${codAfectacion}" no existe`);
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

  // Setters
    set tasa(tasa) {
      this._tasa = tasa;
    }
    set codAfectacion(codAfectacion) {
      this._codAfectacion = codAfectacion;
    }
}

module.exports = ImpuestoLineaIsc;
