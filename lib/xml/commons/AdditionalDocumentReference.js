/**
 * @author: jldamians <jlds161089@gmail.com>
 * @description: Referencia a cualquier otro documento asociado a la factura.
 * Catálogo No. 12: Códigos de Documentos Relacionados Tributarios
 */

"use strict";

const Element = require('./Element');
const PartyIdentification = require('./PartyIdentification');

const constants = require('../../constants');

const CATALOGS = constants.catalogs,
      RELATED_DOCUMENT_TYPE_CODES = constants.relatedDocumentTypeCodes;

class AdditionalDocumentReference extends Element {
  /**
   * @constructor
   * @param {String} tipoDocumento, tipo de comprobante
   * @param {String} numeroDocumento, serie y número de comprobante
   * @param {String | null} identificadorPago, identificador de pago del anticipo
   * @param {String | null} tipoDocEmisor, tipo de documento del emisor del anticipo
   * @param {String | null} numDocEmisor, número de documento del emisor del anticipo
   */
  constructor(tipoDocumento, numeroDocumento, identificadorPago = null, tipoDocEmisor = null, numDocEmisor = null) {
    super();

    this._tipoDocumento = tipoDocumento;
    this._numeroDocumento = numeroDocumento;
    this._identificadorPago = identificadorPago;
    this._tipoDocEmisor = tipoDocEmisor;
    this._numDocEmisor = numDocEmisor;
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
   * Número de documento asociado o anticipo
   * @return {xmlbuilder} xml element
   */
  _ID() {
    const ID = super.create(`${super.prefix.cbc}:ID`);

    const regexpOT = /^(?!\s*$)[^\s]{1,30}$/;
    const regexpBV = /^(([B][0-9A-Z]{3}-[0-9]{1,8})|([0-9]{4}-[0-9]{1,8})|([E][B][0][1]-[0-9]{1,8}))$/;
    const regexpFA = /^(([F][0-9A-Z]{3}-[0-9]{1,8})|([0-9]{4}-[0-9]{1,8})|([E][0][0][1]-[0-9]{1,8}))$/;

    let regexp;

    switch (this._tipoDocumento) {
      case RELATED_DOCUMENT_TYPE_CODES.FA_ANTICIPO:
        regexp = regexpFA;

        break;
      case RELATED_DOCUMENT_TYPE_CODES.BV_ANTICIPO:
        regexp = regexpBV;

        break;
      default:
        regexp = regexpOT;
    }

    if (!regexp.test(this._numeroDocumento)) {
      throw new Error(`El formato de identificador del documento ${this._tipoDocumento} es incorrecto: ${this._numeroDocumento}`);
    } else {
      return ID.txt(this._numeroDocumento);
    }
  }

  /**
   * Código de tipo de documento asociado o anticipo
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

  /**
   * Identificador del pago (anticipo)
   * @return {xmlbuilder} xml element
   */
  _DocumentStatusCode() {
    const DocumentStatusCode = super.create(`${super.prefix.cbc}:DocumentStatusCode`);

    return DocumentStatusCode
      .att('listName', 'Anticipo')
      .att('listAgencyName', 'PE:SUNAT')
      .txt(this._identificadorPago);
  }

  /**
   * Información del emisor (anticipo)
   * @return {xmlbuilder} xml element
   */
  _IssuerParty() {
    const newPartyIdentification = new PartyIdentification(this._tipoDocEmisor, this._numDocEmisor);


    return newPartyIdentification.toXMLElement();
  }

  toXMLElement() {
    const AdditionalDocumentReference = super.create(`${super.prefix.cac}:AdditionalDocumentReference`);

    const isPrepaidDocument = (
      this._tipoDocumento === RELATED_DOCUMENT_TYPE_CODES.FA_ANTICIPO ||
      this._tipoDocumento === RELATED_DOCUMENT_TYPE_CODES.BV_ANTICIPO
    );

    AdditionalDocumentReference
      .importDocument(this._ID())
      .importDocument(this._DocumentTypeCode());

    if (isPrepaidDocument === true) {
      AdditionalDocumentReference
        .importDocument(this._DocumentStatusCode())
        .importDocument(this._IssuerParty());
    }

    return AdditionalDocumentReference;
  }
}

module.exports = AdditionalDocumentReference;
