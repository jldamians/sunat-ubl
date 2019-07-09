/**
 * Constants enumerating the xmlns.
 */

"use strict";

const utils = require('../utils');

const prefixes = {};

const SUNAT_URI = 'urn:sunat:names:specification:ubl:peru:schema:xsd';

const UBL_URI = 'urn:oasis:names:specification:ubl:schema:xsd';

prefixes[exports.DS = 'http://www.w3.org/2000/09/xmldsig#'] = 'ds';

prefixes[exports.SAC = `${SUNAT_URI}:SunatAggregateComponents-1`] = 'sac';

prefixes[exports.EXT = `${UBL_URI}:CommonExtensionComponents-2`] = 'ext';

prefixes[exports.CBC = `${UBL_URI}:CommonBasicComponents-2`] = 'cbc';

prefixes[exports.CAC = `${UBL_URI}:CommonAggregateComponents-2`] = 'cac';

prefixes[exports.DEBIT_NOTE = `${UBL_URI}:DebitNote-2`] = '';

prefixes[exports.CREDIT_NOTE = `${UBL_URI}:CreditNote-2`] = '';

prefixes[exports.INVOICE = `${UBL_URI}:Invoice-2`] = '';


exports.getPrefixText = function(URI) {
  if (utils.hasOwnProperty(prefixes, URI)) {
    return prefixes[URI];
  } else {
    throw new Error(`El URI del xmlns no existe: ${URI}`);
  }
};

