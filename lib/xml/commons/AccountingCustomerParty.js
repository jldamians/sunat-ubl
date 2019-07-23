"use strict";

const Party = require('./Party'),
      Element = require('./Element');

class AccountingCustomerParty extends Element {
  /**
   * @constructor
   * @param {String} tipoDocReceptor, tipo de documento de identidad del receptor
   * @param {String} numDocReceptor, número de documento de identidad del receptor
   * @param {String} nombreReceptor, denominación o razón social del receptor
   * @param {String} nombreComercialReceptor, nombre comercial del receptor
   * @param {String} codUbigeoDestino, código de ubigeo del destino
   * @param {String} departamentoDestino, departamento destino
   * @param {String} provinciaDestino, provincia destino
   * @param {String} distritoDestino, distrito destino
   * @param {String} codLocalDestino, código de local del destino
   * @param {String} urbanizacionDestino, urbanización destino
   * @param {String} direccionDestino, dirección de destino
   * @param {String} codPaisDestino, código del país de destino
   */
  constructor(
    tipoDocReceptor,
    numDocReceptor,
    nombreReceptor,
    codUbigeoDestino,
    departamentoDestino,
    provinciaDestino,
    distritoDestino,
    urbanizacionDestino,
    direccionDestino,
    codPaisDestino
  ) {
    super();

    this._tipoDocReceptor = tipoDocReceptor;
    this._numDocReceptor = numDocReceptor;
    this._nombreReceptor = nombreReceptor;
    this._codUbigeoDestino = codUbigeoDestino;
    this._departamentoDestino = departamentoDestino;
    this._provinciaDestino = provinciaDestino;
    this._distritoDestino = distritoDestino;
    this._urbanizacionDestino = urbanizacionDestino;
    this._direccionDestino = direccionDestino;
    this._codPaisDestino = codPaisDestino;
  }

  toXMLElement() {
    const AccountingCustomerParty = super.create(`${super.prefix.cac}:AccountingCustomerParty`);

    const newParty = new Party(
      this._tipoDocReceptor,
      this._numDocReceptor,
      this._nombreReceptor,
      null,
      this._codUbigeoDestino,
      this._departamentoDestino,
      this._provinciaDestino,
      this._distritoDestino,
      null,
      this._urbanizacionDestino,
      this._direccionDestino,
      this._codPaisDestino
    );

    return AccountingCustomerParty.importDocument(newParty.toXMLElement());
  }
}

module.exports = AccountingCustomerParty;
