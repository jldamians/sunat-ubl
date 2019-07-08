"use strict";

const constants = require('../../constants');

const Element = require('./Element');

const CATALOGS = constants.catalogs;

class PartyIdentification extends Element {
  /**
   * @constructor
   * @param  {String} tipoIdentidad, tipo de identidad
   * @param  {String} numeroIdentidad, número de identidad
   */
  constructor(tipoIdentidad, numeroIdentidad) {
    super();

    this._tipoIdentidad = tipoIdentidad;
    this._numeroIdentidad = numeroIdentidad;
  }

  /**
   * RUC del firmante
   * @return {xmlbuilder} xml element
   */
  _ID() {
    const ID = super.create(`${super.prefix.cbc}:ID`);

    return ID
      .att('schemeAgencyName', 'PE:SUNAT')
      .att('schemeID', this._tipoIdentidad)
      .att('schemeName', CATALOGS.getCatalogText(CATALOGS.CATALOG_06))
      .att('schemeURI', CATALOGS.CATALOG_06)
      .txt(this._numeroIdentidad);
  }

  toXMLElement() {
    const PartyIdentification = super.create(`${super.prefix.cac}:PartyIdentification`);

    return PartyIdentification.importDocument(this._ID());
  }
}

module.exports = PartyIdentification;
