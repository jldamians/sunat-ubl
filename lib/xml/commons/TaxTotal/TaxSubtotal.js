"use strict";

const utils = require('../../../utils');

const Element = require('../Element'),
      TaxCategory = require('./TaxCategory');

class TaxSubtotal extends Element {
  constructor(tipoMoneda, codImpuesto, mntBaseImpuesto, mntImpuesto, tasaImpuesto, codAfectacionIgv, codSistemaCalculoIsc) {
    super();

    this._tipoMoneda = tipoMoneda;
    this._codImpuesto = codImpuesto;
    this._mntImpuesto = mntImpuesto;
    this._tasaImpuesto = tasaImpuesto;
    this._mntBaseImpuesto = mntBaseImpuesto;
    this._codAfectacionIgv = codAfectacionIgv;
    this._codSistemaCalculoIsc = codSistemaCalculoIsc;
  }

  /**
   * Total valor de venta
   * @return {xmlbuilder} xml element
   */
  _taxableAmount() {
    const TaxableAmount = super.create(`${super.prefix.cbc}:TaxableAmount`);

    // Aplicamos el formato "0.00"
    const txtTaxableAmount = utils.numberFormat(this._mntBaseImpuesto);

    TaxableAmount
      .att('currencyID', this._tipoMoneda)
      .txt(txtTaxableAmount);

    return TaxableAmount;
  }

  /**
   * Importe del tributo
   * @return {xmlbuilder} xml element
   */
  _taxAmount() {
    const TaxAmount = super.create(`${super.prefix.cbc}:TaxAmount`);

    // Aplicamos el formato "0.00"
    const txtTaxAmount = utils.numberFormat(this._mntImpuesto);

    TaxAmount
      .att('currencyID', this._tipoMoneda)
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
      this._codAfectacionIgv,
      this._codSistemaCalculoIsc
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
