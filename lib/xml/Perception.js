"use strict";

const pick = require('lodash.pick');

const constants = require('../constants');

const CPERegimen = require('./CPERegimen'),
      commons = require('./commons');

const XMLNS = constants.xmlns,
      VERSIONS = constants.versions;

class Perception extends CPERegimen {
  constructor(payload) {
    const prefix = pick(XMLNS, [
      'perception', 'cac', 'cbc', 'ds', 'ext', 'sac',
    ]);

    const xmlName = `${XMLNS.getPrefix(prefix.perception)}Perception`;

    super(xmlName, payload, prefix, VERSIONS.UBL_2_0, VERSIONS.CUSTOMIZATION_1_0);
  }

  _setPerceptionSystemCodeTag() {
    super.xml
      .ele(`${XMLNS.getPrefix(super.prefix.sac)}SUNATPerceptionSystemCode`)
        .txt(super.payload.tipoRegimen);
  }

  _setPerceptionPercentTag() {
    super.xml
    .ele(`${XMLNS.getPrefix(super.prefix.sac)}SUNATPerceptionPercent`)
      .txt(super.payload.tasaRegimen);
  }

  _setTotalCashedTag() {
    super.xml
    .ele(`${XMLNS.getPrefix(super.prefix.sac)}SUNATTotalCashed`)
      .att('currencyID', super.payload.codMoneda)
      .txt(super.payload.imptTotalCobrado);
  }

  _setSUNATPerceptionDocumentReferenceTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc', 'sac']);

    super.payload.detalle.forEach((detalle) => {
      const tag = new commons.DocumentReferenceGenericTag(
        detalle, prefix, 'SUNATPerceptionDocumentReference', super.ublVersion
      );

      super.xml.importDocument(tag.toXMLElement());
    });
  }

  toString() {
    super.create();

    super._setDeclarations();

    super._setNamespaces();

    super._setUBLVersionIDTag();

    super._setCustomizationIDTag();

    super._setIDTag();

    super._setIssueDateTag();

    super._setIssueTimeTag();

    this._setAgentPartyTag();

    this._setReceiverPartyTag();

    this._setPerceptionSystemCodeTag();

    this._setPerceptionPercentTag();

    this._setNoteTag();

    this._setTotalInvoiceAmountTag();

    this._setTotalCashedTag();

    this._setPayableRoundingAmountTag();

    this._setSUNATPerceptionDocumentReferenceTag();

    return super.xml.end({ pretty: true });
  }
}

module.exports = Perception;
