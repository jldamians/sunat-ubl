"use strict";

const utils = require('../../../utils');

const constants = require('../../../constants');

const Element = require('../Element'),
      TaxCategory = require('./TaxCategory');

const TRIBUTE_TYPE_CODES = constants.tributeTypeCodes;

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

    const operationWithoutTaxation = (
      this._codImpuesto === TRIBUTE_TYPE_CODES.EXO ||
      this._codImpuesto === TRIBUTE_TYPE_CODES.INA ||
      this._codImpuesto === TRIBUTE_TYPE_CODES.EXP
    );

    if (operationWithoutTaxation === true && Number.parseFloat(this.mntImpuesto) > 0) {
      throw new Error(`El monto del impuesto "${this._codImpuesto} - ${TRIBUTE_TYPE_CODES.getText(this._codImpuesto)}", debe ser igual a 0.00`);
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
