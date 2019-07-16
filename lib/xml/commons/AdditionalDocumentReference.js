/**
 * @author: jldamians <jlds161089@gmail.com>
 * @description: Referencia a cualquier otro documento asociado a la factura.
 * Catálogo No. 12: Códigos de Documentos Relacionados Tributarios
 */

"use strict";

const Element = require('./Element');

const constants = require('../../constants');

const CATALOGS = constants.catalogs,
      RELATED_DOCUMENT_TYPE_CODES = constants.relatedDocumentTypeCodes;

class AdditionalDocumentReference extends Element {
  constructor(tipoDocumento, numeroDocumento) {
    super();

    this._tipoDocumento = tipoDocumento;
    this._numeroDocumento = numeroDocumento;
  }

  /**
   * Valida si el código del tipo de documento relacionado está permitido
   * @param  {string} code, código del tipo de documento relacionado
   * @return {boolean}
   */
  _documentTypeAllowed(code) {
    let allowed;

    switch(code) {
      case RELATED_DOCUMENT_TYPE_CODES.FA_CORREGIR_RUC:
      case RELATED_DOCUMENT_TYPE_CODES.FA_ANTICIPO:
      case RELATED_DOCUMENT_TYPE_CODES.BV_ANTICIPO:
      case RELATED_DOCUMENT_TYPE_CODES.TICKET_SALIDA_ENAPU:
      case RELATED_DOCUMENT_TYPE_CODES.CODIGO_SCOP:
      case RELATED_DOCUMENT_TYPE_CODES.OTROS:
        allowed = true;

        break;
      default:
        allowed = false;
    }

    return allowed;
  }

  /**
   * Número de documento asociado
   * @return {xmlbuilder} xml element
   */
  _ID() {
    const ID = super.create(`${super.prefix.cbc}:ID`);

    return ID.txt(this._numeroDocumento);
  }

  /**
   * Código de tipo de documento
   * @return {xmlbuilder} xml element
   */
  _DocumentTypeCode() {
    const DocumentTypeCode = super.create(`${super.prefix.cbc}:DocumentTypeCode`);

    const isAllowedCode = this._documentTypeAllowed(this._tipoDocumento);

    if (isAllowedCode === false) {
      throw new Error(`El código de tipo de documento relacionado no existe: ${this._tipoDocumento}`);
    }

    return DocumentTypeCode
      .att('listAgencyName', 'PE:SUNAT')
      .att('listName', CATALOGS.getCatalogText(CATALOGS.CATALOG_12))
      .att('listURI', CATALOGS.CATALOG_12)
      .txt(this._tipoDocumento);
  }

  toXMLElement() {
    const AdditionalDocumentReference = super.create(`${super.prefix.cac}:AdditionalDocumentReference`);

    return AdditionalDocumentReference
      .importDocument(this._ID())
      .importDocument(this._DocumentTypeCode());
  }
}

module.exports = AdditionalDocumentReference;
