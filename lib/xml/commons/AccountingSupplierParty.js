"use strict";

const pick = require('lodash.pick');

const constants = require('../../constants');

const PartyGenericTag = require('./PartyGenericTag'),
      Element = require('../Element');

const XMLNS = constants.xmlns;

class AccountingSupplierParty extends Element {
  /**
   * @constructor
   * @param {Emisor} emisor, información del emisor del cpe
   * @param {Object} prefix, prefijos de los namespace
   * @param {String} ublVersion, versión ubl
   */
  constructor(emisor, prefix, ublVersion) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}AccountingSupplierParty`;

    super(xmlName, prefix, ublVersion);

    this._emisor = emisor;
  }

  /**
   * @method
   * Agregar información del emisor
   */
  _setSupplierParty() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new PartyGenericTag(this._emisor, prefix, null, super.ublVersion);

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
