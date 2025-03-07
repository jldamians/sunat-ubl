"use strict";

const pick = require('lodash.pick');

const constants = require('../../constants');

const {
  Pago,
  DetalleRetencion,
  DetallePercepcion,
} = require('../../clases');

const Element = require('../Element');
const ExchangeRateTag = require('./ExchangeRate');
const PaymentGenericTag = require('./PaymentGenericTag');

const XMLNS = constants.xmlns;

class DocumentReferenceGenericTag extends Element {
  /**
   * @constructor
   * @param {DetallePercepcion | DetalleRetencion} detalle, detalle del comprobante
   * @param {Object} prefix, prefijos de los namespace
   * @param {String} xmlName, nombre de la etiqueta xml
   * @param {String} ublVersion, versión ubl
   */
  constructor(detalle, prefix, xmlName=null, ublVersion=null) {
    const newXmlName = `${XMLNS.getPrefix(prefix.sac)}${xmlName}`;

    super(newXmlName, prefix, ublVersion);

    this._detalle = detalle;
  }

  _setIDTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}ID`);

    tag.create();

    tag.xml
      .att('schemeID', this._detalle.tipoCpe)
      .txt(`${this._detalle.serie}-${this._detalle.numero}`);

    super.xml.importDocument(tag.xml);
  }

  _setIssueDateTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}IssueDate`);

    tag.create();

    tag.xml.txt(this._detalle.fechaEmision);

    super.xml.importDocument(tag.xml);
  }

  _setTotalInvoiceAmountTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}TotalInvoiceAmount`);

    tag.create();

    tag.xml
      .att('currencyID', this._detalle.codMonedaVenta)
      .txt(this._detalle.imptTotalVenta);

    super.xml.importDocument(tag.xml);
  }

  _setPaymentTag() {
    let pago;

    const prefix = pick(super.prefix, ['cac', 'cbc']);

    if (this._detalle instanceof DetallePercepcion === true) {
      pago = new Pago(
        this._detalle.numeroCobro,
        this._detalle.fechaCobro,
        this._detalle.imptCobro,
        this._detalle.codMonedaCobro
      );
    } else if (this._detalle instanceof DetalleRetencion === true) {
      pago = new Pago(
        this._detalle.numeroPago,
        this._detalle.fechaPago,
        this._detalle.imptPago,
        this._detalle.codMonedaPago
      );
    }

    const tag = new PaymentGenericTag(pago, prefix, 'Payment', super.ublVersion);

    super.xml.importDocument(tag.toXMLElement());
  }

  _setInformationTag() {
    const tag = new Element();

    if (this._detalle instanceof DetallePercepcion === true) {
      tag.create(`${XMLNS.getPrefix(super.prefix.sac)}SUNATPerceptionInformation`);

      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.sac)}SUNATPerceptionAmount`)
          .att('currencyID', this._detalle.codMonedaPercibido)
          .txt(this._detalle.imptPercibido);

      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.sac)}SUNATPerceptionDate`)
          .txt(this._detalle.fechaPercepcion);

      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.sac)}SUNATNetTotalCashed`)
          .att('currencyID', this._detalle.codMonedaCobrar)
          .txt(this._detalle.imptCobrar);
    } else if (this._detalle instanceof DetalleRetencion === true) {
      tag.create(`${XMLNS.getPrefix(super.prefix.sac)}SUNATRetentionInformation`);

      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.sac)}SUNATRetentionAmount`)
          .att('currencyID', this._detalle.codMonedaRetenido)
          .txt(this._detalle.imptRetenido);

      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.sac)}SUNATRetentionDate`)
          .txt(this._detalle.fechaRetencion);

      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.sac)}SUNATNetTotalPaid`)
          .att('currencyID', this._detalle.codMonedaPagar)
          .txt(this._detalle.imptPagar);
    }

    if (this._detalle.tipoCambio !== null) {
      const prefix = pick(super.prefix, ['cac', 'cbc']);

      const exchangeTag = new ExchangeRateTag(this._detalle.tipoCambio, prefix, super.ublVersion);

      tag.xml.importDocument(exchangeTag.toXMLElement());
    }

    super.xml.importDocument(tag.xml);
  }

  toXMLElement() {
    super.create();

    this._setIDTag();

    this._setIssueDateTag();

    this._setTotalInvoiceAmountTag();

    this._setPaymentTag();

    this._setInformationTag();

    return super.xml;
  }
}

module.exports = DocumentReferenceGenericTag;
