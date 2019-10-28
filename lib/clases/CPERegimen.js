"use strict";

const {
  Ubigeos,
  TipoMoneda,
  TipoDocumentoIdentidad,
} = require('sunat-catalogs');

const CPE = require('./CPE'),
      Persona = require('./Persona');

class CPERegimen extends CPE {
  constructor(
    tipoCpe=null,
    tipoRegimen=null,
    serie=null,
    numero=null,
    fechaEmision=null,
    horaEmision=null
  ) {
    super(tipoCpe, serie, numero, fechaEmision, horaEmision);

    this._tipoRegimen = tipoRegimen;
    this._tasaRegimen = null;
    this._observacion = null;
    this._imptRedondeo = null;
    this._codMoneda = TipoMoneda.SOL;
  }

  // Getters
    get tipoRegimen() {
      return this._tipoRegimen;
    }
    get tasaRegimen() {
      return this._tasaRegimen;
    }
    get observacion() {
      return this._observacion;
    }
    get imptRedondeo() {
      return this._imptRedondeo;
    }
    get codMoneda() {
      return this._codMoneda;
    }

  // Methods
    defTasaRegimen(tasa) {
      this._tasaRegimen = tasa;
    }

    defObservacion(observacion) {
      this._observacion = observacion;
    }

    /**
     * Definir el monto de redondeo
     * @param {Number} importe, monto de redondeo del importe total
     */
    defImptRedondeo(importe=null) {
      this._imptRedondeo = importe;
    }

    /**
     * Definir la dirección del emisor
     * @param {String} codUbigeo, código de ubigeo
     * @param {String} codPais, código de país
     * @param {String} direccion, dirección fiscal
     * @param {String} urbanizacion, urbanización
     */
    defDireccionEms(codUbigeo=null, codPais=null, direccion=null, urbanizacion=null) {
      let ubigeo;

      try {
        ubigeo = new Ubigeos(codUbigeo);
      } catch (error) {
        // Capturamos el error lanzando si el ubigeo es incorrecto
        throw error;
      }

      if (this._emisor === null) {
        throw new Error('No se ha definido la información del emisor');
      }

      this._emisor.defDireccion(ubigeo.codigoCat, null, codPais, direccion, urbanizacion);
    }

    /**
     * Definir la información del proveedor
     * @param {String} tipoDocumento, tipo de documento de identidad del proveedor
     * @param {String} numeroDocumento, número de documento de identidad del proveedor
     * @param {String} razonSocial, razón social del proveedor
     * @param {String} nombreComercial, nombre comercial del proveedor
     */
    defReceptor(tipoDocumento=null, numeroDocumento=null, razonSocial=null, nombreComercial=null) {
      let identidad;

      try {
        identidad = new TipoDocumentoIdentidad(tipoDocumento);
      } catch (error) {
        // Capturamos el error lanzando si el tipo de documento de identidad es incorrecto
        throw error;
      }

      this._receptor = new Persona(identidad.codigoCat, numeroDocumento, razonSocial, nombreComercial);
    }

    /**
     * Definir la dirección del proveedor
     * @param {String} codUbigeo, código de ubigeo
     * @param {String} codPais, codigo de país
     * @param {String} direccion, dirección fiscal
     * @param {String} urbanizacion, urbanización
     */
    defDireccionRec(codUbigeo=null, codPais=null, direccion=null, urbanizacion=null) {
      let ubigeo;

      try {
        ubigeo = new Ubigeos(codUbigeo);
      } catch (error) {
        // Capturamos el error lanzando si el ubigeo es incorrecto
        throw error;
      }

      if (this._receptor === null) {
        throw new Error('No se ha definido la información del proveedor');
      }

      this._receptor.defDireccion(ubigeo.codigoCat, null, codPais, direccion, urbanizacion);
    }
}

module.exports = CPERegimen;
