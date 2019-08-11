"use strict";

const poo = require('../../../clases'),
      constants = require('../../../constants');

const Element = require('../Element'),
      TaxScheme = require('./TaxScheme');

const CATALOGS = constants.catalogs,
      TRIBUTE_TYPE_CODES = constants.tributeTypeCodes,
      AFFECTATION_TYPE_CODES = constants.affectationTypeCodes,
      CALCULATION_TYPE_CODES = constants.calculationTypeCodes;

class TaxCategory extends Element {
  /**
   * @constructor
   */
  constructor(impuesto) {
    if (impuesto instanceof poo.ImpuestoLinea === true) {
      // Si el código de afectación del igv no existe, el método en uso lanzará una excepción
      if (impuesto.tipoAfectacionIgv !== null) {
        AFFECTATION_TYPE_CODES.getText(impuesto.tipoAfectacionIgv);
      }

      // Si el código de cálculo del isc no existe, el método en uso lanzará una excepción
      if (impuesto.tipoAfectacionIsc !== null) {
        CALCULATION_TYPE_CODES.getText(impuesto.tipoAfectacionIsc);
      }
    }

    super();

    this._impuesto = impuesto;
  }

  /**
   * Categoría de impuestos
   * @return {xmlbuilder} xml element
   */
  _ID() {
    const IDTag = super.create(`${super.prefix.cbc}:ID`);

    IDTag
      .att('schemeID', 'UN/ECE 5305')
      .att('schemeName', 'Codigo de tributos')
      .att('schemeAgencyName', 'PE:SUNAT')
      .txt(TRIBUTE_TYPE_CODES.getCategory(this._impuesto.codigo));

    return IDTag;
  }

  /**
   * Porcentaje de impuesto del IGV o IVAP
   * @return {xmlbuilder} xml element
   */
  _percent() {
    const percentTag = super.create(`${super.prefix.cbc}:Percent`);

    percentTag.txt(this._impuesto.tasa);

    return percentTag;
  }

  /**
   * @return {xmlbuilder} xml element
   */
  _perUnitAmount() {
    const perUnitAmountTag = super.create(`${super.prefix.cbc}:PerUnitAmount`);

    perUnitAmountTag
      .att('currencyID', this._impuesto.codMoneda)
      .txt(this._impuesto.tasa);

    return perUnitAmountTag;
  }

  /**
   * Código de tipo de afectación del IGV o IVAP
   * @return {xmlbuilder} xml element
   */
  _taxExemptionReasonCode() {
    const taxExemptionReasonCodeTag = super.create(`${super.prefix.cbc}:TaxExemptionReasonCode`);

    return taxExemptionReasonCodeTag
      .att('listAgencyName', 'PE:SUNAT')
      .att('listName', CATALOGS.getName(CATALOGS.CATALOG_07))
      .att('listURI', CATALOGS.getURI(CATALOGS.CATALOG_07))
      .txt(this._impuesto.tipoAfectacionIgv);
  }

  /**
   * Código de tipo de sistema ISC
   * @return {xmlbuilder} xml element
   */
  _tierRange() {
    const tierRangeTag = super.create(`${super.prefix.cbc}:TierRange`);

    return tierRangeTag
      .txt(this._impuesto.tipoAfectacionIsc);
  }

  /**
   * @return {xmlbuilder} xml element
   */
  _taxScheme() {
    const newTaxScheme = new TaxScheme(this._impuesto.codigo);

    return newTaxScheme.toXMLElement();
  }

  toXMLElement() {
    const TaxCategory = super.create(`${super.prefix.cac}:TaxCategory`);

    TaxCategory.importDocument(this._ID());

    if (this._impuesto instanceof poo.ImpuestoLinea === true) {
      if (this._impuesto.codigo !== TRIBUTE_TYPE_CODES.ICBPER) {
        TaxCategory.importDocument(this._percent());
      } else {
        TaxCategory.importDocument(this._perUnitAmount());
      }

      if (this._impuesto.tipoAfectacionIgv !== null) {
        TaxCategory.importDocument(this._taxExemptionReasonCode());
      }

      if (this._impuesto.tipoAfectacionIsc !== null) {
        TaxCategory.importDocument(this._tierRange());
      }
    }

    TaxCategory.importDocument(this._taxScheme());

    return TaxCategory;
  }
}


module.exports = TaxCategory;
