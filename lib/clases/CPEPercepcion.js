"use strict";

const {
  TipoDocumento,
} = require('sunat-catalogs');

const CPERegimen = require('./CPERegimen');

class CPEPercepcion extends CPERegimen {
  /**
   * @constructor
   * @param {String} serie, serie del cpe
   * @param {Number} numero, número del cpe
   * @param {String} fechaEmision, fecha de emisión del cpe
   * @param {String} horaEmision, hora de emisión del cpe
   */
  constructor(
    tipoRegimen=null,
    serie=null,
    numero=null,
    fechaEmision=null,
    horaEmision=null
  ) {
    super(TipoDocumento.CPEP, tipoRegimen, serie, numero, fechaEmision, horaEmision);

    this._imptTotalPercibido = null;
    this._imptTotalCobrado = null;
  }

  // Getters
    get imptTotalPercibido() {
      return this._imptTotalPercibido;
    }
    get imptTotalCobrado() {
      return this._imptTotalCobrado;
    }

  // Methods
    defImptPercibidoTot(importe=null) {
      this._imptTotalPercibido = importe;
    }

    defImptCobradoTot(importe=null) {
      this._imptTotalCobrado = importe;
    }
}

module.exports = CPEPercepcion;
