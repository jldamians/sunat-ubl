"use strict";

const { TipoAfectacionIgv } = require('sunat-catalogs');

const Impuesto = require('./Impuesto');

class ImpuestoLineaIgv extends Impuesto {
  /**
   * @constructor
   * @param {String} codAfectacion, código de afectación del igv
   * @param {Double} imptBase, importe base para el cálculo del impuesto
   * @param {Double} tasa, tasa del impuesto
   * @param {Double} imptImpuesto, importe del impuesto
   * @param {Boolean} onerosa, indicador de operación gratuita
   * @param {String} codMoneda, código de moneda
   */
  constructor(
    codAfectacion=null,
    imptBase=null,
    tasa=null,
    imptImpuesto=null,
    onerosa=null,
    codMoneda=null
  ) {
    let igv;

    try {
      igv = new TipoAfectacionIgv(codAfectacion);
    } catch (error) {
      //throw new Error(`El código de afectación del igv "${codAfectacion}" no existe`);
      throw error;
    }

    super(igv.codTributo(onerosa), imptBase, imptImpuesto, codMoneda);

    this._tasa = tasa;
    this._codAfectacion = igv.codigoCat;
    this._onerosa = onerosa;
  }

  // Getters
    get tasa() {
      return this._tasa;
    }
    get codAfectacion() {
      return this._codAfectacion;
    }
    get onerosa() {
      return this._onerosa;
    }

  // Setters
    set tasa(tasa) {
      this._tasa = tasa;
    }
    set codAfectacion(codAfectacion) {
      this._codAfectacion = codAfectacion;
    }
    set onerosa(onerosa) {
      this._onerosa = onerosa;
    }
}

module.exports = ImpuestoLineaIgv;
