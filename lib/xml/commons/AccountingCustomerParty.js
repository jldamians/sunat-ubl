"use strict";

const constants = require('../../constants');

const Party = require('./Party'),
      Element = require('../Element');

const XMLNS = constants.xmlns;

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
    const AccountingCustomerParty = super.create(`${XMLNS.getPrefix(super.prefix.cac)}AccountingCustomerParty`);

    const newParty = new Party(this._cliente);

    return AccountingCustomerParty.importDocument(newParty.toXMLElement());
  }
}

module.exports = AccountingCustomerParty;
