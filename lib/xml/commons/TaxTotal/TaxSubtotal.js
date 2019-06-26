"use strict";

const utils = require('../../../utils');

const Element = require('../Element');
const TaxCategory = require('./TaxCategory');

class TaxSubtotal extends Element {
  constructor(prefix, payload) {
    if (!utils.hasOwnProperty(prefix, 'cac')) {
      throw new ('Necesita definir el xmlns cac');
    }

    if (!utils.hasOwnProperty(prefix, 'cbc')) {
      throw new ('Necesita definir el xmlns cbc');
    }

    super(prefix);

    this._payload = payload;
  }

  get payload() {
    return this._payload;
  }

  /**
   * Total valor de venta
   * @return {xmlbuilder} xml element
   */
  _taxableAmount() {
    const TaxableAmount = super.create(`${super.prefix.cbc}:TaxableAmount`);

    // Aplicamos el formato "0.00"
    const txtTaxableAmount = utils.numberFormat(this.payload.baseImpuesto);

    TaxableAmount
      .att('currencyID', this.payload.tipoMoneda)
      .txt(txtTaxableAmount)
    ;

    return TaxableAmount;
  }

  /**
   * Importe del tributo
   * @return {xmlbuilder} xml element
   */
  _taxAmount() {
    const TaxAmount = super.create(`${super.prefix.cbc}:TaxAmount`);

    // Aplicamos el formato "0.00"
    const txtTaxAmount = utils.numberFormat(this.payload.montoImpuesto);

    TaxAmount
      .att('currencyID', this.payload.tipoMoneda)
      .txt(txtTaxAmount)
    ;

    return TaxAmount;
  }

  /**
   * @return {xmlbuilder} xml element
   */
  _taxCategory() {
    const prefix = {
      cac: super.prefix.cac,
      cbc: super.prefix.cbc
    };

    const data = {
      codigoImpuesto: this.payload.codigoImpuesto,
      tasaImpuesto: this.payload.tasaImpuesto,
      codigoAfectacionIgv: this.payload.codigoAfectacionIgv,
      codigoSistemaCalculoIsc: this.payload.codigoSistemaCalculoIsc
    };

    const newTaxCategory = new TaxCategory(prefix, data);

    return newTaxCategory.toXMLElement();
  }

  toXMLElement() {
    const TaxSubtotal = super.create(`${super.prefix.cac}:TaxSubtotal`);

    TaxSubtotal
      .importDocument(this._taxableAmount())
      .importDocument(this._taxAmount())
      .importDocument(this._taxCategory())
    ;

    return TaxSubtotal;
  }
}

module.exports = TaxSubtotal;
