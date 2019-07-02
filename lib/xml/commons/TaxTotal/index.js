"use strict";

const utils = require('../../../utils');

const Element = require('../Element'),
      TaxSubtotal = require('./TaxSubtotal');

class TaxTotal extends Element {
  constructor(tipoMoneda, mntTotalTributos, impuestos) {
    super();

    this._impuestos = impuestos;
    this._tipoMoneda = tipoMoneda;
    this._mntTotalTributos = mntTotalTributos;
  }

  /**
   * Importe del tributo
   * @return {xmlbuilder} xml element
   */
  _taxAmount() {
    const TaxAmount = super.create(`${super.prefix.cbc}:TaxAmount`);

    // Aplicamos el formato "0.00"
    const txtTaxAmount = utils.numberFormat(this._mntTotalTributos);

    TaxAmount
      .att('currencyID', this._tipoMoneda)
      .txt(txtTaxAmount);

    return TaxAmount;
  }

  /**
   * @return {xmlbuilder} xml element
   */
  _taxSubtotal(impuesto) {
    const {
      codImpuesto,
      mntImpuesto,
      tasaImpuesto,
      mntBaseImpuesto,
      codAfectacionIgv,
      codSistemaCalculoIsc
    } = impuesto;

    const newTaxSubtotal = new TaxSubtotal(
      this._tipoMoneda,
      codImpuesto,
      mntBaseImpuesto,
      mntImpuesto,
      tasaImpuesto,
      codAfectacionIgv,
      codSistemaCalculoIsc
    );

    return newTaxSubtotal.toXMLElement();
  }

  toXMLElement() {
    const TaxTotal = super.create(`${super.prefix.cac}:TaxTotal`);

    TaxTotal.importDocument(this._taxAmount());

    this._impuestos.forEach((impuesto) => {
      TaxTotal.importDocument(this._taxSubtotal(impuesto));
    });

    return TaxTotal;
  }
}

module.exports = TaxTotal;
