"use strict";

class Persona {
  /**
   * @constructor
   * @param {String} tipoDocumento, tipo de documento de identidad
   * @param {String} numeroDocumento, número de documento de identidad
   * @param {String} razonSocial, denominación o razón social
   * @param {String} nombreComercial, nombre comercial
   * @param {Direccion} direccion, dirección fiscal
   */
  constructor(
    tipoDocumento=null,
    numeroDocumento=null,
    razonSocial=null,
    nombreComercial=null,
    direccion=null
  ) {
    this._tipoDocumento = tipoDocumento;
    this._numeroDocumento = numeroDocumento;
    this._razonSocial = razonSocial;
    this._nombreComercial = nombreComercial;
    this._direccion = direccion;
  }

  set razonSocial(razonSocial) {
    this._razonSocial = razonSocial;
  }
  get razonSocial() {
    return this._razonSocial;
  }

  set nombreComercial(nombreComercial) {
    this._nombreComercial = nombreComercial;
  }
  get nombreComercial() {
    return this._nombreComercial;
  }

  set tipoDocumento(tipoDocumento) {
    this._tipoDocumento = tipoDocumento;
  }
  get tipoDocumento() {
    return this._tipoDocumento;
  }

  set numeroDocumento(numeroDocumento) {
    this._numeroDocumento = numeroDocumento;
  }
  get numeroDocumento() {
    return this._numeroDocumento;
  }

  set direccion(direccion) {
    this._direccion = direccion;
  }
  get direccion() {
    return this._direccion;
  }
}

module.exports = Persona;
