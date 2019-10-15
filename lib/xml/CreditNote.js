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

class CreditNote extends CPE {
  constructor(payload) {
    const prefix = pick(XMLNS, [
      'credit', 'cac', 'cbc', 'ccts', 'ds', 'ext', 'qdt', 'sac', 'udt', 'qdt', 'xsi',
    ]);

    const xmlName = `${XMLNS.getPrefix(prefix.credit)}CreditNote`;

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

    super._setDeclarations();//ok

    super._setNamespaces();//ok

    super._setUBLVersionIDTag();//ok

    super._setCustomizationIDTag();//ok

    super._setIDTag();//ok

    super._setIssueDateTag();//ok

    super._setIssueTimeTag();//ok

    this._setDocumentCurrencyCodeTag();//ok

    this._setDiscrepancyResponseTag();//ok

    this._setBillingReferencesTag();//ok

    this._setDespatchReferencesTag();//ok

    this._setAdditionalReferencesTag();//ok

    super._setSupplierPartyTag();//ok

    super._setCustomerPartyTag();//ok

    //super._setTaxTotalTag();

    //super._setLines();

    return super.xml.end({ pretty: true });
  }
}

module.exports = CreditNote;
