"use strict";

const pick = require('lodash.pick');

const poo = require('../../clases'),
      constants = require('../../constants');

const Element = require('../Element'),
      PartyLegalEntity = require('./PartyLegalEntity'),
      PartyIdentification = require('./PartyIdentification');

const XMLNS = constants.xmlns;

class Party extends Element {
  /**
   * @constructor
   * @param {Emisor | Receptor} contribuyente, información del contribuyente
   * @param {Object} prefix, prefijos de los namespace
   */
  constructor(contribuyente, prefix) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}Party`;

    super(xmlName, prefix);

    this._contribuyente = contribuyente;
  }

  /**
   * @method
   * Agregar tipo y número de documento del contribuyente
   */
  _setPartyIdentificationTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new PartyIdentification(this._contribuyente, prefix);

    super.xml.importDocument(tag.toXMLElement());
  }

  /**
   * @method
   * Agregar nombre comercial del contribuyente
   */
  _setPartyNameTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}PartyName`);

    tag.create();

    tag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Name`)
        .txt(this._contribuyente.nombreComercial);

    super.xml.importDocument(tag.xml);
  }

  /**
   * @method
   * Agregar razón social y dirección del contribuyente
   */
  _setPartyLegalEntityTag() {
    const prefix = {
      cac: super.prefix.cac,
      cbc: super.prefix.cbc,
    };

    const tag = new PartyLegalEntity(this._contribuyente, prefix);

    super.xml.importDocument(tag.toXMLElement());
  }

  /**
   * @function
   * Obtener el elemento xml
   * @return {xmlbuilder}
   */
  toXMLElement() {
    const hasTradename = (
      this._contribuyente instanceof poo.Emisor === true &&
      this._contribuyente.nombreComercial !== null
    );

    super.create();

    this._setPartyIdentificationTag();

    if (hasTradename === true) {
      this._setPartyNameTag();
    }

    this._setPartyLegalEntityTag();

    return super.xml;
  }
}

module.exports = Party;
