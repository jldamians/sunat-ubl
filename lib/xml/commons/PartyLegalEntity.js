"use strict";

const poo = require('../../clases'),
      constants = require('../../constants');

const Element = require('../Element');

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
    const hasAnnexLocalCode = (
      this._contribuyente instanceof poo.Emisor === true &&
      this._contribuyente.direccion.codLocal !== null
    );

    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}RegistrationAddress`);

    tag.create();

    if (this._contribuyente.direccion.codUbigeo !== null) {
      // Consignar código de ubigeo
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
          .att('schemeAgencyName', 'PE:INEI')
          .att('schemeName', 'Ubigeos')
          .txt(this._contribuyente.direccion.codUbigeo);
    }

    if (hasAnnexLocalCode) {
      // Consignar código del establecimiento anexo
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}AddressTypeCode`)
          .att('listAgencyName', 'PE:SUNAT')
          .att('listName', 'Establecimientos anexos')
          .txt(this._contribuyente.direccion.codLocal);
    }

    if (this._contribuyente.direccion.urbanizacion !== null) {
      // Consignar nombre de urbanización
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}CitySubdivisionName`)
          .dat(this._contribuyente.direccion.urbanizacion);
    }

    if (this._contribuyente.direccion.provincia !== null) {
      // Consignar nombre de provincia
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}CityName`)
          .dat(this._contribuyente.direccion.provincia);
    }

    if (this._contribuyente.direccion.departamento !== null) {
      // Consignar nombre de departamento
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}CountrySubentity`)
          .dat(this._contribuyente.direccion.departamento);
    }

    if (this._contribuyente.direccion.distrito !== null) {
      // Consignar nombre de distrito
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}District`)
          .dat(this._contribuyente.direccion.distrito);
    }

    if (this._contribuyente.direccion.descripcion !== null) {
      // Consignar descripción de dirección
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cac)}AddressLine`)
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Line`)
            .dat(this._contribuyente.direccion.descripcion);
    }

    if (this._contribuyente.direccion.codPais !== null) {
      // Consignar código de país
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cac)}Country`)
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}IdentificationCode`)
            .att('listID', 'ISO 3166-1')
            .att('listAgencyName', 'United Nations Economic Commission for Europe')
            .att('listName', 'Country')
            .txt(this._contribuyente.direccion.codPais);
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
