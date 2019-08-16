"use strict";

const pick = require('lodash.pick');

const constants = require('../../constants');

const Party = require('./Party'),
      Element = require('../Element');

const XMLNS = constants.xmlns;

class AccountingSupplierParty extends Element {
  /**
   * @constructor
   * @param {Emisor} emisor, información del emisor del cpe
   * @param {Object} prefix, prefijos de los namespace
   */
  constructor(emisor, prefix) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}AccountingSupplierParty`;

    super(xmlName, prefix);

    this._emisor = emisor;
  }

  /**
   * @method
   * Agregar información del emisor
   */
  _setSupplierParty() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new Party(this._emisor, prefix);

    super.xml.importDocument(tag.toXMLElement());
  }

  /**
   * @function
   * Obtener el elemento xml
   * @return {xmlbuilder}
   */
  toXMLElement() {
    super.create();

    this._setSupplierParty();

    return super.xml;
  }
}

module.exports = AccountingSupplierParty;
