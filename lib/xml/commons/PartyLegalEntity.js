"use strict";

const poo = require('../../clases'),
      constants = require('../../constants');

const Element = require('../Element');

const XMLNS = constants.xmlns;

class PartyLegalEntity extends Element {
  /**
   * @constructor
   * @param {Persona} entidad, información de la entidad
   */
  constructor(entidad, prefix) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}PartyLegalEntity`;

    super(xmlName, prefix);

    this._entidad = entidad;
  }

  /**
   * Apellidos y nombres, denominación o razón social
   * @return {xmlbuilder} xml element
   */
  _setRegistrationNameTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}RegistrationName`);

    tag.create();

    tag.xml.dat(this._entidad.razonSocial);

    super.xml.importDocument(tag.xml);
  }

  /**
   * Dirección del establecimiento donde se está realizando la venta
   * @return {xmlbuilder} xml element
   */
  _setRegistrationAddressTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}RegistrationAddress`);

    tag.create();

    if (this._entidad.direccion.codUbigeo !== null) {
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
          .att('schemeAgencyName', 'PE:INEI')
          .att('schemeName', 'Ubigeos')
          .txt(this._entidad.direccion.codUbigeo);
    }

    if (this._entidad instanceof poo.Emisor) {
      if (this._entidad.direccion.codLocal !== null) {
        tag.xml
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}AddressTypeCode`)
            .att('listAgencyName', 'PE:SUNAT')
            .att('listName', 'Establecimientos anexos')
            .txt(this._entidad.direccion.codLocal);
      }
    }

    if (this._entidad.direccion.urbanizacion !== null) {
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}CitySubdivisionName`)
          .dat(this._entidad.direccion.urbanizacion);
    }

    if (this._entidad.direccion.provincia !== null) {
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}CityName`)
          .dat(this._entidad.direccion.provincia);
    }

    if (this._entidad.direccion.departamento !== null) {
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}CountrySubentity`)
          .dat(this._entidad.direccion.departamento);
    }

    if (this._entidad.direccion.distrito !== null) {
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}District`)
          .dat(this._entidad.direccion.distrito);
    }

    if (this._entidad.direccion.descripcion !== null) {
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cac)}AddressLine`)
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Line`)
            .dat(this._entidad.direccion.descripcion);
    }

    if (this._entidad.direccion.codPais !== null) {
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cac)}Country`)
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}IdentificationCode`)
            .att('listID', 'ISO 3166-1')
            .att('listAgencyName', 'United Nations Economic Commission for Europe')
            .att('listName', 'Country')
            .txt(this._entidad.direccion.codPais);
    }

    super.xml.importDocument(tag.xml);
  }

  toXMLElement() {
    super.create();

    this._setRegistrationNameTag();

    if (this._entidad.direccion !== null) {
      this._setRegistrationAddressTag();
    }

    return super.xml;
  }
}

module.exports = PartyLegalEntity;
