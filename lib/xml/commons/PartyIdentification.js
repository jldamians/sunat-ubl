"use strict";

const constants = require('../../constants');

const Element = require('./Element');

const CATALOGS = constants.catalogs;

class PartyIdentification extends Element {
  /**
   * @constructor
   * @param  {String} tipoDocumento, tipo de documento de identidad
   * @param  {String} numeroDocumento, número de documento de identidad
   */
  constructor(tipoDocumento, numeroDocumento) {
    super();

    this._tipoDocumento = tipoDocumento;
    this._numeroDocumento = numeroDocumento;
  }

  /**
   * RUC del firmante
   * @return {xmlbuilder} xml element
   */
  _ID() {
    const ID = super.create(`${super.prefix.cbc}:ID`);

    return ID
      .att('schemeAgencyName', 'PE:SUNAT')
      .att('schemeID', this._tipoDocumento)
      .att('schemeName', CATALOGS.getText(CATALOGS.CATALOG_06))
      .att('schemeURI', CATALOGS.getURI(CATALOGS.CATALOG_06))
      .txt(this._numeroDocumento);
  }

  toXMLElement() {
    const PartyIdentification = super.create(`${super.prefix.cac}:PartyIdentification`);

    return PartyIdentification.importDocument(this._ID());
  }
}

module.exports = PartyIdentification;
