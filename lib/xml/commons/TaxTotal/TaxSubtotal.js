"use strict";

const utils = require('../../../utils');

const constants = require('../../../constants');

const Element = require('../Element'),
      TaxCategory = require('./TaxCategory');

const CATALOGS = constants.catalogs,
      TRIBUTE_TYPE_CODES = constants.tributeTypeCodes;

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
    const isTributeTypeAllowed = TRIBUTE_TYPE_CODES.checkCode(codImpuesto);

    if (isTributeTypeAllowed === false) {
      throw new Error(`Código de tipo de tributo inválido. Debe considerar los códigos del catálogo nro. ${CATALOGS.CATALOG_05}: ${CATALOGS.getText(CATALOGS.CATALOG_05)}`);
    }

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
