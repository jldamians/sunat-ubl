"use strict";

const pick = require('lodash.pick');

const constants = require('../constants');

const commons = require('./commons'),
      Element = require('./Element');

const Tributo = require('../clases/Tributo');

const STANDALONE = false,
      XML_VERSION = '1.0',
      XML_ENCODING = 'ISO-8859-1',
      XMLNS = constants.xmlns,
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
    super.xml.dec(XML_VERSION, this._xmlEncodign, STANDALONE);
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
   * Agregar la etiqueta de la versión UBL
   */
  _setUBLVersionIDTag() {
    super.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}UBLVersionID`)
        .txt(super.ublVersion);
  }

  /**
   * @method
   * Agregar la etiqueta de la versión de la estructura del documento
   */
  _setCustomizationIDTag() {
    super.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}CustomizationID`)
        .txt(this._customizationVersion);
  }

  /**
   * @method
   * Agregar la etiqueta de la numeración
   */
  _setIDTag() {
    super.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
        .txt(`${this._payload.serie}-${this._payload.numero}`);
  }

  /**
   * @method
   * Agregar la etiqueta de la fecha de emisión
   */
  _setIssueDateTag() {
    super.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}IssueDate`)
        .txt(this._payload.fechaEmision);
  }

  /**
   * @method
   * Agregar la etiqueta de la hora de emisión
   */
  _setIssueTimeTag() {
    if (this._payload.horaEmision) {
      super.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}IssueTime`)
          .txt(this._payload.horaEmision);
    }
  }

  /**
   * @method
   * Agregar las etiquetas de las leyendas
   * Comprobantes: Factura, Boleta, Nota de Crédito, Nota de Débito, Percepción y Retención
   */
  _setNoteTag() {
    const tagName = `${XMLNS.getPrefix(super.prefix.cbc)}Note`;

    this._payload.leyendas.forEach((leyenda) => {
      super.xml
        .ele(tagName)
          .att('languageLocaleID', leyenda.codLeyenda)
          .txt(leyenda.descripcion);
    });
  }

  /**
   * @method
   * Agregar las etiquetas del emisor
   * Comprobantes: Factura, Boleta, Nota de Crédito y Nota de Débito
   */
  _setSupplierPartyTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const supplierTag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}AccountingSupplierParty`);

    const partyTag = new commons.PartyGenericTag(
      this._payload.emisor, prefix, 'Party', super.ublVersion
    );

    supplierTag.create();

    supplierTag.xml.importDocument(partyTag.toXMLElement());

    super.xml.importDocument(supplierTag.xml);
  }

  /**
   * @method
   * Agregar las etiquetas del receptor
   * Comprobantes: Factura, Boleta, Nota de Crédito y Nota de Débito
   */
  _setCustomerPartyTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const customerTag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}AccountingCustomerParty`);

    const partyTag = new commons.PartyGenericTag(
      this._payload.receptor, prefix, 'Party', super.ublVersion
    );

    customerTag.create();

    customerTag.xml.importDocument(partyTag.toXMLElement());

    super.xml.importDocument(customerTag.xml);
  }

  /**
   * @method
   * Agregar las etiquetas del descuento
   * Comprobantes: Factura y Boleta
   */
  _setDiscount() {
    if (this._payload.descuento !== null) {
      const prefix = pick(super.prefix, ['cac', 'cbc']);

      this._payload.descuento.defCodMoneda(this._payload.codMoneda);

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

      this._payload.cargo.defCodMoneda(this._payload.codMoneda);

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

    const tributo = new Tributo(this._payload.codMoneda, this._payload.imptTotalTributo, this._payload.impuestos);

    const tag = new commons.TaxTotal(tributo, prefix);

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

    details.forEach((detalle, index) => {
      detalle.defNroOrden(index + 1);

      detalle.defCodMoneda(this._payload.codMoneda);

      const tag = new commons.LineGenericTag(detalle, prefix);

      super.xml.importDocument(tag.toXMLElement());
    });
  }
}

module.exports = Invoice;
