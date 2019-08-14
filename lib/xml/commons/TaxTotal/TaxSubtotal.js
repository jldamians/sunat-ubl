"use strict";

const poo = require('../../../clases'),
      constants = require('../../../constants');

const Element = require('../../Element'),
      TaxCategory = require('./TaxCategory');

const XMLNS = constants.xmlns,
      TRIBUTE_TYPE_CODES = constants.tributeTypeCodes,
      AFFECTATION_TYPE_CODES = constants.affectationTypeCodes,
      MEASURE_UNIT_TYPE_CODES = constants.measureUnitTypeCodes;

class TaxSubtotal extends Element {
  constructor(impuesto) {
    // Si el código de tributo no existe, el método en uso lanzará una excepción
    TRIBUTE_TYPE_CODES.getText(impuesto.codigo);

    super();

    this._impuesto = impuesto;
  }

  /**
   * Total valor de venta
   * @return {xmlbuilder} xml element
   */
  _taxableAmount() {
    const taxableAmountTag = super.create(`${XMLNS.getPrefix(super.prefix.cbc)}TaxableAmount`);

    taxableAmountTag
      .att('currencyID', this._impuesto.codMoneda)
      .txt(this._impuesto.base);

    return taxableAmountTag;
  }

  /**
   * Importe del tributo
   * @return {xmlbuilder} xml element
   */
  _taxAmount() {
    const taxAmountTag = super.create(`${XMLNS.getPrefix(super.prefix.cbc)}TaxAmount`);

    const operationWithTaxation = (
      [TRIBUTE_TYPE_CODES.IGV, TRIBUTE_TYPE_CODES.IVAP].includes(this._impuesto.codigo)
    );

    const operationWithoutTaxation = (
      [TRIBUTE_TYPE_CODES.EXP, TRIBUTE_TYPE_CODES.EXO, TRIBUTE_TYPE_CODES.INA].includes(this._impuesto.codigo)
    );

    const freeTaxable = (
      this._impuesto.tipoAfectacionIgv !== null &&
      [
        AFFECTATION_TYPE_CODES.GRAVADO_PREMIO,
        AFFECTATION_TYPE_CODES.GRAVADO_DONACION,
        AFFECTATION_TYPE_CODES.GRAVADO_RETIRO,
        AFFECTATION_TYPE_CODES.GRAVADO_PUBLICIDAD,
        AFFECTATION_TYPE_CODES.GRAVADO_BONIFICACION,
        AFFECTATION_TYPE_CODES.GRAVADO_ENTREGA_TRABAJADOR,
        AFFECTATION_TYPE_CODES.GRAVADO_IVAP,
      ].includes(this._impuesto.tipoAfectacionIgv) &&
      this._impuesto.codigo === TRIBUTE_TYPE_CODES.GRA
    );

    const freeNonTaxable = (
      this._impuesto.tipoAfectacionIgv !== null &&
      [
        AFFECTATION_TYPE_CODES.EXONERADO_GRATUITA,
        AFFECTATION_TYPE_CODES.INAFECTO_BONIFICA,
        AFFECTATION_TYPE_CODES.INAFECTO_RETIRO,
        AFFECTATION_TYPE_CODES.INAFECTO_MUESTRA_MEDICA,
        AFFECTATION_TYPE_CODES.INAFECTO_CONVENIO_COLECTIVO,
        AFFECTATION_TYPE_CODES.INAFECTO_PREMIO,
        AFFECTATION_TYPE_CODES.INAFECTO_PUBLICIDAD,
        AFFECTATION_TYPE_CODES.INAFECTO_GRATUITA,
        AFFECTATION_TYPE_CODES.EXPORTACION,
      ].includes(this._impuesto.tipoAfectacionIgv) &&
      this._impuesto.codigo === TRIBUTE_TYPE_CODES.GRA
    );

    // tributos globales
    if (operationWithTaxation === true && this._impuesto.monto <= 0) {
      throw new Error(`El monto del impuesto "${this._impuesto.codigo} - ${TRIBUTE_TYPE_CODES.getText(this._impuesto.codigo)}", debe ser mayor que 0.00`);
    }

    if (operationWithoutTaxation === true && this._impuesto.monto > 0) {
      throw new Error(`El monto del impuesto "${this._impuesto.codigo} - ${TRIBUTE_TYPE_CODES.getText(this._impuesto.codigo)}", debe ser igual a 0.00`);
    }

    // tributos lineales
    if (freeTaxable === true && this._impuesto.monto <= 0) {
      throw new Error(`El monto de la afectación "${this._impuesto.tipoAfectacionIgv} - ${AFFECTATION_TYPE_CODES.getText(this._impuesto.tipoAfectacionIgv)}", debe ser mayor que 0.00`);
    }

    if (freeNonTaxable === true && this._impuesto.monto > 0) {
     throw new Error(`El monto de la afectación "${this._impuesto.tipoAfectacionIgv} - ${AFFECTATION_TYPE_CODES.getText(this._impuesto.tipoAfectacionIgv)}", debe ser igual a 0.00`);
    }

    taxAmountTag
      .att('currencyID', this._impuesto.codMoneda)
      .txt(this._impuesto.monto);

    return taxAmountTag;
  }

  /**
   * @return {xmlbuilder} xml element
   */
  _baseUnitMeasure() {
    const baseUnitMeasureTag = super.create(`${XMLNS.getPrefix(super.prefix.cbc)}BaseUnitMeasure`);

    baseUnitMeasureTag
      .att('unitCode', MEASURE_UNIT_TYPE_CODES.NIU)
      .txt(this._impuesto.base);

    return baseUnitMeasureTag;
  }

  /**
   * @return {xmlbuilder} xml element
   */
  _taxCategory() {
    const newTaxCategory = new TaxCategory(this._impuesto);

    return newTaxCategory.toXMLElement();
  }

  toXMLElement() {
    const TaxSubtotal = super.create(`${XMLNS.getPrefix(super.prefix.cac)}TaxSubtotal`);

    if (this._impuesto.codigo !== TRIBUTE_TYPE_CODES.ICBPER) {
      TaxSubtotal.importDocument(this._taxableAmount());
    }

    TaxSubtotal.importDocument(this._taxAmount());

    if (this._impuesto instanceof poo.ImpuestoLinea === true) {
      if (this._impuesto.codigo === TRIBUTE_TYPE_CODES.ICBPER) {
        TaxSubtotal.importDocument(this._baseUnitMeasure());
      }
    }

    TaxSubtotal.importDocument(this._taxCategory());

    return TaxSubtotal;
  }
}

module.exports = TaxSubtotal;
