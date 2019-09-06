"use strict";

const pick = require('lodash.pick');

const constants = require('../../constants');

const AddressGenericTag = require('./AddressGenericTag'),
      Element = require('../Element');

const XMLNS = constants.xmlns,
      VERSIONS = constants.versions;

class PartyLegalEntity extends Element {
  /**
   * @constructor
   * @param {Emisor | Receptor} contribuyente, información del contribuyente
   * @param {Object} prefix, prefijos de los namespace
   * @param {String} ublVersion, versión ubl
   */
  constructor(contribuyente, prefix, ublVersion) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}PartyLegalEntity`;

    super(xmlName, prefix, ublVersion);

    this._contribuyente = contribuyente;
  }

  /**
   * @method
   * Agregar razón social del contribuyente
   */
  _setRegistrationNameTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}RegistrationName`);

    tag.create();

    tag.xml.dat(this._contribuyente.razonSocial);

    super.xml.importDocument(tag.xml);
  }

  /**
   * @method
   * Agregar dirección del establecimiento
   */
  _setRegistrationAddressTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new AddressGenericTag(
      this._contribuyente.direccion,
      prefix,
      'RegistrationAddress',
      super.ublVersion
    );

    super.xml.importDocument(tag.toXMLElement());
  }

  /**
   * @function
   * Obtener el elemento xml
   * @return {xmlbuilder}
   */
  toXMLElement() {
    super.create();

    this._setRegistrationNameTag();

    // La etiqueta "RegistrationAddress" solo está permitida para los
    // comprobantes electrónicos de FA (01), BV (03), NC (07) y ND (08)
    // cuya única versión UBL permitida por SUNAT es la 2.1
    if (super.ublVersion === VERSIONS.UBL_2_1) {
      if (this._contribuyente.direccion !== null) {
        this._setRegistrationAddressTag();
      }
    }

    return super.xml;
  }
}

module.exports = PartyLegalEntity;
