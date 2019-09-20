"use strict";

const pick = require('lodash.pick');

const constants = require('../constants');

const CPE = require('./CPE'),
      commons = require('./commons');

const XMLNS = constants.xmlns,
      VERSIONS = constants.versions;

class Perception extends CPE {
  constructor(payload) {
    const prefix = pick(XMLNS, [
      'perception', 'cac', 'cbc', 'ds', 'ext', 'sac',
    ]);

    const xmlName = `${XMLNS.getPrefix(prefix.perception)}Perception`;

    super(xmlName, payload, prefix, VERSIONS.UBL_2_0, VERSIONS.CUSTOMIZATION_1_0);
  }

  /**
   * @method
   * Agregar las etiquetas del emisor electrónico
   */
  _setAgentPartyTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new commons.PartyGenericTag(
      super.payload.emisor, prefix, 'AgentParty', super.ublVersion
    );

    super.xml.importDocument(tag.toXMLElement());
  }

  /**
   * @method
   * Agregar las etiquetas del cliente
   */
  _setReceiverPartyTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new commons.PartyGenericTag(
      super.payload.receptor, prefix, 'ReceiverParty', super.ublVersion
    );

    super.xml.importDocument(tag.toXMLElement());
  }

  _setPerceptionSystemCodeTag() {
    super.xml
      .ele(`${XMLNS.getPrefix(super.prefix.sac)}SUNATPerceptionSystemCode`)
        .txt(super.payload.tipoRegimen);
  }

  _setPerceptionPercentTag() {
    super.xml
    .ele(`${XMLNS.getPrefix(super.prefix.sac)}SUNATPerceptionPercent`)
      .txt(super.payload.tasa);
  }

  _setNoteTag() {
    super.xml
    .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Note`)
      .txt(super.payload.observacion);
  }

  _setTotalInvoiceAmountTag() {
    super.xml
    .ele(`${XMLNS.getPrefix(super.prefix.cbc)}TotalInvoiceAmount`)
      .att('currencyID', super.payload.codMonedaPercibido)
      .txt(super.payload.imptTotalPercibido);
  }

  _setTotalCashedTag() {
    super.xml
    .ele(`${XMLNS.getPrefix(super.prefix.sac)}SUNATTotalCashed`)
      .att('currencyID', super.payload.codMonedaCobrado)
      .txt(super.payload.imptTotalCobrado);
  }

  _setPayableRoundingAmountTag() {
    super.xml
    .ele(`${XMLNS.getPrefix(super.prefix.cbc)}PayableRoundingAmount`)
      .att('currencyID', super.payload.codMonedaRedondeo)
      .txt(super.payload.imptRedondeo);
  }

  /**
   *
   * @param {DetallePercepcion} detalle,
   */
  _setSUNATPerceptionDocumentReferenceTag(detalle) {
    const prefix = pick(super.prefix, ['cac', 'cbc', 'sac']);

    const tag = new commons.DocumentReferenceGenericTag(
      detalle, prefix, super.ublVersion
    );

    super.xml.importDocument(tag.toXMLElement());
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

    if (super.payload.observacion !== null) {
      this._setNoteTag();
    }

    this._setTotalInvoiceAmountTag();

    this._setTotalCashedTag();

    if (super.payload.imptRedondeo !== null) {
      this._setPayableRoundingAmountTag();
    }

    if (super.payload.detalle.length > 0) {
      super.payload.detalle.forEach((percepcion) => {
        this._setSUNATPerceptionDocumentReferenceTag(percepcion);
      });
    }

    return super.xml.end({ pretty: true });
  }
}

module.exports = Perception;
