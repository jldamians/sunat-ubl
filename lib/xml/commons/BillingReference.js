/**
 * @author: jldamians <jlds161089@gmail.com>
 * @description: Información del comprobante de pago que modifica
 */

"use strict";

const Element = require('../Element');

const constants = require('../../constants');

const XMLNS = constants.xmlns,
      CATALOGS = constants.catalogs;

class BillingReference extends Element {
  /**
   * @constructor
   */
  constructor(cpe, prefix) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}BillingReference`;

    super(xmlName, prefix);

    this._cpe = cpe;
  }

  /**
   * Información del comprobante que modifica
   * @return {xmlbuilder} xml element
   */
  _setInvoiceDocumentReferenceTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}InvoiceDocumentReference`);

    tag.create();

    tag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
        .txt(`${this._cpe.serie}-${this._cpe.numero}`);

    tag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}DocumentTypeCode`)
        .att('listAgencyName', 'PE:SUNAT')
        .att('listName', CATALOGS.getName(CATALOGS.CATALOG_01))
        .att('listURI', CATALOGS.getURI(CATALOGS.CATALOG_01))
        .txt(this._cpe.tipo);

    super.xml.importDocument(tag.xml);
  }

  toXMLElement() {
    super.create();

    this._setReference();

    return super.xml;
  }
}

module.exports = BillingReference;
