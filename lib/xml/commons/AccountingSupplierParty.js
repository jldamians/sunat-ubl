"use strict";

const Party = require('./Party'),
      Element = require('./Element');

class AccountingSupplierParty extends Element {
  /**
   * @constructor
   * @param {String} tipoDocEmisor, tipo de documento de identidad del emisor
   * @param {String} numDocEmisor, número de documento de identidad del emisor
   * @param {String} nombreEmisor, denominación o razón social del emisor
   * @param {String} nombreComercialEmisor, nombre comercial del emisor
   * @param {String} codUbigeoOrigen, código de ubigeo del origen
   * @param {String} departamentoOrigen, departamento origen
   * @param {String} provinciaOrigen, provincia origen
   * @param {String} distritoOrigen, distrito origen
   * @param {String} codLocalOrigen, código de local del origen
   * @param {String} urbanizacionOrigen, urbanización origen
   * @param {String} direccionOrigen, dirección de origen
   * @param {String} codPaisOrigen, código del país de origen
   */

  constructor(
    tipoDocEmisor,
    numDocEmisor,
    nombreEmisor,
    nombreComercialEmisor,
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
    this._nombreEmisor = nombreEmisor;
    this._nombreComercialEmisor = nombreComercialEmisor;
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
      this._nombreEmisor,
      this._nombreComercialEmisor,
      this._codUbigeoOrigen,
      this._departamentoOrigen,
      this._provinciaOrigen,
      this._distritoOrigen,
      this._codLocalOrigen,
      this._urbanizacionOrigen,
      this._direccionOrigen,
      this._codPaisOrigen
    );

    return AccountingSupplierParty.importDocument(newParty.toXMLElement());
  }
}

module.exports = AccountingSupplierParty;
