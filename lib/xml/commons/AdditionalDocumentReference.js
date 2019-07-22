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
   * @param {String} tipoComprobante, tipo de comprobante
   * @param {String} numeroComprobante, serie y número de comprobante
   * @param {String | null} identificadorPago, identificador de pago del anticipo
   * @param {String | null} tipoDocEmisor, tipo de documento del emisor del anticipo
   * @param {String | null} numDocEmisor, número de documento del emisor del anticipo
   */
  constructor(tipoComprobante, numeroComprobante, identificadorPago = null, tipoDocEmisor = null, numDocEmisor = null) {
    super();

    this._tipoComprobante = tipoComprobante;
    this._numeroComprobante = numeroComprobante;
    this._identificadorPago = identificadorPago;
    this._tipoDocEmisor = tipoDocEmisor;
    this._numDocEmisor = numDocEmisor;
  }

  /**
   * @function
   * Verifica si el código de tipo de documento relacionado está permitido
   * @param {string} code, código de tipo de documento relacionado
   * @return {boolean}
   */
  _documentTypeAllowed(code) {
    return RELATED_DOCUMENT_TYPE_CODES.checkCode(code);
  }

  /**
   * @method
   * Configura los elemento que corresponden a anticipos (02-Factura o 03-Boleta)
   * @param {xmlbuilder} xml
   */
  _setPrepaidInformation(xml) {
    const existPrepaid = (
      this._tipoDocEmisor !== null && this._numDocEmisor !== null && this._identificadorPago !== null
    );

    if (existPrepaid === true) {
      xml
        .importDocument(this._documentStatusCode())
        .importDocument(this._issuerParty());
    } else {
      throw new Error(`Completar la información del anticipo: identificador (${this._identificadorPago}), tipo de documento del emisor (${this._tipoDocEmisor}) y número de documento del emisor (${this._numDocEmisor})`);
    }
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

    switch (this._tipoComprobante) {
      case RELATED_DOCUMENT_TYPE_CODES.FA_ANTICIPO:
        regexp = regexpFA;

        break;
      case RELATED_DOCUMENT_TYPE_CODES.BV_ANTICIPO:
        regexp = regexpBV;

        break;
      default:
        regexp = regexpOT;
    }

    if (!regexp.test(this._numeroComprobante)) {
      throw new Error(`El formato de identificador del documento ${this._tipoComprobante} es incorrecto: ${this._numeroComprobante}`);
    } else {
      return ID.txt(this._numeroComprobante);
    }
  }

  /**
   * Código de tipo de documento asociado o anticipo
   * @return {xmlbuilder} xml element
   */
  _documentTypeCode() {
    const DocumentTypeCode = super.create(`${super.prefix.cbc}:DocumentTypeCode`);

    const isAllowedCode = this._documentTypeAllowed(this._tipoComprobante);

    if (isAllowedCode === false) {
      throw new Error(`El código de tipo de documento relacionado no existe: ${this._tipoComprobante}`);
    }

    return DocumentTypeCode
      .att('listAgencyName', 'PE:SUNAT')
      .att('listName', CATALOGS.getCatalogText(CATALOGS.CATALOG_12))
      .att('listURI', CATALOGS.CATALOG_12)
      .txt(this._tipoComprobante);
  }

  /**
   * Identificador del pago (anticipo)
   * @return {xmlbuilder} xml element
   */
  _documentStatusCode() {
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
  _issuerParty() {
    const newPartyIdentification = new PartyIdentification(this._tipoDocEmisor, this._numDocEmisor);

    return newPartyIdentification.toXMLElement();
  }

  toXMLElement() {
    const additionalDocumentReference = super.create(`${super.prefix.cac}:AdditionalDocumentReference`);

    const prepaidDocumentTypes = [RELATED_DOCUMENT_TYPE_CODES.FA_ANTICIPO, RELATED_DOCUMENT_TYPE_CODES.BV_ANTICIPO];

    const isPrepaidDocument = (
      prepaidDocumentTypes.includes(this._tipoComprobante)
    );

    additionalDocumentReference
      .importDocument(this._ID())
      .importDocument(this._documentTypeCode());

    if (isPrepaidDocument === true) {
      this._setPrepaidInformation(additionalDocumentReference);
    }

    return additionalDocumentReference;
  }
}

module.exports = AdditionalDocumentReference;
