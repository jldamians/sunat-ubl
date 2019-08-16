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
   * @param {Persona} entidad, información de la entidad
   */
  constructor(entidad, prefix) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}Party`;

    super(xmlName, prefix);

    this._entidad = entidad;
  }

  /**
   * Tipo y número de documento de identidad
   * @return {xmlbuilder} xml element
   */
  _setPartyIdentificationTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new PartyIdentification(this._entidad, prefix);

    super.xml.importDocument(tag.toXMLElement());
  }

  /**
   * Nombre comercial
   * @return {xmlbuilder} xml element
   */
  _setPartyNameTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}PartyName`);

    tag.create();

    tag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Name`)
        .txt(this._entidad.nombreComercial);

    super.xml.importDocument(tag.xml);
  }

  _setPartyLegalEntityTag() {
    const prefix = {
      cac: super.prefix.cac,
      cbc: super.prefix.cbc,
    };

    const tag = new PartyLegalEntity(this._entidad, prefix);

    super.xml.importDocument(tag.toXMLElement());
  }

  toXMLElement() {
    super.create();

    this._setPartyIdentificationTag();

    if (this._entidad instanceof poo.Emisor) {
      if (this._entidad.nombreComercial !== null) {
        this._setPartyNameTag();
      }
    }

    this._setPartyLegalEntityTag();

    return super.xml;
  }
}

module.exports = Party;
