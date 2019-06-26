"use strict";

const utils = require('../../../utils');

const Element = require('../Element');
const TaxSubtotal = require('./TaxSubtotal');

class TaxTotal extends Element {
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
   * Importe del tributo
   * @return {xmlbuilder} xml element
   */
  _taxAmount() {
    const TaxAmount = super.create(`${super.prefix.cbc}:TaxAmount`);

    // Aplicamos el formato "0.00"
    const txtTaxAmount = utils.numberFormat(this.payload.totalImpuestos);

    TaxAmount
      .att('currencyID', this.payload.currencyID)
      .txt(txtTaxAmount)
    ;

    return TaxAmount;
  }

  /**
   * @return {xmlbuilder} xml element
   */
  _taxSubtotal() {
    const prefix = {
      cac: super.prefix.cac,
      cbc: super.prefix.cbc
    };

    const data = {
      codigoImpuesto: this.payload.codigoImpuesto,
      tasaImpuesto: this.payload.tasaImpuesto,
      codigoAfectacionIgv: this.payload.codigoAfectacionIgv,
      codigoSistemaCalculoIsc: this.payload.codigoSistemaCalculoIsc,
      baseImpuesto: this.payload.baseImpuesto,
      montoImpuesto: this.payload.montoImpuesto,
      tipoMoneda: this.payload.tipoMoneda
    };

    const newTaxSubtotal = new TaxSubtotal(prefix, data);

    return newTaxSubtotal.toXMLElement();
  }

  toXMLElement() {
    const TaxTotal = super.create(`${super.prefix.cac}:TaxTotal`);

    TaxTotal
      .importDocument(this._taxAmount())
      .importDocument(this._taxSubtotal())
    ;

    return TaxTotal;
  }
}

module.exports = TaxTotal;
