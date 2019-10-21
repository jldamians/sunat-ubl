"use strict";

const pick = require('lodash.pick');

const constants = require('../constants');

const CPERegimen = require('./CPERegimen'),
      commons = require('./commons');

const XMLNS = constants.xmlns,
      VERSIONS = constants.versions;

class Retention extends CPERegimen {
  constructor(payload) {
    const prefix = pick(XMLNS, [
      'retention', 'cac', 'cbc', 'ds', 'ext', 'sac',
    ]);

    const xmlName = `${XMLNS.getPrefix(prefix.retention)}Retention`;

    super(xmlName, payload, prefix, VERSIONS.UBL_2_0, VERSIONS.CUSTOMIZATION_1_0);
  }

  _setRetentionSystemCodeTag() {
    super.xml
      .ele(`${XMLNS.getPrefix(super.prefix.sac)}SUNATRetentionSystemCode`)
        .txt(super.payload.tipoRegimen);
  }

  _setRetentionPercentTag() {
    super.xml
    .ele(`${XMLNS.getPrefix(super.prefix.sac)}SUNATRetentionPercent`)
      .txt(super.payload.tasaRegimen);
  }

  _setTotalPaidTag() {
    super.xml
    .ele(`${XMLNS.getPrefix(super.prefix.sac)}SUNATTotalPaid`)
      .att('currencyID', super.payload.codMoneda)
      .txt(super.payload.imptTotalPagado);
  }

  _setSUNATRetentionDocumentReferenceTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc', 'sac']);

    super.payload.detalle.forEach((detalle) => {
      const tag = new commons.DocumentReferenceGenericTag(
        detalle, prefix, 'SUNATRetentionDocumentReference', super.ublVersion
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

    super._setSignatureTag();

    super._setIDTag();

    super._setIssueDateTag();

    super._setIssueTimeTag();

    super._setAgentPartyTag();

    super._setReceiverPartyTag();

    this._setRetentionSystemCodeTag();

    this._setRetentionPercentTag();

    super._setNoteTag();

    super._setTotalInvoiceAmountTag();

    this._setTotalPaidTag();

    super._setPayableRoundingAmountTag();

    this._setSUNATRetentionDocumentReferenceTag();

    return super.xml.end({ pretty: true });
  }
}

module.exports = Retention;
