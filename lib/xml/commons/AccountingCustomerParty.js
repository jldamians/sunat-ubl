"use strict";

const pick = require('lodash.pick');

const constants = require('../../constants');

const PartyGenericTag = require('./PartyGenericTag'),
      Element = require('../Element');

const XMLNS = constants.xmlns;

class AccountingCustomerParty extends Element {
  /**
   * @constructor
   * @param {Receptor} receptor, información del receptor del cpe
   * @param {Object} prefix, prefijos de los namespace
   * @param {String} ublVersion, versión ubl
   */
  constructor(receptor, prefix, ublVersion) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}AccountingCustomerParty`;

    super(xmlName, prefix, ublVersion);

    this._receptor = receptor;
  }

  /**
   * @method
   * Agregar información del receptor
   */
  _setCustomerParty() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new PartyGenericTag(this._receptor, prefix, null, super.ublVersion);

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
