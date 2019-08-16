"use strict";

const constants = require('../../constants');

const Element = require('../Element');

const XMLNS = constants.xmlns,
      CATALOGS = constants.catalogs;

class PartyIdentification extends Element {
  /**
   * @constructor
   * @param {Persona} entidad, información de la entidad
   */
  constructor(entidad, prefix) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}PartyIdentification`;

    super(xmlName, prefix);

    this._entidad = entidad;
  }

  /**
   * RUC del firmante
   * @return {xmlbuilder} xml element
   */
  _setIDTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}ID`);

    tag.create();

    tag.xml
      .att('schemeAgencyName', 'PE:SUNAT')
      .att('schemeID', this._entidad.tipoDocumento)
      .att('schemeName', CATALOGS.getName(CATALOGS.CATALOG_06))
      .att('schemeURI', CATALOGS.getURI(CATALOGS.CATALOG_06))
      .txt(this._entidad.numeroDocumento);

    super.xml.importDocument(tag.xml);
  }

  toXMLElement() {
    super.create();

    this._setIDTag();

    return super.xml;
  }
}

module.exports = PartyIdentification;
