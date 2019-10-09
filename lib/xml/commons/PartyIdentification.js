"use strict";

const {
  TipoDocumentoIdentidad,
} = require('sunat-catalogs');

const constants = require('../../constants');

const Element = require('../Element');

const XMLNS = constants.xmlns,
      VERSIONS = constants.versions;

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
    } else if (super.ublVersion === VERSIONS.UBL_2_1) {
      tag.xml
        .att('schemeID', this._contribuyente.tipoDocumento)
        .att('schemeName', TipoDocumentoIdentidad.nombreCat)
        .att('schemeAgencyName', TipoDocumentoIdentidad.agenciaCat)
        .att('schemeURI', TipoDocumentoIdentidad.uriCat)
        .txt(this._contribuyente.numeroDocumento);
    } else {
      throw new Error(`Versión UBL ingresada NO permitida: ${super.ublVersion}`);
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
