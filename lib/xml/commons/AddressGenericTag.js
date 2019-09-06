"use strict";

const constants = require('../../constants');

const Element = require('../Element');

const XMLNS = constants.xmlns,
      VERSIONS = constants.versions;

class AddressGenericTag extends Element{
  constructor(direccion, prefix, xmlName = null, ublVersion = null) {
    let newXmlName;

    if (xmlName === null) {
      newXmlName = `${XMLNS.getPrefix(prefix.cac)}RegistrationAddress`;
    } else {
      newXmlName = `${XMLNS.getPrefix(prefix.cac)}${xmlName}`;
    }

    super(newXmlName, prefix, ublVersion);

    this._direccion = direccion;
  }

  /**
   * @method
   * Agregar el código de ubigeo
   */
  _setIDTag() {
    const tagName = `${XMLNS.getPrefix(super.prefix.cbc)}ID`;

    if (super.ublVersion === VERSIONS.UBL_2_0) {
      super.xml
        .ele(tagName)
          .txt(this._direccion.codUbigeo);
    } else if (super.ublVersion === VERSIONS.UBL_2_1) {
      super.xml
        .ele(tagName)
          .att('schemeAgencyName', 'PE:INEI')
          .att('schemeName', 'Ubigeos')
          .txt(this._direccion.codUbigeo);
    } else {
      throw new Error(`Versión UBL ingresada NO permitida: ${super.ublVersion}`);
    }
  }

  /**
   * @method
   * Agregar el código del establecimiento anexo (UBL 2.1)
   */
  _setAddressTypeCodeTag() {
    const tagName = `${XMLNS.getPrefix(super.prefix.cbc)}AddressTypeCode`;

    super.xml
      .ele(tagName)
        .att('listAgencyName', 'PE:SUNAT')
        .att('listName', 'Establecimientos anexos')
        .txt(this._direccion.codLocal);
  }

  /**
   * @method
   * Agregar la dirección (UBL 2.0)
   */
  _setStreetNameTag() {
    const tagName = `${XMLNS.getPrefix(super.prefix.cbc)}StreetName`;

    super.xml
      .ele(tagName)
        .txt(this._direccion.descripcion);
  }

  /**
   * @method
   * Agregar la urbanización
   */
  _setCitySubdivisionNameTag() {
    const tagName = `${XMLNS.getPrefix(super.prefix.cbc)}CitySubdivisionName`;

    super.xml
      .ele(tagName)
        .txt(this._direccion.urbanizacion);
  }

  /**
   * @method
   * Agregar la provincia
   */
  _setCityNameTag() {
    const tagName = `${XMLNS.getPrefix(super.prefix.cbc)}CityName`;

    super.xml
      .ele(tagName)
        .txt(this._direccion.provincia);
  }

  /**
   * @method
   * Agregar el departamento
   */
  _setCountrySubentityTag() {
    const tagName = `${XMLNS.getPrefix(super.prefix.cbc)}CountrySubentity`;

    super.xml
      .ele(tagName)
        .txt(this._direccion.departamento);
  }

  /**
   * @method
   * Agregar el distrito
   */
  _setDistrictTag() {
    const tagName = `${XMLNS.getPrefix(super.prefix.cbc)}District`;

    super.xml
      .ele(tagName)
        .txt(this._direccion.distrito);
  }

  /**
   * @method
   * Agregar la dirección (UBL 2.1)
   */
  _setAddressLineTag() {
    super.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cac)}AddressLine`)
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Line`)
          .dat(this._direccion.descripcion);
  }

  /**
   * @method
   * Agregar el código de país
   */
  _setCountryTag() {
    if (super.ublVersion === VERSIONS.UBL_2_0) {
      super.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cac)}Country`)
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}IdentificationCode`)
            .txt(this._direccion.codPais);
    } else if (super.ublVersion === VERSIONS.UBL_2_1) {
      super.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cac)}Country`)
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}IdentificationCode`)
            .att('listID', 'ISO 3166-1')
            .att('listAgencyName', 'United Nations Economic Commission for Europe')
            .att('listName', 'Country')
            .txt(this._direccion.codPais);
    } else {
      throw new Error(`Versión UBL ingresada NO permitida: ${super.ublVersion}`);
    }
  }

  /**
   * @function
   * Obtener el elemento xml
   * @return {xmlbuilder}
   */
  toXMLElement() {
    super.create();

    if (this._direccion.codUbigeo !== null) {
      this._setIDTag();
    }

    // La etiqueta "StreetName" solo está permitida para los
    // comprobantes electrónicos de retención (20) y percepción (40),
    // cuya única versión UBL permitida por SUNAT es la 2.0
    if (super.ublVersion === VERSIONS.UBL_2_0) {
      if (this._direccion.descripcion) {
        this._setStreetNameTag();
      }
    }

    // La etiqueta "AddressTypeCode" solo está permitida para los
    // comprobantes electrónicos de FA (01), BV (03), NC (07) y ND (08)
    // cuya única versión UBL permitida por SUNAT es la 2.1
    if (super.ublVersion === VERSIONS.UBL_2_1) {
      if (this._direccion.codLocal) {
        this._setAddressTypeCodeTag();
      }
    }

    if (this._direccion.urbanizacion !== null) {
      this._setCitySubdivisionNameTag();
    }

    if (this._direccion.provincia !== null) {
      this._setCityNameTag();
    }

    if (this._direccion.departamento !== null) {
      this._setCountrySubentityTag();
    }

    if (this._direccion.distrito !== null) {
      this._setDistrictTag();
    }

    // La etiqueta "AddressLine" solo está permitida para los
    // comprobantes electrónicos de FA (01), BV (03), NC (07) y ND (08)
    // cuya única versión UBL permitida por SUNAT es la 2.1
    if (super.ublVersion === VERSIONS.UBL_2_1) {
      if (this._direccion.descripcion) {
        this._setAddressLineTag();
      }
    }

    if (this._direccion.codPais !== null) {
      this._setCountryTag();
    }

    return super.xml;
  }
}

module.exports = AddressGenericTag;
