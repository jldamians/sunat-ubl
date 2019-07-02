"use strict";

const utils = require('../../utils');

const Element = require('./Element');

class PartyLegalEntity extends Element {
  /**
   * @constructor
   * @param  {String} nombre, denominación o razón social
   * @param  {String} codUbigeo, código de ubigeo
   * @param  {String} codLocal, código de local
   * @param  {String} direccion, dirección del establecimiento
   */
  constructor(nombre, codUbigeo, codLocal, direccion) {
    super();

    this._nombre = nombre;
    this._codUbigeo = codUbigeo;
    this._codLocal = codLocal;
    this._direccion = direccion;
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

    if (this._codUbigeo !== null && utils.isUndefined(this._codUbigeo) === false) {
      RegistrationAddress
        .com('código de ubigeo')
        .ele(`${super.prefix.cbc}:ID`)
          .att('schemeAgencyName', 'PE:INEI')
          .att('schemeName', 'Ubigeos')
          .txt(this._codUbigeo)
          .up();
    }

    if (this._codLocal !== null && utils.isUndefined(this._codLocal) === false) {
      RegistrationAddress
        .com('código del establecimiento o local anexo del emisor')
        .ele(`${super.prefix.cbc}:AddressTypeCode`)
          .att('listAgencyName', 'PE:SUNAT')
          .att('listName', 'Establecimientos anexos')
          .txt(this._codLocal || '0000')
          .up();
    }

    if (this._direccion !== null && utils.isUndefined(this._direccion) === false) {
      RegistrationAddress
        .ele(`${super.prefix.cac}:AddressLine`)
          .com('dirección completa y detallada')
          .ele(`${super.prefix.cbc}:Line`)
            .dat(this._direccion);
    }

    return RegistrationAddress;
  }

  toXMLElement() {
    const PartyLegalEntity = super.create(`${super.prefix.cac}:PartyLegalEntity`);

    const hasOriginAddress = (
      (this._codUbigeo !== null && utils.isUndefined(this._codUbigeo) === false) ||
      (this._codLocal !== null && utils.isUndefined(this._codLocal) === false) ||
      (this._direccion !== null && utils.isUndefined(this._direccion) === false)
    );

    PartyLegalEntity
      .com('apellidos y nombres, denominación o razón social')
      .importDocument(this._registrationName());

    if (hasOriginAddress) {
      PartyLegalEntity
        .com('dirección del establecimiento donde se está realizando la venta')
        .importDocument(this._registrationAddress());
    }

    return PartyLegalEntity;
  }
}

module.exports = PartyLegalEntity;
