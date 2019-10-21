"use strict";

const pick = require('lodash.pick');

const {
  TipoDocumentoIdentidad,
} = require('sunat-catalogs');

const constants = require('../../constants');

const Element = require('../Element'),
      PartyLegalEntity = require('./PartyLegalEntity'),
      AddressGenericTag = require('./AddressGenericTag');

const XMLNS = constants.xmlns,
      VERSIONS = constants.versions;

class PartyGenericTag extends Element {
  /**
   * @constructor
   * @param {Emisor | Receptor} contribuyente, información del contribuyente
   * @param {Object} prefix, prefijos de los namespace
   * @param {String} xmlName, nombre de la etiqueta xml
   * @param {String} ublVersion, versión ubl
   */
  constructor(contribuyente, prefix, xmlName = null, ublVersion = null) {
    let newXmlName;

    if (xmlName === null) {
      newXmlName = `${XMLNS.getPrefix(prefix.cac)}Party`;
    } else {
      newXmlName = `${XMLNS.getPrefix(prefix.cac)}${xmlName}`;
    }

    super(newXmlName, prefix, ublVersion);

    this._contribuyente = contribuyente;
  }

  /**
   * @method
   * Agregar tipo y número de documento del contribuyente
   */
  _setPartyIdentificationTag() {
    const partyTag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}PartyIdentification`);

    partyTag.create();

    if (super.ublVersion === VERSIONS.UBL_2_0) {
      partyTag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
          .att('schemeID', this._contribuyente.tipoDocumento)
          .txt(this._contribuyente.numeroDocumento);
    } else if (super.ublVersion === VERSIONS.UBL_2_1) {
      partyTag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
          .att('schemeID', this._contribuyente.tipoDocumento)
          .att('schemeName', TipoDocumentoIdentidad.nombreCat)
          .att('schemeAgencyName', TipoDocumentoIdentidad.agenciaCat)
          .att('schemeURI', TipoDocumentoIdentidad.uriCat)
          .txt(this._contribuyente.numeroDocumento);
    } else {
      throw new Error(`Versión UBL ingresada NO permitida: ${super.ublVersion}`);
    }

    super.xml.importDocument(partyTag.xml);
  }

  /**
   * @method
   * Agregar nombre comercial del contribuyente
   */
  _setPartyNameTag() {
    if (this._contribuyente.nombreComercial !== null) {
      const tag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}PartyName`);

      tag.create();

      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Name`)
          .txt(this._contribuyente.nombreComercial);

      super.xml.importDocument(tag.xml);
    }
  }

  /**
   * @method
   * Agregar domicilio fiscal
   */
  _setPostalAddressTag() {
    if (this._contribuyente.direccion !== null) {
      const prefix = pick(super.prefix, ['cac', 'cbc']);

      const tag = new AddressGenericTag(
        this._contribuyente.direccion,
        prefix,
        'PostalAddress',
        super.ublVersion
      );

      super.xml.importDocument(tag.toXMLElement());
    }
  }

  /**
   * @method
   * Agregar razón social y dirección del contribuyente
   */
  _setPartyLegalEntityTag() {
    if (this._contribuyente.razonSocial !== null || this._contribuyente.direccion !== null) {
      const prefix = {
        cac: super.prefix.cac,
        cbc: super.prefix.cbc,
      };

      const tag = new PartyLegalEntity(this._contribuyente, prefix, super.ublVersion);

      super.xml.importDocument(tag.toXMLElement());
    }
  }

  /**
   * @function
   * Obtener el elemento xml
   * @return {xmlbuilder}
   */
  toXMLElement() {
    super.create();

    this._setPartyIdentificationTag();

    this._setPartyNameTag();

    // La etiqueta "PostalAddress" solo está permitida para los
    // comprobantes electrónicos de retención (20) y percepción (40),
    // cuya única versión UBL permitida por SUNAT es la 2.0
    if (super.ublVersion === VERSIONS.UBL_2_0) {
      this._setPostalAddressTag();
    }

    this._setPartyLegalEntityTag();

    return super.xml;
  }
}

module.exports = PartyGenericTag;
