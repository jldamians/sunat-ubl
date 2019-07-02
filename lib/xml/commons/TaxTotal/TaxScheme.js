"use strict";

const constants = require('../../../constants');

const Element = require('../Element');

const CATALOGS = constants.catalogs,
      TRIBUTE_TYPES = constants.tributeTypes;

class TaxScheme extends Element {
  constructor(codImpuesto) {
    super();

    this._codImpuesto = codImpuesto;
  }

  /**
   * Código de tributo
   * @return {xmlbuilder} xml element
   */
  _ID() {
    const ID = super.create(`${super.prefix.cbc}:ID`);

    ID
      .att('schemeID', 'UN/ECE 5153')
      .att('schemeName', CATALOGS.getCatalogText(CATALOGS.CATALOG_05))
      .att('schemeAgencyName', 'PE:SUNAT')
      .att('schemeURI', CATALOGS.CATALOG_05);

    ID.txt(this._codImpuesto);

    return ID;
  }

  /**
   * Nombre de tributo
   * @return {xmlbuilder} xml element
   */
  _name() {
    const Name = super.create(`${super.prefix.cbc}:Name`);

    const tributeData = TRIBUTE_TYPES.getTributeData(this._codImpuesto);

    Name.txt(tributeData.name);

    return Name;
  }

  /**
   * Código internacional de tributo
    */
  _taxTypeCode() {
    const TaxTypeCode = super.create(`${super.prefix.cbc}:TaxTypeCode`);

    const tributeData = TRIBUTE_TYPES.getTributeData(this._codImpuesto);

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
