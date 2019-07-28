"use strict";

const utils = require('../../../utils');

const Element = require('../Element'),
      TaxSubtotal = require('./TaxSubtotal');

class TaxTotal extends Element {
  constructor(codMoneda, mntTributos, impuestos) {
    super();

    this._impuestos = impuestos;
    this._codMoneda = codMoneda;
    this._mntTributos = mntTributos;
  }

  /**
   * Importe del tributo
   * @return {xmlbuilder} xml element
   */
  _taxAmount() {
    const TaxAmount = super.create(`${super.prefix.cbc}:TaxAmount`);

    // Aplicamos el formato "0.00"
    const txtTaxAmount = utils.numberFormat(this._mntTributos);

    TaxAmount
      .att('currencyID', this._codMoneda)
      .txt(txtTaxAmount);

    return TaxAmount;
  }

  /**
   * @return {xmlbuilder} xml element
   */
  _taxSubtotal(impuesto) {
    const { codigo, monto, tasa, base, tipoAfectacionIgv, tipoCalculoIsc } = impuesto;

    const newTaxSubtotal = new TaxSubtotal(
      this._codMoneda,
      codigo,
      base,
      monto,
      tasa,
      tipoAfectacionIgv,
      tipoCalculoIsc
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
