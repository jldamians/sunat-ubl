"use strict";

const Element = require('./Element');

class PrepaidPayment extends Element {
  /**
   * @constructor
   * @param {String} identificadorPago, identificador del pago
   * @param {String} fechaPago, fecha de pago
   * @param {String} montoPago, monto anticipado
   * @param {String} tipoMoneda, tipo de moneda
   */
  constructor(identificadorPago, fechaPago, montoPago, tipoMoneda) {
    super();

    this._identificadorPago = identificadorPago;
    this._fechaPago = fechaPago;
    this._montoPago = montoPago;
    this._tipoMoneda = tipoMoneda;
  }

  /**
   * Identificador del pago
   * @return {xmlbuilder} xml element
   */
  _ID() {
    const ID = super.create(`${super.prefix.cbc}:ID`);

    return ID
      .att('schemeName', 'Anticipo')
      .att('schemeAgencyName', 'PE:SUNAT')
      .txt(this._identificadorPago);
  }

  /**
   * Monto anticipado
   * @return {xmlbuilder} xml element
   */
  _paidAmount() {
    const paidAmount = super.create(`${super.prefix.cbc}:PaidAmount`);

    return paidAmount
      .att('currencyID', this._tipoMoneda)
      .txt(this._montoPago);
  }

  /**
   * Fecha de pago
   * @return {xmlbuilder} xml element
   */
  _paidDate() {
    const paidDate = super.create(`${super.prefix.cbc}:PaidDate`);

    return paidDate
      .txt(this._fechaPago);
  }

  toXMLElement() {
    const prepaidPayment = super.create(`${super.prefix.cac}:PrepaidPayment`);

    return prepaidPayment
      .importDocument(this._ID())
      .importDocument(this._paidAmount())
      .importDocument(this._paidDate());
  }
}

module.exports = PrepaidPayment;
