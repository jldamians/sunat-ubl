"use strict";

const Element = require('./Element'),
      PartyLegalEntity = require('./PartyLegalEntity'),
      PartyIdentification = require('./PartyIdentification');

class Party extends Element {
  /**
   * @constructor
   * @param  {String} tipoIdentidad, tipo de identidad
   * @param  {String} numeroIdentidad, número de identidad
   * @param  {String} nombre, denominación o razón social
   * @param  {String} codUbigeo, código de ubigeo
   * @param  {String} codLocal, código de local
   * @param  {String} direccion, dirección del establecimiento
   */
  constructor(tipoIdentidad, numeroIdentidad, nombre, codUbigeo, codLocal, direccion, codPais) {
    super();

    this._nombre = nombre;
    this._tipoIdentidad = tipoIdentidad;
    this._numeroIdentidad = numeroIdentidad;
    this._codUbigeo = codUbigeo;
    this._codLocal = codLocal;
    this._direccion = direccion;
    this._codPais = codPais;
  }

  toXMLElement() {
    const Party = super.create(`${super.prefix.cac}:Party`);

    const newPartyIdentification = new PartyIdentification(
      this._tipoIdentidad,
      this._numeroIdentidad
    );

    const newPartyLegalEntity = new PartyLegalEntity(
      this._nombre,
      this._codUbigeo,
      this._codLocal,
      this._direccion,
      this._codPais
    );

    return Party
      .importDocument(newPartyIdentification.toXMLElement())
      .importDocument(newPartyLegalEntity.toXMLElement());
  }
}

module.exports = Party;
