"use strict";

const pick = require('lodash.pick');

const constants = require('../../constants');

const Party = require('./Party'),
      Element = require('../Element');

const XMLNS = constants.xmlns;

class AccountingCustomerParty extends Element {
  /**
   * @constructor
   * @param {Persona} cliente, información del cliente
   */
  constructor(cliente, prefix) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}AccountingCustomerParty`;

    super(xmlName, prefix);

    this._cliente = cliente;
  }

  _setCustomerParty() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new Party(this._cliente, prefix);

    super.xml.importDocument(tag.toXMLElement());
  }

  toXMLElement() {
    super.create();

    this._setCustomerParty();

    return super.xml;
  }
}

module.exports = AccountingCustomerParty;
