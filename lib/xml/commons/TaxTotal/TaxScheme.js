"use strict";

const constants = require('../../../constants');

const Element = require('../../Element');

const XMLNS = constants.xmlns,
      CATALOGS = constants.catalogs,
      TRIBUTE_TYPE_CODES = constants.tributeTypeCodes;

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
    const ID = super.create(`${XMLNS.getPrefix(super.prefix.cbc)}ID`);

    ID
      .att('schemeID', 'UN/ECE 5153')
      .att('schemeAgencyName', 'PE:SUNAT')
      .att('schemeName', CATALOGS.getName(CATALOGS.CATALOG_05))
      .att('schemeURI', CATALOGS.getURI(CATALOGS.CATALOG_05));

    ID.txt(this._codImpuesto);

    return ID;
  }

  /**
   * Nombre de tributo
   * @return {xmlbuilder} xml element
   */
  _name() {
    const Name = super.create(`${XMLNS.getPrefix(super.prefix.cbc)}Name`);

    Name.txt(TRIBUTE_TYPE_CODES.getName(this._codImpuesto));

    return Name;
  }

  /**
   * Código internacional de tributo
    */
  _taxTypeCode() {
    const TaxTypeCode = super.create(`${XMLNS.getPrefix(super.prefix.cbc)}TaxTypeCode`);

    TaxTypeCode.txt(TRIBUTE_TYPE_CODES.getInternationalCode(this._codImpuesto));

    return TaxTypeCode;
  }

  toXMLElement() {
    const TaxScheme = super.create(`${XMLNS.getPrefix(super.prefix.cac)}TaxScheme`);

    TaxScheme
      .importDocument(this._ID())
      .importDocument(this._name())
      .importDocument(this._taxTypeCode());

    return TaxScheme;
  }
}

module.exports = TaxScheme;
