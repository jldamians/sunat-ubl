/**
 * @author: jldamians <jlds161089@gmail.com>
 * @description: Referencia a documentos de transporte asociados a la factura.
 * Catálogo No. 01: Código de Tipo de Documento
 */

"use strict";

const Element = require('./Element');

const constants = require('../../constants');

const CATALOGS = constants.catalogs,
      DOCUMENT_TYPE_CODES = constants.documentTypeCodes;

class DespatchDocumentReference extends Element {
  constructor(tipoDocumento, numeroDocumento) {
    super();

    this._tipoDocumento = tipoDocumento;
    this._numeroDocumento = numeroDocumento;
  }

  /**
   * Valida si el código de tipo de documento está permitido
   * @param  {string} code, código de tipo de documento
   * @return {boolean}
   */
  _allowedCode(code) {
    let allowed;

    switch(code) {
      case DOCUMENT_TYPE_CODES.GRR:
        allowed = true;

        break;
      default:
        allowed = false;
    }

    return allowed;
  }

  /**
   * Número de guía autorizado
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

    if (this._allowedCode(this._tipoDocumento) === false) {
      throw new Error(`El código de tipo de documento no existe: ${this._tipoDocumento}`);
    }

    return DocumentTypeCode
      .att('listAgencyName', 'PE:SUNAT')
      .att('listName', CATALOGS.getCatalogText(CATALOGS.CATALOG_01))
      .att('listURI', CATALOGS.CATALOG_01)
      .txt(this._tipoDocumento);
  }

  toXMLElement() {
    const DespatchDocumentReference = super.create(`${super.prefix.cac}:DespatchDocumentReference`);

    return DespatchDocumentReference
      .importDocument(this._ID())
      .importDocument(this._DocumentTypeCode());
  }
}

module.exports = DespatchDocumentReference;
