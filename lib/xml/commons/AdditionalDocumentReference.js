/**
 * @author: jldamians <jlds161089@gmail.com>
 * @description: Referencia a cualquier otro documento asociado a la factura.
 * Catálogo No. 12: Códigos de Documentos Relacionados Tributarios
 */

"use strict";

const pick = require('lodash.pick');

const poo = require('../../clases'),
      constants = require('../../constants');

const Element = require('../Element');
const PartyIdentification = require('./PartyIdentification');

const XMLNS = constants.xmlns,
      CATALOGS = constants.catalogs;

class AdditionalDocumentReference extends Element {
  /**
   * @constructor
   */
  constructor(cpe, prefix) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}AdditionalDocumentReference`;

    super(xmlName, prefix);

    this._cpe = cpe;
  }

  _documentStatusCodeTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}DocumentStatusCode`);

    tag.create();

    tag.xml
      .att('listName', 'Anticipo')
      .att('listAgencyName', 'PE:SUNAT')
      .txt(this._cpe.identificador);

    return tag.xml;
  }

  _partyIdentificationTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new PartyIdentification(this._cpe._emisor, prefix);

    return tag.toXMLElement();
  }

  _setIDTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}ID`);

    tag.create();

    tag.xml.txt(`${this._cpe.serie}-${this._cpe.numero}`);

    super.xml.importDocument(tag.xml);
  }

  _setDocumentTypeCodeTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}DocumentTypeCode`);

    tag.create();

    tag.xml
      .att('listAgencyName', 'PE:SUNAT')
      .att('listName', CATALOGS.getName(CATALOGS.CATALOG_12))
      .att('listURI', CATALOGS.getURI(CATALOGS.CATALOG_12))
      .txt(this._cpe.tipo);

    super.xml.importDocument(tag.xml);
  }

  _setPrepaidTags() {
    super.xml
      .importDocument(this._documentStatusCodeTag())
      .importDocument(this._partyIdentificationTag());
  }

  toXMLElement() {
    super.create();

    this._setIDTag();

    this._setDocumentTypeCodeTag();

    if (this._cpe instanceof poo.ComprobanteAnticipo === true) {
      this._setPrepaidTags();
    }

    return super.xml;
  }
}

module.exports = AdditionalDocumentReference;
