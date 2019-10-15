"use strict";

const pick = require('lodash.pick');

const {
  TipoMoneda,
  TipoDocumento,
  TipoOperacion,
} = require('sunat-catalogs');

const constants = require('../constants');

const CPE = require('./CPE');

const {
  PaymentGenericTag,
  DespatchDocumentReference,
  AdditionalDocumentReference,
} = require('./commons');

const {
  Pago,
  ComprobanteDespacho,
  ComprobanteAdicional,
} = require('../clases');

const XMLNS = constants.xmlns,
      VERSIONS = constants.versions;

class Invoice extends CPE {
  constructor(payload) {
    const prefix = pick(XMLNS, [
      'invoice', 'cac', 'cbc', 'ccts', 'ds', 'ext', 'qdt', 'sac', 'udt', 'qdt', 'xsi',
    ]);

    const xmlName = `${XMLNS.getPrefix(prefix.invoice)}Invoice`;

    super(xmlName, payload, prefix, VERSIONS.UBL_2_1, VERSIONS.CUSTOMIZATION_2_0);
  }

  /**
   * @method
   * Agregar las etiquetas de las guías de remisión
   * Comprobantes: Factura, Boleta, Nota de Crédito y Nota de Débito
   */
  _setDespatchReferencesTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    if (this._payload.anexos.length > 0) {
      this._payload.anexos.forEach((anexo) => {
        if (anexo instanceof ComprobanteDespacho) {
          const tag = new DespatchDocumentReference(anexo, prefix);

          super.xml.importDocument(tag.toXMLElement());
        }
      });
    }
  }

  /**
   * @method
   * Agregar las etiquetas del anticipo
   * Comprobantes: Factura y Boleta
   */
  _setPrepaid() {
    if (this._payload.anticipos.length > 0) {
      const prefix = pick(super.prefix, ['cac', 'cbc']);

      this._payload.anticipos.forEach((anticipo) => {
        const pago = new Pago(anticipo.idPago, anticipo.fechaPago, anticipo.imptAnticipo, anticipo.codMoneda);

        const tag = new PaymentGenericTag(pago, prefix, 'PrepaidPayment', super.ublVersion);

        super.xml.importDocument(tag.toXMLElement());
      });
    }
  }

  /**
   * @method
   * Agregar las etiquetas de las comprobantes anexos
   * Comprobantes: Factura, Boleta, Nota de Crédito y Nota de Débito
   */
  _setAdditionalReferencesTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    if (this._payload.anticipos.length > 0) {
      this._payload.anticipos.forEach((anticipo) => {
        const tag = new AdditionalDocumentReference(anticipo, prefix);

        super.xml.importDocument(tag.toXMLElement());
      });
    }

    if (this._payload.anexos.length > 0) {
      this._payload.anexos.forEach((anexo) => {
        if (anexo instanceof ComprobanteAdicional) {
          const tag = new AdditionalDocumentReference(anexo, prefix);

          super.xml.importDocument(tag.toXMLElement());
        }
      });
    }
  }

  /**
   * @method
   * Agregar la etiqueta de la fecha de vencimiento
   * Comprobantes: Factura
   */
  _setDueDateTag() {
    if (this._payload.fechaVencimiento !== null) {
      super.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}DueDate`)
          .txt(this._payload.fechaVencimiento);
    }
  }

  /**
   * @method
   * Agregar la etiqueta del tipo de documento y tipo de operación
   * Comprobantes: Factura y Boleta
   */
  _setInvoiceTypeCodeTag() {
    super.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}InvoiceTypeCode`)
        .att('listAgencyName', TipoDocumento.agenciaCat)
        .att('listName', TipoDocumento.nombreCat)
        .att('listURI', TipoDocumento.uriCat)
        .att('listID', this._payload.tipoOperacion)
        .att('name', TipoOperacion.nombreCat)
        .att('listSchemeURI', TipoOperacion.uriCat)
        .txt(this._payload.tipoCpe);
  }

  /**
   * @method
   * Agregar la etiqueta para el tipo de moneda
   * Comprobantes: Factura, Boleta, Nota de Crédito y Nota de Débito
   */
  _setDocumentCurrencyCodeTag() {
    super.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}DocumentCurrencyCode`)
        .att('listID', TipoMoneda.idCat)
        .att('listName', TipoMoneda.nombreCat)
        .att('listAgencyName', TipoMoneda.agenciaCat)
        .txt(this._payload.codMoneda);
  }

  /**
   * @method
   * Agregar la etiqueta con el número orden de compra
   * Comprobantes: Factura
   */
  _setOrderReferenceTag() {
    super.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cac)}OrderReference`)
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
          .txt(this._payload.nroOrden);
  }

  toString() {
    super.create();

    super._setDeclarations();

    super._setNamespaces();

    super._setUBLVersionIDTag();

    super._setCustomizationIDTag();

    super._setIDTag();

    super._setIssueDateTag();

    super._setIssueTimeTag();

    this._setDueDateTag();

    this._setInvoiceTypeCodeTag();

    super._setNoteTag();

    this._setDocumentCurrencyCodeTag();

    this._setOrderReferenceTag();

    this._setDespatchReferencesTag();

    this._setAdditionalReferencesTag();

    super._setSupplierPartyTag();

    super._setCustomerPartyTag();

    this._setPrepaid();

    super._setDiscount();

    super._setCharge();

    super._setTaxTotalTag();

    super._setLinesTag();

    return super.xml.end({ pretty: true });
  }
}

module.exports = Invoice;
