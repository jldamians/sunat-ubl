/**
 * Constants enumerating the charge type codes.
 * Catálogo No. 53: "Códigos de Cargos o Descuentos"
 */

"use strict";

const utils = require('../utils');

const chargeTypeCodes = {};

chargeTypeCodes[exports.DCTOS_ITEM_AFECTA_BASE_IGV_IVAP = '00'] = {
  text: 'Descuentos que afectan la base imponible del IGV/IVAP',
  indicator: false,
};
chargeTypeCodes[exports.DCTOS_ITEM_NO_AFECTA_BASE_IGV_IVAP = '01'] = {
  text: 'Descuentos que no afectan la base imponible del IGV/IVAP',
  indicator: false,
};
chargeTypeCodes[exports.DCTOS_GLOBAL_AFECTA_BASE_IGV_IVAP = '02'] = {
  text: 'Descuentos globales que afectan la base imponible del IGV/IVAP',
  indicator: false,
};
chargeTypeCodes[exports.DCTOS_GLOBAL_NO_AFECTA_BASE_IGV_IVAP = '03'] = {
  text: 'Descuentos globales que no afectan la base imponible del IGV/IVAP',
  indicator: false,
};

chargeTypeCodes[exports.CARGOS_ITEM_AFECTA_BASE_IGV_IVAP = '47'] = {
  text: 'Cargos que afectan la base imponible del IGV/IVAP',
  indicator: true,
};
chargeTypeCodes[exports.CARGOS_ITEM_NO_AFECTA_BASE_IGV_IVAP = '48'] = {
  text: 'Cargos que no afectan la base imponible del IGV/IVAP',
  indicator: true,
};
chargeTypeCodes[exports.CARGOS_GLOBAL_AFECTA_BASE_IGV_IVAP = '49'] = {
  text: 'Cargos globales que afectan la base imponible del IGV/IVAP',
  indicator: true,
};
chargeTypeCodes[exports.CARGOS_GLOBAL_NO_AFECTA_BASE_IGV_IVAP = '50'] = {
  text: 'Cargos globales que no afectan la base imponible del IGV/IVAP',
  indicator: true,
};

/**
 * Comprobar la existencia del código de tipo de cargo o descuento
 * @param {string} code, código de tipo de cargo o descuento
 * @return {boolean}
 */
function checkCode(code) {
  const hasOwnProperty = utils.hasOwnProperty(chargeTypeCodes, code);

  if (hasOwnProperty === true) {
    return true;
  } else {
    return false;
  }
}

/**
 * Obtener la información del tipo de cargo o descuento
 * @param {String} chargeTypeCode, código del tipo de cargo o descuento
 * @param {String} fieldName, nombre del campo requerido
 * @return {String}
 */
function _getInfo(chargeTypeCode, fieldName) {
  const checking = checkCode(chargeTypeCode);

  if (checking === true) {
    return chargeTypeCodes[chargeTypeCode][fieldName];
  } else {
    throw new Error(`Catálogo Nro. 53, el código de tipo de cargo o descuento no existe: ${chargeTypeCode}`);
  }
}

/**
 * Obtener la descripción del tipo de cargo o descuento
 * @param {string} chargeTypeCode, código de tipo de cargo o descuento
 * @return {string}
 */
function getText(chargeTypeCode) {
  return _getInfo(chargeTypeCode, 'text');
}

/**
 * Obtener el indicador del tipo de cargo o descuento
 * @param {string} chargeTypeCode, código de tipo de cargo o descuento
 * @return {string}
 */
function getIndicator(chargeTypeCode) {
  return _getInfo(chargeTypeCode, 'indicator');
}

exports = {
  checkCode,
  getText,
  getIndicator,
};
