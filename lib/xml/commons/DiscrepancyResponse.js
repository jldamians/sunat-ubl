/**
 * @author: jldamians <jlds161089@gmail.com>
 * @description: Información del comprobante de pago que modifica
 */

"use strict";

const {
  TipoDocumento,
  TipoNotaDebito,
  TipoNotaCredito,
} = require('sunat-catalogs');

const Element = require('../Element');

const constants = require('../../constants');

const XMLNS = constants.xmlns;

class DiscrepancyResponse extends Element {
  /**
   * @constructor
   * @param {String} tipoCpe, tipo de cpe (07-NC o 08-ND)
   * @param {String} tipoNota, tipo de NC o ND
   * @param {String} sustento, motivo o sustento
   * @param {Object} prefix, prefijos de los namespace
   */
  constructor(tipoCpe, tipoNota, sustento, prefix) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}DiscrepancyResponse`;

    super(xmlName, prefix);

    this._tipoCpe = tipoCpe;

    this._tipoNota = tipoNota;

    this._sustento = sustento;
  }

  /**
   * Código de tipo de nota de crédito o nota de débito
   * @return {xmlbuilder} xml element
   */
  _setResponseCodeTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}ResponseCode`);

    tag.create();

    if (this._tipoCpe === TipoDocumento.NC) {
      tag.xml
        .att('listAgencyName', TipoNotaCredito.agenciaCat)
        .att('listName', TipoNotaCredito.nombreCat)
        .att('listURI', TipoNotaCredito.uriCat);
    } else if (this._tipoCpe === TipoDocumento.ND) {
      tag.xml
        .att('listAgencyName', TipoNotaDebito.agenciaCat)
        .att('listName', TipoNotaDebito.nombreCat)
        .att('listURI', TipoNotaDebito.uriCat);
    } else {
      throw new Error(`El código de tipo de CPE no corresponde a una NC o ND: ${this._tipoCpe}`);
    }

    tag.xml.txt(this._tipoNota);

    super.xml.importDocument(tag.xml);
  }

  /**
   * Motivo o sustento
   * @return {xmlbuilder} xml element
   */
  _setDescriptionTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}Description`);

    tag.create();

    tag.xml.txt(this._sustento);

    super.xml.importDocument(tag.xml);
  }

  /**
   * @return {xmlbuilder} xml element
   */
  toXMLElement() {
    super.create();

    this._setResponseCodeTag();

    this._setDescriptionTag();

    return super.xml;
  }
}

module.exports = DiscrepancyResponse;
