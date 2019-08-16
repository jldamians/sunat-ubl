"use strict";

const pick = require('lodash.pick');

const constants = require('../../constants');

const Party = require('./Party'),
      Element = require('../Element');

const XMLNS = constants.xmlns;

class AccountingCustomerParty extends Element {
  /**
   * @constructor
   * @param {Receptor} receptor, información del receptor del cpe
   * @param {Object} prefix, prefijos de los namespace
   */
  constructor(receptor, prefix) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}AccountingCustomerParty`;

    super(xmlName, prefix);

    this._receptor = receptor;
  }

  /**
   * @method
   * Agregar información del receptor
   */
  _setCustomerParty() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new Party(this._receptor, prefix);

    super.xml.importDocument(tag.toXMLElement());
  }

  /**
   * @function
   * Obtener el elemento xml
   * @return {xmlbuilder}
   */
  toXMLElement() {
    super.create();

    this._setCustomerParty();

    return super.xml;
  }
}

module.exports = AccountingCustomerParty;
