/**
 * Constants enumerating the affectation type codes.
 * Catálogo No. 07: "Códigos de Tipo de Afectación del IGV"
 */

"use strict";

const utils = require('../utils');

const affectationTypeCodes = {};

affectationTypeCodes[exports.GRAVADO_ONEROSA = '10'] = 'Gravado - Operación Onerosa';
affectationTypeCodes[exports.GRAVADO_PREMIO = '11'] = 'Gravado - Retiro por premio';
affectationTypeCodes[exports.GRAVADO_DONACION = '12'] = 'Gravado - Retiro por donación';
affectationTypeCodes[exports.GRAVADO_RETIRO = '13'] = 'Gravado - Retiro ';
affectationTypeCodes[exports.GRAVADO_PUBLICIDAD = '14'] = 'Gravado - Retiro por publicidad';
affectationTypeCodes[exports.GRAVADO_BONIFICACION = '15'] = 'Gravado - Bonificaciones';
affectationTypeCodes[exports.GRAVADO_ENTREGA_TRABAJADOR = '16'] = 'Gravado - Retiro por entrega a trabajadores';
affectationTypeCodes[exports.IVAP = '17'] = 'Gravado - IVAP';
affectationTypeCodes[exports.EXONERADO_ONEROSA = '20'] = 'Exonerado - Operación Onerosa';
affectationTypeCodes[exports.EXONERADO_GRATUITA = '21'] = 'Exonerado - Transferencia gratuita';
affectationTypeCodes[exports.INAFECTO_ONEROSA = '30'] = 'Inafecto - Operación Onerosa';
affectationTypeCodes[exports.INAFECTO_BONIFICA = '31'] = 'Inafecto - Retiro por Bonificación';
affectationTypeCodes[exports.INAFECTO_RETIRO = '32'] = 'Inafecto - Retiro';
affectationTypeCodes[exports.INAFECTO_MUESTRA_MEDICA = '33'] = 'Inafecto - Retiro por Muestras Médicas';
affectationTypeCodes[exports.INAFECTO_CONVENIO_COLECTIVO = '34'] = 'Inafecto - Retiro por Convenio Colectivo';
affectationTypeCodes[exports.INAFECTO_PREMIO = '35'] = 'Inafecto - Retiro por premio';
affectationTypeCodes[exports.INAFECTO_PUBLICIDAD = '36'] = 'Inafecto - Retiro por publicidad';
affectationTypeCodes[exports.INAFECTO_GRATUITA = '37'] = 'Inafecto - Transferencia gratuita';
affectationTypeCodes[exports.EXPORTACION = '40'] = 'Exportación de Bienes o Servicios';

/**
 * Comprobar la existencia del código de tipo de afectación
 * @param {string} code, código de tipo de afectación
 * @return {boolean}
 */
function checkCode(code) {
  const hasOwnProperty = utils.hasOwnProperty(affectationTypeCodes, code);

  if (hasOwnProperty === true) {
    return true;
  } else {
    return false;
  }
}

/**
 * Obtener la descripción del tipo de afectación
 * @param {string} affectationTypeCode, código de tipo afectación
 * @return {string}
 */
function getText(affectationTypeCode) {
  const checking = checkCode(affectationTypeCode);

  if (checking === true) {
    return affectationTypeCodes[affectationTypeCode];
  } else {
    throw new Error(`El código del tipo de afectación no existe: ${affectationTypeCode}`);
  }
};

exports.checkCode = checkCode;
exports.getText = getText;
