/**
 * @author: jldamians <jlds161089@gmail.com>
 */

"use strict";

const Element = require('./Element');

const constants = require('../../constants');

const CATALOGS = constants.catalogs,
      CHARGE_TYPE_CODES = constants.chargeTypeCodes;

class AllowanceCharge extends Element {
  /**
   * @constructor
   * @param {String} codMoneda, código de moneda
   * @param {String} codigo, código del cargo o descuento
   * @param {Double} base, base imponible
   * @param {Double} tasa, tasa aplicada
   * @param {Double} monto, monto descontado
   */
  constructor(codMoneda, codigo, base, tasa, monto) {
    // Si el código de cargo o descuento no existe,
    // el método en uso lanzará una excepción
    CHARGE_TYPE_CODES.getText(codigo);

    super();

    this._codMoneda = codMoneda;
    this._codigo = codigo;
    this._base = base;
    this._tasa = tasa;
    this._monto = monto;
  }

  /**
   * Indicador de cargo o descuento (true / false)
   * @return {xmlbuilder} xml element
   */
  _chargeIndicatorTag() {
    const chargeIndicatorTag = super.create(`${super.prefix.cbc}:ChargeIndicator`);

    return chargeIndicatorTag
      .txt(CHARGE_TYPE_CODES.getIndicator(this._codigo));
  }

  /**
   * Código de cargo o descuento
   * @return {xmlbuilder} xml element
   */
  _allowanceChargeReasonCodeTag() {
    const allowanceChargeReasonCodeTag = super.create(`${super.prefix.cbc}:AllowanceChargeReasonCode`);

    return allowanceChargeReasonCodeTag
      .att('listAgencyName', 'PE:SUNAT')
      .att('listName', CATALOGS.getName(CATALOGS.CATALOG_53))
      .att('listURI', CATALOGS.getURI(CATALOGS.CATALOG_53))
      .txt(this._codigo);
  }

  /**
   * Factor (tasa) de cargo o descuento
   * @return {xmlbuilder} xml element
   */
  _multiplierFactorNumericTag() {
    const multiplierFactorNumericTag = super.create(`${super.prefix.cbc}:MultiplierFactorNumeric`);

    return multiplierFactorNumericTag
      .txt(this.tasa);
  }

  /**
   * Monto de cargo o descuento
   * @return {xmlbuilder} xml element
   */
  _amountTag() {
    const amountTag = super.create(`${super.prefix.cbc}:Amount`);

    return amountTag
      .att('currencyID', this._codMoneda)
      .txt(this._monto);
  }

  /**
   * Monto base del cargo o descuento
   * @return {xmlbuilder} xml element
   */
  _baseAmountTag() {
    const baseAmountTag = super.create(`${super.prefix.cbc}:BaseAmount`);

    return baseAmountTag
      .att('currencyID', this._codMoneda)
      .txt(this._base);
  }

  /**
   * @return {xmlbuilder} xml element
   */
  toXMLElement() {
    const allowanceChargeTag = super.create(`${super.prefix.cac}:AllowanceCharge`);

    return allowanceChargeTag
      .importDocument(this._chargeIndicatorTag())
      .importDocument(this._allowanceChargeReasonCodeTag())
      .importDocument(this._multiplierFactorNumericTag())
      .importDocument(this._amountTag())
      .importDocument(this._baseAmountTag());
  }
}

module.exports = AllowanceCharge;
