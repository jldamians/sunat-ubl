"use strict";

const constants = require('../../constants');

const Element = require('./Element');

const CATALOGS = constants.catalogs;

class PartyIdentification extends Element {
  /**
   * @constructor
   * @param {Persona} entidad, información de la entidad
   */
  constructor(entidad) {
    super();

    this._entidad = entidad;
  }

  /**
   * RUC del firmante
   * @return {xmlbuilder} xml element
   */
  _ID() {
    const ID = super.create(`${super.prefix.cbc}:ID`);

    return ID
      .att('schemeAgencyName', 'PE:SUNAT')
      .att('schemeID', this._entidad.tipoDocumento)
      .att('schemeName', CATALOGS.getName(CATALOGS.CATALOG_06))
      .att('schemeURI', CATALOGS.getURI(CATALOGS.CATALOG_06))
      .txt(this._entidad.numeroDocumento);
  }

  toXMLElement() {
    const PartyIdentification = super.create(`${super.prefix.cac}:PartyIdentification`);

    return PartyIdentification.importDocument(this._ID());
  }
}

module.exports = PartyIdentification;
