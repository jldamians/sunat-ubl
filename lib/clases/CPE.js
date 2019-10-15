"use strict";

const {
  TipoDocumentoIdentidad,
} = require('sunat-catalogs');

const Emisor = require('./Emisor'),
      Comprobante = require('./Comprobante');

class CPE extends Comprobante{
  constructor(
    tipoCpe=null,
    serie=null,
    numero=null,
    fechaEmision=null,
    horaEmision = null
  ) {
    super(tipoCpe, serie, numero);

    this._fechaEmision = fechaEmision;
    this._horaEmision = horaEmision;
    this._emisor = null;
    this._receptor = null;
    this._detalle = [];
    this._leyendas = [];
  }

  // Getters
    get fechaEmision() {
      return this._fechaEmision;
    }
    get horaEmision() {
      return this._horaEmision;
    }
    get emisor() {
      return this._emisor;
    }
    get receptor() {
      return this._receptor;
    }
    get detalle() {
      return this._detalle;
    }
    get leyendas() {
      return this._leyendas;
    }
    get codMoneda() {
      return this._codMoneda;
    }

  // Methods
    /**
     * Definir la información del emisor
     * @param {String} tipoDocumento, tipo de documento de identidad del emisor
     * @param {String} numeroDocumento, número de documento de identidad del emisor
     * @param {String} razonSocial, razón social del emisor
     * @param {String} nombreComercial, nombre comercial del emisor
     */
    defEmisor(tipoDocumento=null, numeroDocumento=null, razonSocial=null, nombreComercial=null) {
      let identidad;

      try {
        identidad = new TipoDocumentoIdentidad(tipoDocumento);
      } catch (error) {
        // Capturamos el error lanzando si el tipo de documento de identidad es incorrecto
        throw error;
      }

      this._emisor = new Emisor(identidad.codigoCat, numeroDocumento, razonSocial, nombreComercial);
    }
}

module.exports = CPE;
