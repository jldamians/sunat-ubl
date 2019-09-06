"use strict";

const pick = require('lodash.pick');

const constants = require('../constants');

const CPE = require('./CPE');

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

  toString() {
    super.create();

    super._setDeclarations();

    super._setNamespaces();

    super._setUBLVersionIDTag();

    super._setCustomizationIDTag();

    super._setIDTag();

    super._setIssueDateTag();

    super._setIssueTimeTag();

    super._setAgentPartyTag();

    super._setReceiverPartyTag();

    return super.xml.end({ pretty: true });
  }
}

module.exports = Perception;
