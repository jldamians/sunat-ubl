'use strict';

module.exports = {
  invoice: {
    prefix: '',
    uri: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2'
  },
  creditNote: {
    prefix: '',
    uri: 'urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2'
  },
  debitNote: {
    prefix: '',
    uri: 'urn:oasis:names:specification:ubl:schema:xsd:DebitNote-2'
  },
  cac: {
    prefix: 'cac',
    uri: 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2'
  },
  cbc: {
    prefix: 'cbc',
    uri: 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2'
  },
  ext: {
    prefix: 'ext',
    uri: 'urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2'
  },
  sac: {
    prefix: 'sac',
    uri: 'urn:sunat:names:specification:ubl:peru:schema:xsd:SunatAggregateComponents-1'
  },
  ds: {
    prefix: 'ds',
    uri: 'http://www.w3.org/2000/09/xmldsig#'
  }
};
