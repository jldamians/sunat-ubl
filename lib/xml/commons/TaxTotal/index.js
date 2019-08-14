"use strict";

const constants = require('../../../constants');

const Element = require('../../Element'),
      TaxSubtotal = require('./TaxSubtotal');

const XMLNS = constants.xmlns;

class TaxTotal extends Element {
  constructor(tributo) {
    super();

    this._tributo = tributo;
  }

  /**
   * Importe del tributo
   * @return {xmlbuilder} xml element
   */
  _taxAmount() {
    const TaxAmount = super.create(`${XMLNS.getPrefix(super.prefix.cbc)}TaxAmount`);

    TaxAmount
      .att('currencyID', this._tributo.codMoneda)
      .txt(this._tributo.mntTotal);

    return TaxAmount;
  }

  /**
   * @method _setTaxSubtotal
   * Agregar el tag con los datos del impuesto del tributo
   * @param {xmlbuilder} xml
   */
  _setTaxSubtotal(xml) {
    this._tributo.impuestos.forEach((impuesto) => {
      const newTaxSubtotalTag = new TaxSubtotal(impuesto);

      xml.importDocument(newTaxSubtotalTag.toXMLElement());
    });
  }

  toXMLElement() {
    const taxTotalTag = super.create(`${XMLNS.getPrefix(super.prefix.cac)}TaxTotal`);

    taxTotalTag.importDocument(this._taxAmount());

    this._setTaxSubtotal(taxTotalTag);

    return taxTotalTag;
  }
}

module.exports = TaxTotal;
