"use strict";

const utils = require('../../../utils');

const constants = require('../../../constants');

const Element = require('../Element'),
      TaxCategory = require('./TaxCategory');

const TRIBUTE_TYPE_CODES = constants.tributeTypeCodes,
      AFFECTATION_TYPE_CODES = constants.affectationTypeCodes;

class TaxSubtotal extends Element {
  constructor(
    codMoneda,
    codImpuesto,
    baseImpuesto,
    mntImpuesto,
    tasaImpuesto,
    tipoAfectacionIgv,
    tipoCalculoIsc
  ) {
    // Si el código de tributo no existe,
    // el método en uso lanzará una excepción
    TRIBUTE_TYPE_CODES.getText(codImpuesto);

    super();

    this._codMoneda = codMoneda;
    this._codImpuesto = codImpuesto;
    this._mntImpuesto = mntImpuesto;
    this._tasaImpuesto = tasaImpuesto;
    this._baseImpuesto = baseImpuesto;
    this._tipoAfectacionIgv = tipoAfectacionIgv;
    this._tipoCalculoIsc = tipoCalculoIsc;
  }

  /**
   * Total valor de venta
   * @return {xmlbuilder} xml element
   */
  _taxableAmount() {
    const TaxableAmount = super.create(`${super.prefix.cbc}:TaxableAmount`);

    // Aplicamos el formato "0.00"
    const txtTaxableAmount = utils.numberFormat(this._baseImpuesto);

    TaxableAmount
      .att('currencyID', this._codMoneda)
      .txt(txtTaxableAmount);

    return TaxableAmount;
  }

  /**
   * Importe del tributo
   * @return {xmlbuilder} xml element
   */
  _taxAmount() {
    const TaxAmount = super.create(`${super.prefix.cbc}:TaxAmount`);

    const operationWithTaxation = (
      [TRIBUTE_TYPE_CODES.IGV, TRIBUTE_TYPE_CODES.IVAP].includes(this._codImpuesto)
    );

    const operationWithoutTaxation = (
      [TRIBUTE_TYPE_CODES.EXO, TRIBUTE_TYPE_CODES.INA, TRIBUTE_TYPE_CODES.EXP].includes(this._codImpuesto)
    );

    const freeTaxable = (
      this._tipoAfectacionIgv !== null &&
      [
        AFFECTATION_TYPE_CODES.GRAVADO_PREMIO,
        AFFECTATION_TYPE_CODES.GRAVADO_DONACION,
        AFFECTATION_TYPE_CODES.GRAVADO_RETIRO,
        AFFECTATION_TYPE_CODES.GRAVADO_PUBLICIDAD,
        AFFECTATION_TYPE_CODES.GRAVADO_BONIFICACION,
        AFFECTATION_TYPE_CODES.GRAVADO_ENTREGA_TRABAJADOR,
        AFFECTATION_TYPE_CODES.GRAVADO_IVAP,
      ].includes(this._tipoAfectacionIgv) &&
      this._codImpuesto === TRIBUTE_TYPE_CODES.GRA
    );

    const freeNonTaxable = (
      this._tipoAfectacionIgv !== null &&
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
      ].includes(this._tipoAfectacionIgv) &&
      this._codImpuesto === TRIBUTE_TYPE_CODES.GRA
    );

    if (operationWithTaxation === true && this._mntImpuesto <= 0) {
      throw new Error(`El monto del impuesto "${this._codImpuesto} - ${TRIBUTE_TYPE_CODES.getText(this._codImpuesto)}", debe ser mayor que 0.00`);
    }

    if (operationWithoutTaxation === true && this._mntImpuesto > 0) {
      throw new Error(`El monto del impuesto "${this._codImpuesto} - ${TRIBUTE_TYPE_CODES.getText(this._codImpuesto)}", debe ser igual a 0.00`);
    }

    if (freeTaxable === true && this._mntImpuesto <= 0) {
      throw new Error(`El monto de la afectación "${this._tipoAfectacionIgv} - ${AFFECTATION_TYPE_CODES.getText(this._tipoAfectacionIgv)}", debe ser mayor que 0.00`);
    }

    if (freeNonTaxable === true && this._mntImpuesto > 0) {
     throw new Error(`El monto de la afectación "${this._tipoAfectacionIgv} - ${AFFECTATION_TYPE_CODES.getText(this._tipoAfectacionIgv)}", debe ser igual a 0.00`);
    }

    // Aplicamos el formato "0.00"
    const txtTaxAmount = utils.numberFormat(this._mntImpuesto);

    TaxAmount
      .att('currencyID', this._codMoneda)
      .txt(txtTaxAmount);

    return TaxAmount;
  }

  /**
   * @return {xmlbuilder} xml element
   */
  _taxCategory() {
    const newTaxCategory = new TaxCategory(
      this._codImpuesto,
      this._tasaImpuesto,
      this._tipoAfectacionIgv,
      this._tipoCalculoIsc
    );

    return newTaxCategory.toXMLElement();
  }

  toXMLElement() {
    const TaxSubtotal = super.create(`${super.prefix.cac}:TaxSubtotal`);

    TaxSubtotal
      .importDocument(this._taxableAmount())
      .importDocument(this._taxAmount())
      .importDocument(this._taxCategory());

    return TaxSubtotal;
  }
}

module.exports = TaxSubtotal;
