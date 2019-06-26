"use strict";

const utils = require('../../../utils');

const tributeTypes = require('../../../constants/tributeTypes');

const Element = require('../Element');

class TaxScheme extends Element {
  constructor(prefix, payload) {
    if (!utils.hasOwnProperty(prefix, 'cac')) {
      throw new ('Necesita definir el xmlns cac');
    }

    if (!utils.hasOwnProperty(prefix, 'cbc')) {
      throw new ('Necesita definir el xmlns cbc');
    }

    super(prefix);

    this._payload = payload;
  }

  get payload() {
    return this._payload;
  }

  /**
   * Código de tributo
   * @return {xmlbuilder} xml element
   */
  _ID() {
    const ID = super.create(`${super.prefix.cbc}:ID`);

    ID
      .att('schemeID', 'UN/ECE 5153')
      .att('schemeName', 'Codigo de tributos')
      .att('schemeAgencyName', 'PE:SUNAT')
      .att('schemeURI', 'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo05');

    ID.txt(this.payload.codigoImpuesto);

    return ID;
  }

  /**
   * Nombre de tributo
   * @return {xmlbuilder} xml element
   */
  _name() {
    const Name = super.create(`${super.prefix.cbc}:Name`);

    const tributeData = tributeTypes.getTributeData(this.payload.codigoImpuesto);

    Name.txt(tributeData.name);

    return Name;
  }

  /**
   * Código internacional de tributo
   * @return {xmlbuilder} xml element
   */
  _taxTypeCode() {
    const TaxTypeCode = super.create(`${super.prefix.cbc}:TaxTypeCode`);

    const tributeData = tributeTypes.getTributeData(this.payload.codigoImpuesto);

    TaxTypeCode.txt(tributeData.typeCode);

    return TaxTypeCode;
  }

  toXMLElement() {
    const TaxScheme = super.create(`${super.prefix.cac}:TaxScheme`);

    TaxScheme
      .importDocument(this._ID())
      .importDocument(this._name())
      .importDocument(this._taxTypeCode());

    return TaxScheme;
  }
}

module.exports = TaxScheme;
