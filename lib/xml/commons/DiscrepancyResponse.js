/**
 * @author: jldamians <jlds161089@gmail.com>
 * @description: Información del comprobante de pago que modifica
 */

"use strict";

const Element = require('./Element');

const constants = require('../../constants');

const CATALOGS = constants.catalogs,
      DOCUMENT_TYPE_CODES = constants.documentTypeCodes,
      DEBIT_NOTE_TYPE_CODES = constants.debitNoteTypeCodes,
      CREDIT_NOTE_TYPE_CODES = constants.creditNoteTypeCodes;

class DiscrepancyResponse extends Element {
  /**
   * @constructor
   * @param {String} tipoComprobante, tipo de comprobante (07-NC o 08-ND)
   * @param {String} tipoNota, tipo de NC o ND
   * @param {String} sustento, motivo o sustento
   */
  constructor(tipoComprobante, tipoNota, sustento) {
    super();

    this._tipoComprobante = tipoComprobante;
    this._tipoNota = tipoNota;
    this._sustento = sustento;
  }

  /**
   * @function
   * Verifica si el código de tipo de nota de crédito está permitido
   * @param {string} code, código de tipo de nota de crédito
   * @return {boolean}
   */
  _creditNoteTypeAllowed(code) {
    return CREDIT_NOTE_TYPE_CODES.checkCode(code);
  }

  /**
   * @function
   * Verifica si el código de tipo de nota de débito está permitido
   * @param {string} code, código de tipo de nota de débito
   * @return {boolean}
   */
  _debitNoteTypeAllowed(code) {
    return DEBIT_NOTE_TYPE_CODES.checkCode(code);
  }

  /**
   * @method
   * Configura los atributos del elemento xml en función al tipo de comprobante (07-NC o 08-ND)
   * @param {xmlbuilder} xml
   */
  _setAttributes(xml) {
    if (this._tipoComprobante === DOCUMENT_TYPE_CODES.ND) {
      if (this._debitNoteTypeAllowed(this._tipoNota) === true) {
        xml
          .att('listAgencyName', 'PE:SUNAT')
          .att('listName', CATALOGS.getText(CATALOGS.CATALOG_10))
          .att('listURI', CATALOGS.getURI(CATALOGS.CATALOG_10));
      } else {
        throw new Error(`El código de tipo de ND no existe: ${this._tipoNota}`);
      }
    } else if (this._tipoComprobante === DOCUMENT_TYPE_CODES.NC) {
      if (this._creditNoteTypeAllowed(this._tipoNota) === true) {
        xml
          .att('listAgencyName', 'PE:SUNAT')
          .att('listName', CATALOGS.getText(CATALOGS.CATALOG_09))
          .att('listURI', CATALOGS.getURI(CATALOGS.CATALOG_09));
      } else {
        throw new Error(`El código de tipo de NC no existe: ${this._tipoNota}`);
      }
    } else {
      throw new Error(`El código de tipo de CPE no corresponde a una NC o ND: ${this._tipoComprobante}`);
    }
  }

  /**
   * Código de tipo de nota de crédito o nota de débito
   * @return {xmlbuilder} xml element
   */
  _responseCode() {
    const responseCode = super.create(`${super.prefix.cbc}:ResponseCode`);

    // Configuramos los atributos en función al tipo de comprobante (NC o ND)
    this._setAttributes(responseCode);

    return responseCode
      .txt(this._tipoNota);
  }

  /**
   * Motivo o sustento
   * @return {xmlbuilder} xml element
   */
  _description() {
    const description = super.create(`${super.prefix.cbc}:Description`);

    return description
      .txt(this._sustento);
  }

  toXMLElement() {
    const discrepancyResponse = super.create(`${super.prefix.cac}:DiscrepancyResponse`);

    return discrepancyResponse
      .importDocument(this._responseCode())
      .importDocument(this._description());
  }
}

module.exports = DiscrepancyResponse;
