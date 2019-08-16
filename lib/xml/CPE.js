"use strict";

const pick = require('lodash.pick');

const constants = require('../constants');

const commons = require('./commons'),
      Element = require('./Element');

class Invoice extends Element {
  /**
   * @constructor
   * @param {Documento} payload, información del documento
   * @param {Object} prefix, prefijos
   * @param {String} ublVersion, versión ubl del documento
   * @param {String} encodign, codificación del documento
   * @param {String} xmlVersion, versión del documento
   * @param {Boolean} standalone, declaración de documento autónomo
   */
  constructor(xmlName, payload, prefix, ublVersion = '2.1', encodign = 'ISO-8859-1', xmlVersion = '1.0', standalone = false) {
    super(xmlName, prefix);

    this._payload = payload;
    this._ublVersion = ublVersion;
    this._encodign = encodign;
    this._xmlVersion = xmlVersion;
    this._standalone = standalone;
  }

  // Getters
  get payload() {
    return this._payload;
  }

  get ublVersion() {
    return this._ublVersion;
  }

  get encodign() {
    return this._encodign;
  }

  get xmlVersion() {
    return this._xmlVersion;
  }

  get standalone() {
    return this._standalone;
  }

  // Setters
  set ublVersion(ublVersion) {
    this._ublVersion = ublVersion;
  }

  set encodign(encodign) {
    this._encodign = encodign;
  }

  /**
   * @method
   * Definir la declaración XML (vesion, encoding y standalone)
   */
  _setDeclarations() {
    super.xml.dec(this._xmlVersion, this._encodign, this._standalone);
  }

  /**
   * @method
   * Agregar espacios de nombre al XML
   */
  _setNamespaces() {
    const prefixCodes = Object.keys(this.prefix);

    prefixCodes.forEach((code) => {
      super.xml.att(constants.xmlns.getNS(code), constants.xmlns.getURI(code));
    });
  }

  /**
   * @method
   * Agregar las etiquetas de los comprobantes que se modifican
   * Comprobantes: Nota de Crédito y Nota de Débito
   */
  _setBillingReferencesTag() {
    const references = this._payload.getComprobantesFacturacion();

    const prefix = pick(super.prefix, ['cac', 'cbc']);

    references.forEach((cpe) => {
      const tag = new commons.BillingReference(cpe, prefix);

      super.xml.importDocument(tag.toXMLElement());
    });
  }

  /**
   * @method
   * Agregar las etiquetas de las guías de remisión
   * Comprobantes: Factura, Boleta, Nota de Crédito y Nota de Débito
   */
  _setDespatchReferencesTag() {
    const references = this._payload.getComprobantesDespacho();

    const prefix = pick(super.prefix, ['cac', 'cbc']);

    references.forEach((cpe) => {
      const tag = new commons.DespatchDocumentReference(cpe, prefix);

      super.xml.importDocument(tag.toXMLElement());
    });
  }

  /**
   * @method
   * Agregar las etiquetas de las comprobantes anexos
   * Comprobantes: Factura, Boleta, Nota de Crédito y Nota de Débito
   */
  _setAdditionalReferencesTag() {
    const references = this._payload.getComprobantesAdicional();

    const prefix = pick(super.prefix, ['cac', 'cbc']);

    references.forEach((cpe) => {
      const tag = new commons.AdditionalDocumentReference(cpe, prefix);

      super.xml.importDocument(tag.toXMLElement());
    });
  }

  /**
   * @method
   * Agregar las etiquetas del emisor
   * Comprobantes: Factura, Boleta, Nota de Crédito y Nota de Débito
   */
  _setSupplierTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new commons.AccountingSupplierParty(this._payload.emisor, prefix);

    super.xml.importDocument(tag.toXMLElement());
  }

  /**
   * @method
   * Agregar las etiquetas del receptor
   * Comprobantes: Factura, Boleta, Nota de Crédito y Nota de Débito
   */
  _setCustomerTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new commons.AccountingCustomerParty(this._payload.receptor, prefix);

    super.xml.importDocument(tag.toXMLElement());
  }

  /**
   * @method
   * Agregar las etiquetas de los tributos globales
   * Comprobantes: Factura, Boleta, Nota de Crédito y Nota de Débito
   */
  _setTaxTotalTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new commons.TaxTotal(this._payload.tributo, prefix);

    super.xml.importDocument(tag.toXMLElement());
  }

  /**
   * @method
   * Agregar las etiquetas del detalle
   * Comprobantes: Factura, Boleta, Nota de Crédito y Nota de Débito
   */
  _setLinesTag() {
    const details = this._payload.detalle;

    details.forEach((line) => {
      const tag = new commons.LineGenericTag(line);

      super.xml.importDocument(tag.toXMLElement());
    });
  }
}

module.exports = Invoice;
