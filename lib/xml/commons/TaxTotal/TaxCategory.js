"use strict";

const utils = require('../../../utils');

const CATALOGS = require('../../../constants/catalogs');
const TRIBUTE_TYPES = require('../../../constants/tributeTypes');

const Element = require('../Element');
const TaxScheme = require('./TaxScheme');

class TaxCategory extends Element {
  constructor(codImpuesto, tasaImpuesto, codAfectacionIgv, codSistemaCalculoIsc) {
    super();

    this._codImpuesto = codImpuesto;
    this._tasaImpuesto = tasaImpuesto;
    this._codAfectacionIgv = codAfectacionIgv;
    this._codSistemaCalculoIsc = codSistemaCalculoIsc;
  }

  /**
   * Categoría de impuestos
   * @return {xmlbuilder} xml element
   */
  _ID() {
    const ID = super.create(`${super.prefix.cbc}:ID`);

    const tributeData = TRIBUTE_TYPES.getTributeData(this._codImpuesto);

    ID
      .att('schemeID', 'UN/ECE 5305')
      .att('schemeName', 'Codigo de tributos')
      .att('schemeAgencyName', 'PE:SUNAT')
      .txt(tributeData.category);

    return ID;
  }

  /**
   * Porcentaje de impuesto del IGV o IVAP
   * @return {xmlbuilder} xml element
   */
  _percent() {
    const Percent = super.create(`${super.prefix.cbc}:Percent`);

    Percent.txt(this._tasaImpuesto);

    return Percent;
  }


  /**
   * Código de tipo de afectación del IGV o IVAP
   * @return {xmlbuilder} xml element
   */
  _taxExemptionReasonCode() {
    const TaxExemptionReasonCode = super.create(`${super.prefix.cbc}:TaxExemptionReasonCode`);

    TaxExemptionReasonCode
      .att('listAgencyName', 'PE:SUNAT')
      .att('listName', CATALOGS.getCatalogText(CATALOGS.CATALOG_07))
      .att('listURI', CATALOGS.CATALOG_07)
      .txt(this._codAfectacionIgv);

    return TaxExemptionReasonCode;
  }

  /**
   * Código de tipo de sistema ISC
   * @return {xmlbuilder} xml element
   */
  _tierRange() {
    const TierRange = super.create(`${super.prefix.cbc}:TierRange`);

    TierRange.txt(this._codSistemaCalculoIsc);

    return TierRange;
  }

  /**
   * @return {xmlbuilder} xml element
   */
  _taxScheme() {
    const newTaxScheme = new TaxScheme(this._codImpuesto);

    return newTaxScheme.toXMLElement();
  }

  toXMLElement() {
    const TaxCategory = super.create(`${super.prefix.cac}:TaxCategory`);

    TaxCategory.importDocument(this._ID());

    if (this._tasaImpuesto !== null && utils.isUndefined(this._tasaImpuesto) === false) {
      if (this._tasaImpuesto >= 0) {
        TaxCategory.importDocument(this._percent());
      }
    }

    if (this._codAfectacionIgv !== null && utils.isUndefined(this._codAfectacionIgv) === false) {
      TaxCategory.importDocument(this._taxExemptionReasonCode());
    }

    if (this._codSistemaCalculoIsc !== null && utils.isUndefined(this._codSistemaCalculoIsc) === false) {
      TaxCategory.importDocument(this._tierRange());
    }

    TaxCategory.importDocument(this._taxScheme());

    return TaxCategory;
  }
}


module.exports = TaxCategory;
