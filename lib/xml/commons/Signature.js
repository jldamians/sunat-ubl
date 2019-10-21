/**
 * @author: jldamians <jlds161089@gmail.com>
 * @description: Utilizado para identificar al firmante y otro tipo de información relacionada
 * con el mismo. Su uso se da principalmente para especificar la ubicación de la firma
 * electrónica ya sea que este embebida (dentro del mensaje) o desacoplada.
 */

"use strict";

const pick = require('lodash.pick');

const constants = require('../../constants');

const Element = require('../Element'),
      PartyGenericTag = require('./PartyGenericTag');

const XMLNS = constants.xmlns;

class Signature extends Element {
  constructor(uri=null, id=null, firmante=null, prefix=null, ublVersion=null) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}Signature`;

    super(xmlName, prefix, ublVersion);

    this._uri = uri;
    this._id = id;
    this._firmante = firmante;
  }

  /**
   * Agregar identificador de la firma
   * @return {xmlbuilder} xml element
   */
  _setIDTag() {
    // Definición UBL: An identifier for this signature
    super.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
        .txt(`Sign-${this._id}`);
  }

  /**
   * Información asociada con la parte firmante
   * @return {xmlbuilder} xml element
   */
  _setSignatoryPartyTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const signatoryPartyTag = new PartyGenericTag(this._firmante, prefix, 'SignatoryParty', super.ublVersion);

    super.xml.importDocument(signatoryPartyTag.toXMLElement());
  }

  /**
   * Referencia a la firma del documento
   * @return {xmlbuilder} xml element
   */
  _setDigitalSignatureAttachmentTag() {
    super.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cac)}DigitalSignatureAttachment`)
        .ele(`${XMLNS.getPrefix(super.prefix.cac)}ExternalReference`)
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}URI`)
            .txt(`#Signature-${this._uri}`);
  }

  toXMLElement() {
    super.create();

    this._setIDTag();

    this._setSignatoryPartyTag();

    this._setDigitalSignatureAttachmentTag();

    return super.xml;
  }
}

module.exports = Signature;
