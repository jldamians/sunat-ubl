"use strict";

const constants = require('../../constants');

const Party = require('./Party'),
      Element = require('../Element');

const XMLNS = constants.xmlns;

class AccountingSupplierParty extends Element {
  /**
   * @constructor
   * @param {Persona} proveedor, información del proveedor
   */
  constructor(proveedor) {
    super();

    this._proveedor = proveedor;
  }

  toXMLElement() {
    const AccountingSupplierParty = super.create(`${XMLNS.getPrefix(super.prefix.cac)}AccountingSupplierParty`);

    const newParty = new Party(this._proveedor);

    return AccountingSupplierParty.importDocument(newParty.toXMLElement());
  }
}

module.exports = AccountingSupplierParty;
