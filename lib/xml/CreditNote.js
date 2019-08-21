"use strict";

const pick = require('lodash.pick');

const constants = require('../constants');

const CPE = require('./CPE');

const XMLNS = constants.xmlns;

class CreditNote extends CPE {
  constructor(payload) {
    const prefix = pick(XMLNS, [
      'credit', 'cac', 'cbc', 'ccts', 'ds', 'ext', 'qdt', 'sac', 'udt', 'qdt', 'xsi',
    ]);

    const xmlName = `${XMLNS.getPrefix(prefix.credit)}CreditNote`;

    super(xmlName, payload, prefix);
  }

  toString() {
    super.create();

    super._setDeclarations();

    super._setNamespaces();

    super._setSupplier();

    super._setCustomer();

    super._setTaxTotal();

    super._setBillingReferences();

    super._setDespatchReferences();

    super._setAdditionalReferences();

    super._setLines();

    return super.xml;
  }
}

module.exports = CreditNote;
