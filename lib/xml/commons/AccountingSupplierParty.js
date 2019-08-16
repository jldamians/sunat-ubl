"use strict";

const pick = require('lodash.pick');

const constants = require('../../constants');

const Party = require('./Party'),
      Element = require('../Element');

const XMLNS = constants.xmlns;

class AccountingSupplierParty extends Element {
  /**
   * @constructor
   * @param {Persona} proveedor, información del proveedor
   */
  constructor(proveedor, prefix) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}AccountingSupplierParty`;

    super(xmlName, prefix);

    this._proveedor = proveedor;
  }

  _setSupplierParty() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new Party(this._proveedor, prefix);

    super.xml.importDocument(tag.toXMLElement());
  }

  toXMLElement() {
    super.create();

    this._setSupplierParty();

    return super.xml;
  }
}

module.exports = AccountingSupplierParty;
