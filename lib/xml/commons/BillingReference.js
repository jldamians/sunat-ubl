/**
 * @author: jldamians <jlds161089@gmail.com>
 * @description: Información del comprobante de pago que modifica
 */

"use strict";

const Element = require('./Element');

const constants = require('../../constants');

const CATALOGS = constants.catalogs;

class BillingReference extends Element {
  /**
   * @constructor
   * @param {String} tipoComprobante, tipo de comprobante que modifica
   * @param {String} numeroComprobante, serie y número del comprobante que modifica
   */
  constructor(tipoComprobante, numeroComprobante) {
    super();

    this._tipoComprobante = tipoComprobante;
    this._numeroComprobante = numeroComprobante;
  }

  /**
   * Información del comprobante que modifica
   * @return {xmlbuilder} xml element
   */
  _invoiceDocumentReference() {
    const invoiceDocumentReference = super.create(`${super.prefix.cac}:InvoiceDocumentReference`);

    return invoiceDocumentReference
      .ele(`${super.prefix.cbc}:ID`)
        .txt(this._numeroComprobante)
      .ele(`${super.prefix.cbc}:DocumentTypeCode`)
        .att('listAgencyName', 'PE:SUNAT')
        .att('listName', CATALOGS.getName(CATALOGS.CATALOG_01))
        .att('listURI', CATALOGS.getURI(CATALOGS.CATALOG_01))
        .txt(this._tipoComprobante);
  }

  toXMLElement() {
    const billingReference = super.create(`${super.prefix.cac}:BillingReference`);

    return billingReference
      .importDocument(this._invoiceDocumentReference());
  }
}

module.exports = BillingReference;
