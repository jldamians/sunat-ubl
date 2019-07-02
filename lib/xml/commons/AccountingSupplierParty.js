"use strict";

const Element = require('./Element');

const Party = require('./Party');

class AccountingSupplierParty extends Element {
  /**
   * @constructor
   * @param  {String} tipoDocEmisor, tipo de documento de identidad del emisor
   * @param  {String} numDocEmisor, número de documento de identidad del emisor
   * @param  {String} nombreEmisor, nombre del emisor
   * @param  {String} codUbigeoOrigen, código de ubigeo del origen
   * @param  {String} codLocalOrigen, código de local del origen
   * @param  {String} direccionOrigen, dirección de origen
   */
  constructor(tipoDocEmisor, numDocEmisor, nombreEmisor, codUbigeoOrigen, codLocalOrigen, direccionOrigen) {
    super();

    this._tipoDocEmisor = tipoDocEmisor;
    this._numDocEmisor = numDocEmisor;
    this._nombreEmisor = nombreEmisor;
    this._codUbigeoOrigen = codUbigeoOrigen;
    this._codLocalOrigen = codLocalOrigen;
    this._direccionOrigen = direccionOrigen;
  }

  toXMLElement() {
    const AccountingSupplierParty = super.create(`${super.prefix.cac}:AccountingSupplierParty`);

    const newParty = new Party(
      this._tipoDocEmisor,
      this._numDocEmisor,
      this._nombreEmisor,
      this._codUbigeoOrigen,
      this._codLocalOrigen,
      this._direccionOrigen
    );

    return AccountingSupplierParty.importDocument(newParty.toXMLElement());
  }
}

module.exports = AccountingSupplierParty;
