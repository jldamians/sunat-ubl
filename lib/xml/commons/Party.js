"use strict";

const Element = require('./Element'),
      PartyLegalEntity = require('./PartyLegalEntity'),
      PartyIdentification = require('./PartyIdentification');

class Party extends Element {
  /**
   * @constructor
   * @param {Persona} entidad, información de la entidad
   */
  constructor(entidad) {
    super();

    this._entidad = entidad;
  }

  /**
   * Tipo y número de documento de identidad
   * @return {xmlbuilder} xml element
   */
  _partyIdentification() {
    const newPartyIdentification = new PartyIdentification(this._entidad);

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
      .txt(this._entidad.nombreComercial);
  }

  _partyLegalEntity() {
    const newPartyLegalEntity = new PartyLegalEntity(this._entidad);

    return newPartyLegalEntity.toXMLElement();
  }

  toXMLElement() {
    const Party = super.create(`${super.prefix.cac}:Party`);

    Party.importDocument(this._partyIdentification());

    if (this._entidad.nombreComercial !== null) {
      Party.importDocument(this._partyName());
    }

    Party.importDocument(this._partyLegalEntity());

    return Party;
  }
}

module.exports = Party;
