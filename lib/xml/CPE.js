"use strict";

const pick = require('lodash.pick');

const constants = require('../constants');

const commons = require('./commons'),
      Element = require('./Element');

const STANDALONE = false,
      XML_VERSION = '1.0',
      XML_ENCODING = 'ISO-8859-1',
      VERSIONS = constants.versions;

class Invoice extends Element {
  /**
   * @constructor
   * @param {String} xmlName, nombre de la etiqueta xml
   * @param {Documento} payload, información del documento
   * @param {Object} prefix, prefijos
   * @param {String} ublVersion, versión ubl del documento
   * @param {String} xmlEncodign, codificación del documento
   */
  constructor(xmlName, payload, prefix, ublVersion = null, customizationVersion = null, xmlEncodign = null) {
    super(xmlName, prefix, ublVersion);

    this._payload = payload;

    if (customizationVersion === null) {
      this._customizationVersion = VERSIONS.CUSTOMIZATION_2_0;
    } else {
      this._customizationVersion = customizationVersion;
    }

    if (xmlEncodign === null) {
      this._xmlEncodign = XML_ENCODING;
    } else {
      this._xmlEncodign = xmlEncodign;
    }
  }

  // Getters
    get payload() {
      return this._payload;
    }
    get ublVersion() {
      return this._ublVersion;
    }
    get customizationVersion() {
      return this._customizationVersion;
    }
    get xmlEncodign() {
      return this._xmlEncodign;
    }

  // Setters
    set ublVersion(version) {
      this._ublVersion = version;
    }
    set customizationVersion(version) {
      this._customizationVersion = version;
    }
    set xmlEncodign(encodign) {
      this._xmlEncodign = encodign;
    }

  /**
   * @method
   * Definir la declaración XML (vesion, encoding y standalone)
   */
  _setDeclarations() {
    super.xml.dec(XML_VERSION, XML_ENCODING, STANDALONE);
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
    const prepaids = this._payload.getComprobantesAnticipo();

    const additionals = this._payload.getComprobantesAdicional();

    const references = [...prepaids, ...additionals];

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

    const tag = new commons.AccountingSupplierParty(this._payload.emisor, prefix, super.ublVersion);

    super.xml.importDocument(tag.toXMLElement());
  }

  /**
   * @method
   * Agregar las etiquetas del receptor
   * Comprobantes: Factura, Boleta, Nota de Crédito y Nota de Débito
   */
  _setCustomerTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new commons.AccountingCustomerParty(this._payload.receptor, prefix, super.ublVersion);

    super.xml.importDocument(tag.toXMLElement());
  }

  /**
   * @method
   * Agregar las etiquetas del anticipo
   * Comprobantes: Factura y Boleta
   */
  _setPrepaid() {
    const references = this._payload.getComprobantesAnticipo();

    const prefix = pick(super.prefix, ['cac', 'cbc']);

    references.forEach((cpe) => {
      const tag = new commons.PrepaidPayment(cpe, prefix);

      super.xml.importDocument(tag.toXMLElement());
    });
  }

  /**
   * @method
   * Agregar las etiquetas del descuento
   * Comprobantes: Factura y Boleta
   */
  _setDiscount() {
    if (this._payload.descuento !== null) {
      const prefix = pick(super.prefix, ['cac', 'cbc']);

      const tag = new commons.AllowanceCharge(this._payload.descuento, prefix);

      super.xml.importDocument(tag.toXMLElement());
    }
  }

  /**
   * @method
   * Agregar las etiquetas del cargo
   * Comprobantes: Factura y Boleta
   */
  _setCharge() {
    if (this._payload.cargo !== null) {
      const prefix = pick(super.prefix, ['cac', 'cbc']);

      const tag = new commons.AllowanceCharge(this._payload.cargo, prefix);

      super.xml.importDocument(tag.toXMLElement());
    }
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
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const details = this._payload.detalle;

    details.forEach((line) => {
      const tag = new commons.LineGenericTag(line, prefix);

      super.xml.importDocument(tag.toXMLElement());
    });
  }

  _setAgentPartyTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new commons.PartyGenericTag(this._payload.emisor, prefix, 'AgentParty', super.ublVersion);

    super.xml.importDocument(tag.toXMLElement());
  }

  _setReceiverPartyTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new commons.PartyGenericTag(this._payload.emisor, prefix, 'ReceiverParty', super.ublVersion);

    super.xml.importDocument(tag.toXMLElement());
  }
}

module.exports = Invoice;
