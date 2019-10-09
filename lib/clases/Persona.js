"use strict";

const Direccion = require('./Direccion');

class Persona {
  /**
   * @constructor
   * @param {String} tipoDocumento, tipo de documento de identidad
   * @param {String} numeroDocumento, número de documento de identidad
   * @param {String} razonSocial, denominación o razón social
   * @param {String} nombreComercial, nombre comercial
   */
  constructor(
    tipoDocumento=null,
    numeroDocumento=null,
    razonSocial=null,
    nombreComercial=null
  ) {
    this._tipoDocumento = tipoDocumento;
    this._numeroDocumento = numeroDocumento;
    this._razonSocial = razonSocial;
    this._nombreComercial = nombreComercial;
    this._direccion = null;
  }

  // Getters
    get razonSocial() {
      return this._razonSocial;
    }
    get nombreComercial() {
      return this._nombreComercial;
    }
    get tipoDocumento() {
      return this._tipoDocumento;
    }
    get numeroDocumento() {
      return this._numeroDocumento;
    }
    get direccion() {
      return this._direccion;
    }

  // Methods
    /**
     * Definir la dirección
     * @param {String} codUbigeo, código de ubigeo
     * @param {String} codLocal, código de establecimiento anexo
     * @param {String} codPais, código de país
     * @param {String} direccion, dirección completa y detallada
     * @param {String} urbanizacion, urbanización
     */
    defDireccion(codUbigeo=null, codLocal=null, codPais=null, direccion=null, urbanizacion=null) {
      this._direccion = new Direccion(codUbigeo, codLocal, codPais, direccion, urbanizacion);
    }
}

module.exports = Persona;
