"use strict";

const pick = require('lodash.pick');

const constants = require('../constants');

const CPE = require('./CPE'),
      commons = require('./commons');

const CPERetencion = require('../clases/CPERetencion'),
      CPEPercepcion = require('../clases/CPEPercepcion');

const XMLNS = constants.xmlns;

class Perception extends CPE {
  constructor() {
    super(...arguments);
  }

  /**
   * @method
   * Agregar las etiquetas del emisor electrónico
   * Comprobantes: Percepción y Retención
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
   * Comprobantes: Percepción y Retención
   */
  _setReceiverPartyTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tag = new commons.PartyGenericTag(
      super.payload.receptor, prefix, 'ReceiverParty', super.ublVersion
    );

    super.xml.importDocument(tag.toXMLElement());
  }

  /**
   * @method
   * Agregar la etiqueta de la observación
   * Comprobantes: Percepción y Retención
   */
  _setNoteTag() {
    if (super.payload.observacion !== null) {
      super.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Note`)
          .txt(super.payload.observacion);
    }
  }

  /**
   * @method
   * Agregar la etiqueta del importe total
   * Comprobantes: Percepción y Retención
   */
  _setTotalInvoiceAmountTag() {
    let impt;

    if (super.payload instanceof CPERetencion === true) {
      impt = super.payload.imptTotalRetenido;
    } else if (super.payload instanceof CPEPercepcion === true) {
      impt = super.payload.imptTotalPercibido;
    }

    super.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}TotalInvoiceAmount`)
        .att('currencyID', super.payload.codMoneda)
        .txt(impt);
  }

  /**
   * @method
   * Agregar la etiqueta del monto de redondeo
   * Comprobantes: Percepción y Retención
   */
  _setPayableRoundingAmountTag() {
    if (super.payload.imptRedondeo !== null) {
      super.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}PayableRoundingAmount`)
          .att('currencyID', super.payload.codMoneda)
          .txt(super.payload.imptRedondeo);
    }
  }
}

module.exports = Perception;
