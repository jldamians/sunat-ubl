"use strict";

const pick = require('lodash.pick');

const constants = require('../../constants');

const Element = require('../Element'),
      PartyLegalEntity = require('./PartyLegalEntity'),
      AddressGenericTag = require('./AddressGenericTag'),
      PartyIdentification = require('./PartyIdentification');

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
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new PartyIdentification(this._contribuyente, prefix, super.ublVersion);

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
   * Agregar dominicilio fiscal
   */
  _setPostalAddressTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new AddressGenericTag(
      this._contribuyente.direccion,
      prefix,
      'PostalAddress',
      super.ublVersion
    );

    super.xml.importDocument(tag.toXMLElement());
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

    const tag = new PartyLegalEntity(this._contribuyente, prefix, super.ublVersion);

    super.xml.importDocument(tag.toXMLElement());
  }

  /**
   * @function
   * Obtener el elemento xml
   * @return {xmlbuilder}
   */
  toXMLElement() {
    const hasTradename = (
      this._contribuyente.nombreComercial !== null
    );

    super.create();

    this._setPartyIdentificationTag();

    if (hasTradename === true) {
      this._setPartyNameTag();
    }

    // La etiqueta "PostalAddress" solo está permitida para los
    // comprobantes electrónicos de retención (20) y percepción (40),
    // cuya única versión UBL permitida por SUNAT es la 2.0
    if (super.ublVersion === VERSIONS.UBL_2_0) {
      if (this._contribuyente.direccion) {
        this._setPostalAddressTag();
      }
    }

    this._setPartyLegalEntityTag();

    return super.xml;
  }
}

module.exports = PartyGenericTag;
