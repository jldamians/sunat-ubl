"use strict";

const constants = require('../../constants');

const Element = require('../Element');

const XMLNS = constants.xmlns,
      VERSIONS = constants.versions;

class PaymentGenericTag extends Element {
  /**
   * @constructor
   * @param {Pago} pago, información del pago
   * @param {Object} prefix, prefijos de los namespace
   */
  constructor(pago, prefix, xmlName = null, ublVersion = null) {
    let newXmlName;

    if (xmlName === null) {
      newXmlName = `${XMLNS.getPrefix(prefix.cac)}Payment`;
    } else {
      newXmlName = `${XMLNS.getPrefix(prefix.cac)}${xmlName}`;
    }

    super(newXmlName, prefix, ublVersion);

    this._pago = pago;
  }

  /**
   * @method
   * Agregar identificador del pago
   */
  _setIDTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}ID`);

    tag.create();

    if (super.ublVersion === VERSIONS.UBL_2_0) {
      tag.xml.txt(this._pago.identificador);
    } else if (super.ublVersion === VERSIONS.UBL_2_1) {
      tag.xml
        .att('schemeName', 'Anticipo')
        .att('schemeAgencyName', 'PE:SUNAT')
        .txt(this._pago.identificador);
    } else {
      throw new Error(`Versión UBL ingresada NO permitida: ${super.ublVersion}`);
    }

    super.xml.importDocument(tag.xml);
  }

  /**
   * @method
   * Agregar el importe pagado
   */
  _setPaidAmountTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}PaidAmount`);

    tag.create();

    tag.xml
      .att('currencyID', this._pago.codMoneda)
      .txt(this._pago.imptPago);

    super.xml.importDocument(tag.xml);
  }

  /**
   * @method
   * Agregar la fecha de pago
   */
  _setPaidDateTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}PaidDate`);

    tag.create();

    tag.xml.txt(this._pago.fechaPago);

    super.xml.importDocument(tag.xml);
  }

  /**
   * @function
   * Obtener el elemento xml
   * @return {xmlbuilder}
   */
  toXMLElement() {
    super.create();

    this._setIDTag();

    this._setPaidAmountTag();

    this._setPaidDateTag();

    return super.xml;
  }
}

module.exports = PaymentGenericTag;
