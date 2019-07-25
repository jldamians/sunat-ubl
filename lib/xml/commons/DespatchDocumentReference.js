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
  /**
   * @constructor
   * @param {string} tipoComprobante, tipo de comprobante
   * @param {string} numeroComprobante, serie y número de comprobante
   */
  constructor(tipoComprobante, numeroComprobante) {
    super();

    this._tipoComprobante = tipoComprobante;
    this._numeroComprobante = numeroComprobante;
  }

  /**
   * Valida si el código de tipo de documento está permitido
   * @param  {string} code, código de tipo de documento
   * @return {boolean}
   */
  _documentTypeAllowed(code) {
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

    return ID.txt(this._numeroComprobante);
  }

  /**
   * Código de tipo de documento
   * @return {xmlbuilder} xml element
   */
  _DocumentTypeCode() {
    const DocumentTypeCode = super.create(`${super.prefix.cbc}:DocumentTypeCode`);

    const isAllowedCode = this._documentTypeAllowed(this._tipoComprobante);

    if (isAllowedCode === false) {
      throw new Error(`El código de tipo de documento no existe: ${this._tipoComprobante}`);
    }

    return DocumentTypeCode
      .att('listAgencyName', 'PE:SUNAT')
      .att('listName', CATALOGS.getName(CATALOGS.CATALOG_01))
      .att('listURI', CATALOGS.getURI(CATALOGS.CATALOG_01))
      .txt(this._tipoComprobante);
  }

  toXMLElement() {
    const DespatchDocumentReference = super.create(`${super.prefix.cac}:DespatchDocumentReference`);

    return DespatchDocumentReference
      .importDocument(this._ID())
      .importDocument(this._DocumentTypeCode());
  }
}

module.exports = DespatchDocumentReference;
