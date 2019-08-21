"use strict";

const pick = require('lodash.pick');

const constants = require('../../constants');

const Element = require('../Element'),
      PartyLegalEntity = require('./PartyLegalEntity'),
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
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}PostalAddress`);

    tag.create();

    if (this._contribuyente.direccion.codUbigeo !== null) {
      // Consignar el código de ubigeo
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
          .txt(this._contribuyente.direccion.codUbigeo);
    }

    if (this._contribuyente.direccion.descripcion !== null) {
      // Consignar la descripción de la dirección
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}StreetName`)
          .txt(this._contribuyente.direccion.descripcion);
    }

    if (this._contribuyente.direccion.urbanizacion !== null) {
      // Consignar el nombre de la urbanización
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}CitySubdivisionName`)
          .txt(this._contribuyente.direccion.urbanizacion);
    }

    if (this._contribuyente.direccion.provincia !== null) {
      // Consignar el nombre de la provincia
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}CityName`)
          .txt(this._contribuyente.direccion.provincia);
    }

    if (this._contribuyente.direccion.departamento !== null) {
      // Consignar el nombre del departamento
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}CountrySubentity`)
          .txt(this._contribuyente.direccion.departamento);
    }

    if (this._contribuyente.direccion.distrito !== null) {
      // Consignar el nombre del distrito
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}District`)
          .txt(this._contribuyente.direccion.distrito);
    }

    if (this._contribuyente.direccion.codPais !== null) {
      // Consignar el código el país
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cac)}Country`)
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}IdentificationCode`)
            .txt(this._contribuyente.direccion.codPais);
    }

    super.xml.importDocument(tag.xml);
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

    if (super.ublVersion === VERSIONS.UBL_2_0) {
      this._setPostalAddressTag();
    }

    this._setPartyLegalEntityTag();

    return super.xml;
  }
}

module.exports = PartyGenericTag;
