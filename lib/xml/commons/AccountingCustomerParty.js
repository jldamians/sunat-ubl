"use strict";

const Party = require('./Party'),
      Element = require('./Element');

class AccountingCustomerParty extends Element {
  /**
   * @constructor
   * @param {Persona} cliente, información del cliente
   */
  constructor(cliente) {
    super();

    this._cliente = cliente;
  }

  toXMLElement() {
    const AccountingCustomerParty = super.create(`${super.prefix.cac}:AccountingCustomerParty`);

    const newParty = new Party(this._cliente);

    return AccountingCustomerParty.importDocument(newParty.toXMLElement());
  }
}

module.exports = AccountingCustomerParty;
