"use strict";

const { TipoAfectacionIgv } = require('sunat-catalogs');

const Impuesto = require('./Impuesto');

class ImpuestoLineaIgv extends Impuesto {
  /**
   * @constructor
   * @param {String} codAfectacionIgv, código de afectación del igv
   * @param {Double} imptBase, importe base para el cálculo del impuesto
   * @param {Double} tasa, tasa del impuesto
   * @param {Double} imptImpuesto, importe del impuesto
   * @param {Boolean} onerosa, indicador de operación gratuita
   * @param {String} codMoneda, código de moneda
   */
  constructor(
    codAfectacionIgv=null,
    imptBase=null,
    tasa=null,
    imptImpuesto=null,
    onerosa=null,
    codMoneda=null
  ) {
    let igv;

    try {
      igv = new TipoAfectacionIgv(codAfectacionIgv);
    } catch (error) {
      // Capturamos el error lanzado si el tipo de afectación del igv es incorrecto
      throw error;
    }

    super(igv.codTributo(onerosa), imptBase, imptImpuesto, codMoneda);

    this._tasa = tasa;
    this._codAfectacionIgv = igv.codigoCat;
    this._onerosa = onerosa;
  }

  // Getters
    get tasa() {
      return this._tasa;
    }
    get codAfectacionIgv() {
      return this._codAfectacionIgv;
    }
    get onerosa() {
      return this._onerosa;
    }
}

module.exports = ImpuestoLineaIgv;
