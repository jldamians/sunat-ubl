/**
 * @author: jldamians <jlds161089@gmail.com>
 * @description: Referencia a cualquier otro documento asociado a la factura.
 * Catálogo No. 12: Códigos de Documentos Relacionados Tributarios
 */

"use strict";

const {
  DocumentoRelacionado,
} = require('sunat-catalogs');

const {
  ComprobanteAnticipo,
} = require('../../clases');

const pick = require('lodash.pick');

const constants = require('../../constants');

const Element = require('../Element');

const PartyGenericTag = require('./PartyGenericTag');

const XMLNS = constants.xmlns;

class AdditionalDocumentReference extends Element {
  /**
   * @constructor
   * @param {ComprobanteAdicional | ComprobanteAnticipo} cpe, información del comprobante
   * @param {Object} prefix, prefijos de los namespace
   */
  constructor(cpe, prefix) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}AdditionalDocumentReference`;

    super(xmlName, prefix);

    this._cpe = cpe;
  }

  /**
   * @function
   * Crear un elemento con el identificador de pago del anticipo
   * @return {xmlbuilder}
   */
  _documentStatusCodeTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}DocumentStatusCode`);

    tag.create();

    tag.xml
      .att('listName', 'Anticipo')
      .att('listAgencyName', 'PE:SUNAT')
      .txt(this._cpe.idPago);

    return tag.xml;
  }

  /**
   * @function
   * Crear un elemento con información del emisor del anticipo
   * @return {xmlbuilder}
   */
  _issuerPartyTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new PartyGenericTag(this._cpe._emisor, prefix, 'IssuerParty', super.ublVersion);

    return tag.toXMLElement();
  }

  /**
   * @method
   * Agregar serie y número de comprobante
   */
  _setIDTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}ID`);

    tag.create();

    tag.xml.txt(`${this._cpe.serie}-${this._cpe.numero}`);

    super.xml.importDocument(tag.xml);
  }

  /**
   * @method
   * Agregar código de tipo de comprobante
   */
  _setDocumentTypeCodeTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}DocumentTypeCode`);

    tag.create();

    tag.xml
      .att('listAgencyName', DocumentoRelacionado.agenciaCat)
      .att('listName', DocumentoRelacionado.nombreCat)
      .att('listURI', DocumentoRelacionado.uriCat)
      .txt(this._cpe.tipoCpe);

    super.xml.importDocument(tag.xml);
  }

  /**
   * @method
   * Agregar identificador y emisor del anticipo
   */
  _setPrepaidTags() {
    super.xml
      .importDocument(this._documentStatusCodeTag())
      .importDocument(this._issuerPartyTag());
  }

  /**
   * @function
   * Obtener el elemento xml
   * @return {xmlbuilder}
   */
  toXMLElement() {
    super.create();

    this._setIDTag();

    this._setDocumentTypeCodeTag();

    if (this._cpe instanceof ComprobanteAnticipo === true) {
      this._setPrepaidTags();
    }

    return super.xml;
  }
}

module.exports = AdditionalDocumentReference;
