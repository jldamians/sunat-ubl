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
  constructor(entidad) {
    super();

    this._entidad = entidad;
  }

  /**
   * Apellidos y nombres, denominación o razón social
   * @return {xmlbuilder} xml element
   */
  _registrationName() {
    const RegistrationName = super.create(`${XMLNS.getPrefix(super.prefix.cbc)}RegistrationName`);

    return RegistrationName
      .dat(this._entidad.razonSocial);
  }

  /**
   * Dirección del establecimiento donde se está realizando la venta
   * @return {xmlbuilder} xml element
   */
  _registrationAddress() {
    const RegistrationAddress = super.create(`${XMLNS.getPrefix(super.prefix.cac)}RegistrationAddress`);

    if (this._entidad.direccion.codUbigeo !== null) {
      RegistrationAddress
        .com('código de ubigeo')
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
          .att('schemeAgencyName', 'PE:INEI')
          .att('schemeName', 'Ubigeos')
          .txt(this._entidad.direccion.codUbigeo);
    }

    if (this._entidad instanceof poo.Emisor) {
      if (this._entidad.direccion.codLocal !== null) {
        RegistrationAddress
          .com('código del establecimiento o local anexo del emisor')
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}AddressTypeCode`)
            .att('listAgencyName', 'PE:SUNAT')
            .att('listName', 'Establecimientos anexos')
            .txt(this._entidad.direccion.codLocal);
      }
    }

    if (this._entidad.direccion.urbanizacion !== null) {
      RegistrationAddress
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}CitySubdivisionName`)
          .dat(this._entidad.direccion.urbanizacion);
    }

    if (this._entidad.direccion.provincia !== null) {
      RegistrationAddress
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}CityName`)
          .dat(this._entidad.direccion.provincia);
    }

    if (this._entidad.direccion.departamento !== null) {
      RegistrationAddress
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}CountrySubentity`)
          .dat(this._entidad.direccion.departamento);
    }

    if (this._entidad.direccion.distrito !== null) {
      RegistrationAddress
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}District`)
          .dat(this._entidad.direccion.distrito);
    }

    if (this._entidad.direccion.descripcion !== null) {
      RegistrationAddress
        .ele(`${XMLNS.getPrefix(super.prefix.cac)}AddressLine`)
          .com('dirección completa y detallada')
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Line`)
            .dat(this._entidad.direccion.descripcion);
    }

    if (this._entidad.direccion.codPais !== null) {
      RegistrationAddress
        .ele(`${XMLNS.getPrefix(super.prefix.cac)}Country`)
          .com('código del país')
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}IdentificationCode`)
            .att('listID', 'ISO 3166-1')
            .att('listAgencyName', 'United Nations Economic Commission for Europe')
            .att('listName', 'Country')
            .txt(this._entidad.direccion.codPais);
    }

    return RegistrationAddress;
  }

  toXMLElement() {
    const PartyLegalEntity = super.create(`${XMLNS.getPrefix(super.prefix.cac)}PartyLegalEntity`);

    const hasFiscalAddress = (
      this._entidad.direccion !== null
    );

    PartyLegalEntity
      .com('apellidos y nombres, denominación o razón social')
      .importDocument(this._registrationName());

    if (hasFiscalAddress) {
      PartyLegalEntity
        .com('dirección del establecimiento donde se está realizando la venta')
        .importDocument(this._registrationAddress());
    }

    return PartyLegalEntity;
  }
}

module.exports = PartyLegalEntity;
