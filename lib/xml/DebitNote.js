"use strict";

const pick = require('lodash.pick');

const {
  TipoMoneda,
} = require('sunat-catalogs');

const constants = require('../constants');

const CPE = require('./CPE');

const {
  BillingReference,
  DiscrepancyResponse,
  DespatchDocumentReference,
  AdditionalDocumentReference,
} = require('./commons');

const {
  ComprobanteDespacho,
  ComprobanteAdicional,
  ComprobanteFacturacion,
} = require('../clases');

const XMLNS = constants.xmlns,
      VERSIONS = constants.versions;

class DebitNote extends CPE {
  constructor(payload) {
    const prefix = pick(XMLNS, [
      'debit', 'cac', 'cbc', 'ccts', 'ds', 'ext', 'qdt', 'sac', 'udt', 'qdt', 'xsi',
    ]);

    const xmlName = `${XMLNS.getPrefix(prefix.debit)}DebitNote`;

    super(xmlName, payload, prefix, VERSIONS.UBL_2_1, VERSIONS.CUSTOMIZATION_2_0);
  }

  /**
   * @method
   * Agregar las etiquetas de los comprobantes de referencia
   * Comprobantes: Nota de Crédito y Nota de Débito
   */
  _setBillingReferencesTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    if (this._payload.referencias.length > 0) {
      this._payload.referencias.forEach((referencia) => {
        if (referencia instanceof ComprobanteFacturacion) {
          const tag = new BillingReference(referencia, prefix);

          super.xml.importDocument(tag.toXMLElement());
        }
      });
    }
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
   * Agregar las etiquetas de las comprobantes anexos
   * Comprobantes: Factura, Boleta, Nota de Crédito y Nota de Débito
   */
  _setAdditionalReferencesTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

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
   * Agregar las etiquetas para el tipo de nota y sustento
   * Comprobantes: Nota de Crédito y Nota de Débito
   */
  _setDiscrepancyResponseTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new DiscrepancyResponse(
      this._payload.tipoCpe, this._payload.tipoNota, this._payload.sustento, prefix
    );

    super.xml.importDocument(tag.toXMLElement());
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

    this._setDocumentCurrencyCodeTag();

    this._setDiscrepancyResponseTag();

    this._setBillingReferencesTag();

    this._setDespatchReferencesTag();

    this._setAdditionalReferencesTag();

    super._setSignatureTag();

    super._setSupplierPartyTag();

    super._setCustomerPartyTag();

    //super._setTaxTotalTag();

    //super._setLines();

    return super.xml.end({ pretty: true });
  }
}

module.exports = DebitNote;
