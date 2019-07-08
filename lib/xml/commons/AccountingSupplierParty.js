"use strict";

const constants = require('../../constants');

const Party = require('./Party'),
      Element = require('./Element');

const COUNTRY_CODES = constants.countryCodes;

class AccountingSupplierParty extends Element {
  /**
   * @constructor
   * @param {String} tipoDocEmisor, tipo de documento de identidad del emisor
   * @param {String} numDocEmisor, número de documento de identidad del emisor
   * @param {String} nombreComercialEmisor, nombre comercial del emisor
   * @param {String} nombreEmisor, denominación o razón social del emisor
   * @param {String} codUbigeoOrigen, código de ubigeo del origen
   * @param {String} departamentoOrigen, departamento
   * @param {String} provinciaOrigen, provincia
   * @param {String} distritoOrigen, distrito
   * @param {String} codLocalOrigen, código de local del origen
   * @param {String} urbanizacionOrigen, urbanización
   * @param {String} direccionOrigen, dirección de origen
   * @param {String} codPaisOrigen, código del país de origen
   */

  constructor(
    tipoDocEmisor,
    numDocEmisor,
    nombreComercialEmisor,
    nombreEmisor,
    codUbigeoOrigen,
    departamentoOrigen,
    provinciaOrigen,
    distritoOrigen,
    codLocalOrigen,
    urbanizacionOrigen,
    direccionOrigen,
    codPaisOrigen
  ) {
    super();

    this._tipoDocEmisor = tipoDocEmisor;
    this._numDocEmisor = numDocEmisor;
    this._nombreComercialEmisor = nombreComercialEmisor;
    this._nombreEmisor = nombreEmisor;
    this._codUbigeoOrigen = codUbigeoOrigen;
    this._departamentoOrigen = departamentoOrigen;
    this._provinciaOrigen = provinciaOrigen;
    this._distritoOrigen = distritoOrigen;
    this._codLocalOrigen = codLocalOrigen;
    this._urbanizacionOrigen = urbanizacionOrigen;
    this._direccionOrigen = direccionOrigen;
    this._codPaisOrigen = codPaisOrigen;
  }

  toXMLElement() {
    const AccountingSupplierParty = super.create(`${super.prefix.cac}:AccountingSupplierParty`);

    const newParty = new Party(
      this._tipoDocEmisor,
      this._numDocEmisor,
      this._nombreComercialEmisor,
      this._nombreEmisor,
      this._codUbigeoOrigen,
      this._departamentoOrigen,
      this._provinciaOrigen,
      this._distritoOrigen,
      this._codLocalOrigen || '0000',
      this._urbanizacionOrigen,
      this._direccionOrigen,
      this._codPaisOrigen || COUNTRY_CODES.PERU
    );

    return AccountingSupplierParty.importDocument(newParty.toXMLElement());
  }
}

module.exports = AccountingSupplierParty;
