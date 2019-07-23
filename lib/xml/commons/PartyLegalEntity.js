"use strict";

const Element = require('./Element');

class PartyLegalEntity extends Element {
  /**
   * @constructor
   * @param {String} nombre, denominación o razón social
   * @param {String} codUbigeo, código de ubigeo
   * @param {String} departamento, departamento
   * @param {String} provincia, provincia
   * @param {String} distrito, distrito
   * @param {String} codLocal, código de local
   * @param {String} urbanizacion, urbanización
   * @param {String} direccion, dirección del establecimiento
   * @param {String} codPais, código de pais
   */
  constructor(
    nombre,
    codUbigeo = null,
    departamento = null,
    provincia = null,
    distrito = null,
    codLocal = null,
    urbanizacion = null,
    direccion = null,
    codPais = null
  ) {
    super();

    this._nombre = nombre;
    this._codUbigeo = codUbigeo;
    this._departamento = departamento;
    this._provincia = provincia;
    this._distrito = distrito;
    this._codLocal = codLocal;
    this._urbanizacion = urbanizacion;
    this._direccion = direccion;
    this._codPais = codPais;
  }

  /**
   * Apellidos y nombres, denominación o razón social
   * @return {xmlbuilder} xml element
   */
  _registrationName() {
    const RegistrationName = super.create(`${super.prefix.cbc}:RegistrationName`);

    return RegistrationName
      .dat(this._nombre);
  }

  /**
   * Dirección del establecimiento donde se está realizando la venta
   * @return {xmlbuilder} xml element
   */
  _registrationAddress() {
    const RegistrationAddress = super.create(`${super.prefix.cac}:RegistrationAddress`);

    if (this._codUbigeo !== null) {
      RegistrationAddress
        .com('código de ubigeo')
        .ele(`${super.prefix.cbc}:ID`)
          .att('schemeAgencyName', 'PE:INEI')
          .att('schemeName', 'Ubigeos')
          .txt(this._codUbigeo);
    }

    if (this._codLocal !== null) {
      RegistrationAddress
        .com('código del establecimiento o local anexo del emisor')
        .ele(`${super.prefix.cbc}:AddressTypeCode`)
          .att('listAgencyName', 'PE:SUNAT')
          .att('listName', 'Establecimientos anexos')
          .txt(this._codLocal);
    }

    if (this._urbanizacion !== null) {
      RegistrationAddress
        .ele(`${super.prefix.cbc}:CitySubdivisionName`)
          .dat(this._urbanizacion);
    }

    if (this._provincia !== null) {
      RegistrationAddress
        .ele(`${super.prefix.cbc}:CityName`)
          .dat(this._provincia);
    }

    if (this._departamento !== null) {
      RegistrationAddress
        .ele(`${super.prefix.cbc}:CountrySubentity`)
          .dat(this._departamento);
    }

    if (this._distrito !== null) {
      RegistrationAddress
        .ele(`${super.prefix.cbc}:District`)
          .dat(this._distrito);
    }

    if (this._direccion !== null) {
      RegistrationAddress
        .ele(`${super.prefix.cac}:AddressLine`)
          .com('dirección completa y detallada')
          .ele(`${super.prefix.cbc}:Line`)
            .dat(this._direccion);
    }

    if (this._codPais !== null) {
      RegistrationAddress
        .ele(`${super.prefix.cac}:Country`)
          .com('código del país')
          .ele(`${super.prefix.cbc}:IdentificationCode`)
            .att('listID', 'ISO 3166-1')
            .att('listAgencyName', 'United Nations Economic Commission for Europe')
            .att('listName', 'Country')
            .txt(this._codPais);
    }

    return RegistrationAddress;
  }

  toXMLElement() {
    const PartyLegalEntity = super.create(`${super.prefix.cac}:PartyLegalEntity`);

    const hasFiscalAddress = (
      this._codUbigeo !== null ||
      this._codLocal !== null ||
      this._direccion !== null ||
      this._codPais !== null ||
      this._urbanizacion !== null ||
      this._provincia !== null ||
      this._departamento !== null ||
      this._distrito !== null
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
