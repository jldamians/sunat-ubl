"use strict";

const constants = require('../../constants');

const Element = require('../Element');

const XMLNS = constants.xmlns,
      VERSIONS = constants.versions,
      CATALOGS = constants.catalogs;

class PartyIdentification extends Element {
  /**
   * @constructor
   * @param {Emisor | Receptor} contribuyente, información del contribuyente
   * @param {Object} prefix, prefijos de los namespace
   * @param {String} ublVersion, versión ubl
   */
  constructor(contribuyente, prefix, ublVersion) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}PartyIdentification`;

    super(xmlName, prefix, ublVersion);

    this._contribuyente = contribuyente;
  }

  /**
   * @method
   * Agregar tipo y número de documento del contribuyente
   */
  _setIDTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}ID`);

    tag.create();

    if (super.ublVersion === VERSIONS.UBL_2_0) {
      tag.xml
        .att('schemeID', this._contribuyente.tipoDocumento)
        .txt(this._contribuyente.numeroDocumento);
    } else {
      tag.xml
        .att('schemeID', this._contribuyente.tipoDocumento)
        .att('schemeName', CATALOGS.getName(CATALOGS.CATALOG_06))
        .att('schemeAgencyName', 'PE:SUNAT')
        .att('schemeURI', CATALOGS.getURI(CATALOGS.CATALOG_06))
        .txt(this._contribuyente.numeroDocumento);
    }

    super.xml.importDocument(tag.xml);
  }

  /**
   * @function
   * Obtener el elemento xml
   * @return {xmlbuilder}
   */
  toXMLElement() {
    super.create();

    this._setIDTag();

    return super.xml;
  }
}

module.exports = PartyIdentification;
