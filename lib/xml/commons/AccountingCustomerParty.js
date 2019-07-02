"use strict";

const Element = require('./Element');

const Party = require('./Party');

class AccountingCustomerParty extends Element {
  /**
   * @constructor
   * @param  {String} tipoDocReceptor, tipo de documento de identidad del receptor
   * @param  {String} numDocReceptor, número de documento de identidad del receptor
   * @param  {String} nombreReceptor, nombre del receptor
   */
  constructor(tipoDocReceptor, numDocReceptor, nombreReceptor) {
    super();

    this._tipoDocReceptor = tipoDocReceptor;
    this._numDocReceptor = numDocReceptor;
    this._nombreReceptor = nombreReceptor;
  }

  toXMLElement() {
    const AccountingCustomerParty = super.create(`${super.prefix.cac}:AccountingCustomerParty`);

    const newParty = new Party(
      this._tipoDocReceptor,
      this._numDocReceptor,
      this._nombreReceptor
    );


    return AccountingCustomerParty.importDocument(newParty.toXMLElement());
  }
}

module.exports = AccountingCustomerParty;
