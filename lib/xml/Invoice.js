"use strict";

const pick = require('lodash.pick');

const constants = require('../constants');

const CPE = require('./CPE');

const XMLNS = constants.xmlns;

class Invoice extends CPE {
  constructor(payload) {
    const prefix = pick(XMLNS, [
      'invoice', 'cac', 'cbc', 'ccts', 'ds', 'ext', 'qdt', 'sac', 'udt', 'qdt', 'xsi',
    ]);

    const xmlName = `${XMLNS.getPrefix(prefix.invoice)}Invoice`;

    super(xmlName, payload, prefix);
  }

  toXMLElement() {
    super.create();

    super._setDeclarations();

    super._setNamespaces();

    super._setSupplierTag();

    super._setCustomerTag();

    super._setPrepaid();

    super._setTaxTotalTag();

    super._setDespatchReferencesTag();

    super._setAdditionalReferencesTag();

    super._setLinesTag();

    return super.xml;
  }
}

module.exports = Invoice;
