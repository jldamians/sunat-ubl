"use strict";

const pick = require('lodash.pick');

const constants = require('../constants');

const CPENote = require('./CPENote');

const XMLNS = constants.xmlns,
      VERSIONS = constants.versions;

class CreditNote extends CPENote {
  constructor(payload) {
    const prefix = pick(XMLNS, [
      'credit', 'cac', 'cbc', 'ccts', 'ds', 'ext', 'qdt', 'sac', 'udt', 'qdt', 'xsi',
    ]);

    const xmlName = `${XMLNS.getPrefix(prefix.credit)}CreditNote`;

    super(xmlName, payload, prefix, VERSIONS.UBL_2_1, VERSIONS.CUSTOMIZATION_2_0);
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

    super._setDocumentCurrencyCodeTag();

    super._setDiscrepancyResponseTag();

    super._setBillingReferencesTag();

    super._setDespatchReferencesTag();

    super._setAdditionalReferencesTag();

    super._setSupplierPartyTag();

    super._setCustomerPartyTag();

    //super._setTaxTotalTag();

    //super._setLines();

    return super.xml.end({ pretty: true });
  }
}

module.exports = CreditNote;
