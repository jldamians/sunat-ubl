"use strict";

const {
  TipoDocumento,
  TipoDocumentoIdentidad,
} = require('sunat-catalogs');

const Emisor = require('./Emisor'),
      Comprobante = require('./Comprobante');

const DetalleFactura = require('./DetalleFactura'),
      DetalleRetencion = require('./DetalleRetencion'),
      DetallePercepcion = require('./DetallePercepcion'),
      DetalleNotaDebito = require('./DetalleNotaDebito'),
      DetalleNotaCredito = require('./DetalleNotaCredito');

class CPE extends Comprobante {
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

    agrDetalle(detalle) {
      let correcto;

      const cpe = new TipoDocumento(this.tipoCpe);

      correcto = true;

      if (this.tipoCpe === TipoDocumento.FA) {
        if (detalle instanceof DetalleFactura === false) {
          correcto = false;
        }
      } else if (this.tipoCpe === TipoDocumento.NC) {
        if (detalle instanceof DetalleNotaCredito === false) {
          correcto = false;
        }
      } else if (this.tipoCpe === TipoDocumento.ND) {
        if (detalle instanceof DetalleNotaDebito === false) {
          correcto = false;
        }
      } else if (this.tipoCpe === TipoDocumento.CPEP) {
        if (detalle instanceof DetallePercepcion === false) {
          correcto = false;
        }
      } else if (this.tipoCpe === TipoDocumento.CPER) {
        if (detalle instanceof DetalleRetencion === false) {
          correcto = false;
        }
      }

      if (correcto === true) {
        this._detalle.push(detalle);
      } else {
        throw new Error(`El detalle NO corresponde al CPE ${cpe.codigoCat} - ${cpe.descripcion()}`);
      }
    }
}

module.exports = CPE;
