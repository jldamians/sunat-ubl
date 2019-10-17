"use strict";

const {
  TipoDocumento,
} = require('sunat-catalogs');

const CPERegimen = require('./CPERegimen');

class CPERetencion extends CPERegimen {
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
    super(TipoDocumento.CPER, tipoRegimen, serie, numero, fechaEmision, horaEmision);

    this._imptTotalRetenido = null;
    this._imptTotalPagado = null;
  }

  // Getters
    get imptTotalRetenido() {
      return this._imptTotalRetenido;
    }
    get imptTotalPagado() {
      return this._imptTotalPagado;
    }

  // Methods
    defImptRetenidoTot(importe=null) {
      this._imptTotalRetenido = importe;
    }

    defImptPagadoTot(importe=null) {
      this._imptTotalPagado = importe;
    }
}

module.exports = CPERetencion;
