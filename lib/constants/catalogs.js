/**
 * Constants enumerating the catalogs.
 */

"use strict";

const utils = require('../utils');

const catalogs = {};

catalogs[exports.CATALOG_01 = '01'] = {
  name: 'Tipo de Documento',
  text: 'Código de tipo de documento',
};

catalogs[exports.CATALOG_05 = '05'] = {
  name: 'Codigo de tributos',
  text: 'Código de tipos de tributos y otros conceptos',
};

catalogs[exports.CATALOG_06 = '06'] = {
  name: 'Documento de Identidad',
  text: 'Código de tipo de documento de identidad',
};

catalogs[exports.CATALOG_07 = '07'] = {
  name: 'Afectacion del IGV',
  text: 'Código de tipo de afectación del IGV',
};

catalogs[exports.CATALOG_09 = '09'] = {
  name: 'Tipo de nota de credito',
  text: 'Códigos de tipo de nota de crédito electrónica',
};

catalogs[exports.CATALOG_10 = '10'] = {
  name: 'Tipo de nota de debito',
  text: 'Códigos de tipo de nota de débito electrónica',
};

catalogs[exports.CATALOG_12 = '12'] = {
  name: 'Documento Relacionado',
  text: 'Código de documentos relacionados tributarios',
};

catalogs[exports.CATALOG_16 = '16'] = {
  name: 'Tipo de Precio',
  text: 'Código de tipo de precio de venta unitario',
};

catalogs[exports.CATALOG_18 = '18'] = {
  name: 'Modalidad de Transporte',
  text: 'Código de modalidad de transporte',
};

catalogs[exports.CATALOG_20 = '20'] = {
  name: 'Motivo de Traslado',
  text: 'Código de motivo de traslado',
};

catalogs[exports.CATALOG_51 = '51'] = {
  name: 'Tipo de Operacion',
  text: 'Código de tipo de operación',
};

catalogs[exports.CATALOG_53 = '53'] = {
  name: 'Cargo/descuento',
  text: 'Códigos de cargos o descuentos',
};

catalogs[exports.CATALOG_54 = '54'] = {
  name: 'Codigo de detraccion',
  text: 'Códigos de bienes y servicios sujetos a detracciones',
};

catalogs[exports.CATALOG_55 = '55'] = {
  name: 'Propiedad del item',
  text: 'Código de identificación del concepto tributario',
};

catalogs[exports.CATALOG_59 = '59'] = {
  name: 'Medio de pago',
  text: 'Medios de Pago',
};

/**
 * Comprobar la existencia del código de catálogo
 * @param {String} code, código de catálogo
 * @return {Boolean}
 */
function checkCode(code) {
  const hasOwnProperty = utils.hasOwnProperty(catalogs, code);

  if (hasOwnProperty === true) {
    return true;
  } else {
    return false;
  }
}

function _getInfo(catalogCode, fieldName = null) {
  const checking = checkCode(catalogCode);

  if (checking === true) {
    if (fieldName !== null) {
      return catalogs[catalogCode][fieldName];
    } else {
      return `urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo${catalogCode}`;
    }
  } else {
    throw new Error(`El código del catálogo no existe: ${catalogCode}`);
  }
}

/**
 * Obtener la descripción del catálogo
 * @param {String} catalogCode, código de catálogo
 * @return {String}
 */
function getText(catalogCode) {
  return _getInfo(catalogCode, 'text');
}

function getName(catalogCode) {
  return _getInfo(catalogCode, 'name');
}

function getURI(catalogCode) {
  return _getInfo(catalogCode);
}

exports = {
  checkCode,
  getText,
  getName,
  getURI,
};

exports.getCatalogText = function(catalogURI) {
  if (utils.hasOwnProperty(catalogs, catalogURI)) {
    return catalogs[catalogURI];
  } else {
    throw new Error(`El URI del catálogo no existe: ${catalogURI}`);
  }
};
