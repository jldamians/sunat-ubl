/**
 * Constants enumerating the tributes type codes.
 * Catálogo No. 05: "Códigos de Tipos de Tributos y Otros Conceptos"
 */

"use strict";

const utils = require('../utils');

const tributeTypeCodes = {};

tributeTypeCodes[exports.IGV = '1000'] = {
  typeCode: 'VAT',
  name: 'IGV',
  category: 'S',
  text: 'IGV Impuesto General a las Ventas',
};
tributeTypeCodes[exports.IVAP = '1016'] = {
  typeCode: 'VAT',
  name: 'IVAP',
  category: 'S',
  text: 'Impuesto a la Venta Arroz Pilado',
};
tributeTypeCodes[exports.ISC = '2000'] = {
  typeCode: 'EXC',
  name: 'ISC',
  category: 'S',
  text: 'ISC Impuesto Selectivo al Consumo',
};
tributeTypeCodes[exports.ICBPER = '7152'] = {
  typeCode: 'OTH',
  name: 'ICBPER',
  category: 'S',
  text: 'Impuesto a la bolsa plastica',
};
tributeTypeCodes[exports.EXP = '9995'] = {
  typeCode: 'FRE',
  name: 'EXP',
  category: 'G',
  text: 'Exportación',
};
tributeTypeCodes[exports.GRA = '9996'] = {
  typeCode: 'FRE',
  name: 'GRA',
  category: 'Z',
  text: 'Gratuito',
};
tributeTypeCodes[exports.EXO = '9997'] = {
  typeCode: 'VAT',
  name: 'EXO',
  category: 'E',
  text: 'Exonerado',
};
tributeTypeCodes[exports.INA = '9998'] = {
  typeCode: 'FRE',
  name: 'INA',
  category: 'O',
  text: 'Inafecto',
};
tributeTypeCodes[exports.OTROS = '9999'] = {
  typeCode: 'OTH',
  name: 'OTROS',
  category: 'S',
  text: 'Otros tributos',
};

/**
 * Comprobar la existencia del código de tipo de tributo
 * @param {String} code, código de tipo de tributo
 * @return {Boolean}
 */
function checkCode(code) {
  const hasOwnProperty = utils.hasOwnProperty(tributeTypeCodes, code);

  if (hasOwnProperty === true) {
    return true;
  } else {
    return false;
  }
}

function _getInfo(tributeTypeCode, fieldName) {
  const checking = checkCode(tributeTypeCode);

  if (checking === true) {
    return tributeTypeCodes[tributeTypeCode][fieldName];
  } else {
    throw new Error(`Catálogo Nro. 05, el código de tipo de tributo no existe: ${tributeTypeCode}`);
  }
}

/**
 * Obtener la descripción del tipo de tributo
 * @param {String} tributeTypeCode, código de tipo de tributo
 * @return {String}
 */
function getText(tributeTypeCode) {
  return _getInfo(tributeTypeCode, 'text');
}

/**
 * Obtener el código internacional del tipo de tributo
 * @param {String} tributeTypeCode, código de tipo de tributo
 * @return {String}
 */
function getInternationalCode(tributeTypeCode) {
  return _getInfo(tributeTypeCode, 'typeCode');
}

/**
 * Obtener el nombre del tipo de tributo
 * @param {String} tributeTypeCode, código de tipo de tributo
 * @return {String}
 */
function getName(tributeTypeCode) {
  return _getInfo(tributeTypeCode, 'name');
}

/**
 * Obtener la categoría del tipo de tributo
 * @param {String} tributeTypeCode, código de tipo de tributo
 * @return {String}
 */
function getCategory(tributeTypeCode) {
  return _getInfo(tributeTypeCode, 'category');
}

exports.checkCode = checkCode;
exports.getText = getText;
exports.getName = getName;
exports.getCategory = getCategory;
exports.getInternationalCode = getInternationalCode;
