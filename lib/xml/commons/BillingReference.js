/**
 * @author: jldamians <jlds161089@gmail.com>
 * @description: Información del comprobante de pago que modifica
 */

"use strict";

const {
  TipoDocumento,
} = require('sunat-catalogs');

const Element = require('../Element');

const constants = require('../../constants');

const XMLNS = constants.xmlns;

class BillingReference extends Element {
  /**
   * @constructor
   * @param {ComprobanteFacturacion} cpe, información del comprobante
   * @param {Object} prefix, prefijos de los namespace
   */
  constructor(cpe, prefix) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}BillingReference`;

    super(xmlName, prefix);

    this._cpe = cpe;
  }

  /**
   * @method
   * Agregar información del comprobante que modifica
   */
  _setInvoiceDocumentReferenceTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}InvoiceDocumentReference`);

    tag.create();

    // Consignar serie y número de comprobante
    tag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
        .txt(`${this._cpe.serie}-${this._cpe.numero}`);

    // Consignar tipo de comprobante
    tag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}DocumentTypeCode`)
        .att('listAgencyName', TipoDocumento.agenciaCat)
        .att('listName', TipoDocumento.nombreCat)
        .att('listURI', TipoDocumento.uriCat)
        .txt(this._cpe.tipoCpe);

    super.xml.importDocument(tag.xml);
  }

  /**
   * @function
   * Obtener el elemento xml
   * @return {xmlbuilder}
   */
  toXMLElement() {
    super.create();

    this._setInvoiceDocumentReferenceTag();

    return super.xml;
  }
}

module.exports = BillingReference;
