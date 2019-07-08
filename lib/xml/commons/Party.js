"use strict";

const utils = require('../../utils');

const Element = require('./Element'),
      PartyLegalEntity = require('./PartyLegalEntity'),
      PartyIdentification = require('./PartyIdentification');

class Party extends Element {
  /**
   * @constructor
   * @param {String} tipoIdentidad, tipo de identidad
   * @param {String} numeroIdentidad, número de identidad
   * @param {String} nombreComercial, nombre comercial
   * @param {String} nombre, denominación o razón social
   * @param {String} codUbigeo, código de ubigeo
   * @param {String} departamento, departamento
   * @param {String} provincia, provincia
   * @param {String} distrito, distrito
   * @param {String} codLocal, código de local
   * @param {String} urbanizacion, urbanización
   * @param {String} direccion, dirección del establecimiento
   * @param {String} codPais, código de país
   */
  constructor(
    tipoIdentidad,
    numeroIdentidad,
    nombreComercial,
    nombre,
    codUbigeo,
    departamento,
    provincia,
    distrito,
    codLocal,
    urbanizacion,
    direccion,
    codPais
  ) {
    super();

    this._tipoIdentidad = tipoIdentidad;
    this._numeroIdentidad = numeroIdentidad;
    this._nombreComercial = nombreComercial;
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

  _partyIdentification() {
    const newPartyIdentification = new PartyIdentification(
      this._tipoIdentidad,
      this._numeroIdentidad
    );

    return newPartyIdentification.toXMLElement();
  }

  /**
   * Nombre comercial
   * @return {xmlbuilder} xml element
   */
  _partyName() {
    const PartyName = super.create(`${super.prefix.cac}:PartyName`);

    return PartyName
      .ele(`${super.prefix.cbc}:Name`)
      .txt(this._nombreComercial);
  }

  _partyLegalEntity() {
    const newPartyLegalEntity = new PartyLegalEntity(
      this._nombre,
      this._codUbigeo,
      this._departamento,
      this._provincia,
      this._distrito,
      this._codLocal,
      this._urbanizacion,
      this._direccion,
      this._codPais
    );

    return newPartyLegalEntity.toXMLElement();
  }

  toXMLElement() {
    const Party = super.create(`${super.prefix.cac}:Party`);

    Party.importDocument(this._partyIdentification());

    if (this._nombreComercial !== null && utils.isUndefined(this._nombreComercial) === false) {
      Party.importDocument(this._partyName());
    }

    Party.importDocument(this._partyLegalEntity());

    return Party;
  }
}

module.exports = Party;
