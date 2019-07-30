/**
 * Constants enumerating the tribute concept codes.
 * Catálogo No. 55: "Códigos de Identificación del Concepto Tributario"
 */

"use strict";

const utils = require('../utils');

const tributeConceptCodes = {};

tributeConceptCodes[/*exports.DETRACCION_RH_MATRICULA_EMBARCACION = */'3001'] = 'Detracciones: Recursos Hidrobiológicos-Matrícula de la embarcación';
tributeConceptCodes[/*exports.DETRACCION_RH_NOMBRE_EMBARCACION = */'3002'] = 'Detracciones: Recursos Hidrobiológicos-Nombre de la embarcación';
tributeConceptCodes[/*exports.DETRACCION_RH_ESPECIE_VENDIDA = */'3003'] = 'Detracciones: Recursos Hidrobiológicos-Tipo de especie vendida';
tributeConceptCodes[/*exports.DETRACCION_RH_LUGAR_DESCARGA = */'3004'] = 'Detracciones: Recursos Hidrobiológicos-Lugar de descarga';
tributeConceptCodes[/*exports.DETRACCION_RH_FECHA_DESCARGA = */'3005'] = 'Detracciones: Recursos Hidrobiológicos-Fecha de descarga';
tributeConceptCodes[/*exports.DETRACCION_RH_CANTIDAD_VENDIDA = */'3006'] = 'Detracciones: Recursos Hidrobiológicos-Cantidad de especie vendida';
tributeConceptCodes['3050'] = 'Transportre Terreste - Número de asiento';
tributeConceptCodes['3051'] = 'Transporte Terrestre - Información de manifiesto de pasajeros';
tributeConceptCodes['3052'] = 'Transporte Terrestre - Número de documento de identidad del pasajero';
tributeConceptCodes['3053'] = 'Transporte Terrestre - Tipo de documento de identidad del pasajero';
tributeConceptCodes['3054'] = 'Transporte Terrestre - Nombres y apellidos del pasajero';
tributeConceptCodes['3055'] = 'Transporte Terrestre - Ciudad o lugar de destino - Ubigeo';
tributeConceptCodes['3056'] = 'Transporte Terrestre - Ciudad o lugar de destino - Dirección detallada';
tributeConceptCodes['3057'] = 'Transporte Terrestre - Ciudad o lugar de origen - Ubigeo';
tributeConceptCodes['3058'] = 'Transporte Terrestre - Ciudad o lugar de origen - Dirección detallada';
tributeConceptCodes['3059'] = 'Transporte Terrestre - Fecha de inicio programado';
tributeConceptCodes['3060'] = 'Transporte Terrestre - Hora de inicio programado';
tributeConceptCodes['4000'] = 'Beneficio Hospedajes-Paquete turístico: Código de país de emisión del pasaporte';
tributeConceptCodes['4001'] = 'Beneficio Hospedajes: Código de país de residencia del sujeto no domiciliado';
tributeConceptCodes['4002'] = 'Beneficio Hospedajes: Fecha de ingreso al país';
tributeConceptCodes['4003'] = 'Beneficio Hospedajes: Fecha de Ingreso al Establecimiento';
tributeConceptCodes['4004'] = 'Beneficio Hospedajes: Fecha de Salida del Establecimiento';
tributeConceptCodes['4005'] = 'Beneficio Hospedajes: Número de Días de Permanencia';
tributeConceptCodes['4006'] = 'Beneficio Hospedajes: Fecha de Consumo ';
tributeConceptCodes['4007'] = 'Beneficio Hospedajes-Paquete turístico: Nombres y apellidos del huesped ';
tributeConceptCodes['4008'] = 'Beneficio Hospedajes-Paquete turístico: Tipo de documento de identidad del huesped ';
tributeConceptCodes['4009'] = 'Beneficio Hospedajes-Paquete turístico: Número de documento de identidad del huesped ';
tributeConceptCodes['4030'] = 'Carta Porte Aéreo:  Lugar de origen - Código de ubigeo';
tributeConceptCodes['4031'] = 'Carta Porte Aéreo:  Lugar de origen - Dirección detallada';
tributeConceptCodes['4032'] = 'Carta Porte Aéreo:  Lugar de destino - Código de ubigeo';
tributeConceptCodes['4033'] = 'Carta Porte Aéreo:  Lugar de destino - Dirección detallada';
tributeConceptCodes['4040'] = 'BVME transporte ferroviario: Pasajero - Apellidos y Nombres';
tributeConceptCodes['4041'] = 'BVME transporte ferroviario: Pasajero - Tipo de documento de identidad';
tributeConceptCodes['4042'] = 'BVME transporte ferroviario: Servicio transporte: Ciudad o lugar de origen - Código de ubigeo';
tributeConceptCodes['4043'] = 'BVME transporte ferroviario: Servicio transporte: Ciudad o lugar de origen - Dirección detallada';
tributeConceptCodes['4044'] = 'BVME transporte ferroviario: Servicio transporte: Ciudad o lugar de destino - Código de ubigeo';
tributeConceptCodes['4045'] = 'BVME transporte ferroviario: Servicio transporte: Ciudad o lugar de destino - Dirección detallada';
tributeConceptCodes['4046'] = 'BVME transporte ferroviario: Servicio transporte:Número de asiento';
tributeConceptCodes['4047'] = 'BVME transporte ferroviario: Servicio transporte: Hora programada de inicio de viaje';
tributeConceptCodes['4048'] = 'BVME transporte ferroviario: Servicio transporte: Fecha programada de inicio de viaje';
tributeConceptCodes['4049'] = 'BVME transporte ferroviario: Pasajero - Número de documento de identidad';
tributeConceptCodes['4060'] = 'Regalía Petrolera: Decreto Supremo de aprobación del contrato';
tributeConceptCodes['4061'] = 'Regalía Petrolera: Area de contrato (Lote)';
tributeConceptCodes['4062'] = 'Regalía Petrolera: Periodo de pago - Fecha de inicio';
tributeConceptCodes['4063'] = 'Regalía Petrolera: Periodo de pago - Fecha de fin';
tributeConceptCodes['4064'] = 'Regalía Petrolera: Fecha de Pago';
tributeConceptCodes['5000'] = 'Proveedores Estado: Número de Expediente';
tributeConceptCodes['5001'] = 'Proveedores Estado: Código de Unidad Ejecutora';
tributeConceptCodes['5002'] = 'Proveedores Estado: N° de Proceso de Selección';
tributeConceptCodes['5003'] = 'Proveedores Estado: N° de Contrato';
tributeConceptCodes['5010'] = 'Numero de Placa';
tributeConceptCodes['5011'] = 'Categoria';
tributeConceptCodes['5012'] = 'Marca';
tributeConceptCodes['5013'] = 'Modelo';
tributeConceptCodes['5014'] = 'Color';
tributeConceptCodes['5015'] = 'Motor';
tributeConceptCodes['5016'] = 'Combustible';
tributeConceptCodes['5017'] = 'Form. Rodante';
tributeConceptCodes['5018'] = 'VIN';
tributeConceptCodes['5019'] = 'Serie/Chasis';
tributeConceptCodes['5020'] = 'Año fabricacion';
tributeConceptCodes['5021'] = 'Año modelo';
tributeConceptCodes['5022'] = 'Version';
tributeConceptCodes['5023'] = 'Ejes';
tributeConceptCodes['5024'] = 'Asientos';
tributeConceptCodes['5025'] = 'Pasajeros';
tributeConceptCodes['5026'] = 'Ruedas';
tributeConceptCodes['5027'] = 'Carroceria';
tributeConceptCodes['5028'] = 'Potencia';
tributeConceptCodes['5029'] = 'Cilindros';
tributeConceptCodes['5030'] = 'Ciliindrada';
tributeConceptCodes['5031'] = 'Peso Bruto';
tributeConceptCodes['5032'] = 'Peso Neto';
tributeConceptCodes['5033'] = 'Carga Util';
tributeConceptCodes['5034'] = 'Longitud';
tributeConceptCodes['5035'] = 'Altura';
tributeConceptCodes['5036'] = 'Ancho';
tributeConceptCodes['6000'] = 'Comercialización de Oro:  Código Unico Concesión Minera';
tributeConceptCodes['6001'] = 'Comercialización de Oro:  N° declaración compromiso';
tributeConceptCodes['6002'] = 'Comercialización de Oro:  N° Reg. Especial .Comerci. Oro';
tributeConceptCodes['6003'] = 'Comercialización de Oro:  N° Resolución que autoriza Planta de Beneficio';
tributeConceptCodes['6004'] = 'Comercialización de Oro: Ley Mineral (% concent. oro)';
tributeConceptCodes[exports.GTOS_RENTA_NRO_PLACA = '7000'] = 'Gastos Art. 37 Renta:  Número de Placa';
tributeConceptCodes[/*exports.CRED_HIPOTECARIO_TIPO_PRESTAMO = */'7001'] = 'Créditos Hipotecarios: Tipo de préstamo';
tributeConceptCodes[/*exports.CRED_HIPOTECARIO_PRIMERA_VIVIENDA = */'7002'] = 'Créditos Hipotecarios: Indicador de Primera Vivienda';
tributeConceptCodes[/*exports.CRED_HIPOTECARIO_PARTIDA_REGISTRAL = */'7003'] = 'Créditos Hipotecarios: Partida Registral';
tributeConceptCodes[/*exports.CRED_HIPOTECARIO_NRO_CONTRATO = */'7004'] = 'Créditos Hipotecarios: Número de contrato';
tributeConceptCodes[/*exports.CRED_HIPOTECARIO_FECHA_OTORGAMIENTO = */'7005'] = 'Créditos Hipotecarios: Fecha de otorgamiento del crédito';
tributeConceptCodes[/*exports.CRED_HIPOTECARIO_UBIGEO = */'7006'] = 'Créditos Hipotecarios: Dirección del predio - Código de ubigeo';
tributeConceptCodes[/*exports.CRED_HIPOTECARIO_DIRECCION = */'7007'] = 'Créditos Hipotecarios: Dirección del predio - Dirección completa';
tributeConceptCodes[/*exports.CRED_HIPOTECARIO_URBANIZACION = */'7008'] = 'Créditos Hipotecarios: Dirección del predio - Urbanización';
tributeConceptCodes[/*exports.CRED_HIPOTECARIO_PROVINCIA = */'7009'] = 'Créditos Hipotecarios: Dirección del predio - Provincia';
tributeConceptCodes[/*exports.CRED_HIPOTECARIO_DISTRITO = */'7010'] = 'Créditos Hipotecarios: Dirección del predio - Distrito';
tributeConceptCodes[/*exports.CRED_HIPOTECARIO_DEPARTAMENTO = */'7011'] = 'Créditos Hipotecarios: Dirección del predio - Departamento';
tributeConceptCodes[/*exports.PARTIDA_ARANCELARIA = */'7020'] = 'Partida Arancelaria';

/**
 * Comprobar la existencia del código de concepto tribuario
 * @param {string} code, código de concepto tributario
 * @return {boolean}
 */
function checkCode(code) {
  const hasOwnProperty = utils.hasOwnProperty(tributeConceptCodes, code);

  if (hasOwnProperty === true) {
    return true;
  } else {
    return false;
  }
}

/**
 * Obtener la descripción del concepto tributario
 * @param {string} tributeConceptCode, código de concepto tributario
 * @return {string}
 */
function getText(tributeConceptCode) {
  const checking = checkCode(tributeConceptCode);

  if (checking === true) {
    return tributeConceptCodes[tributeConceptCode];
  } else {
    throw new Error(`El código del concepto tributario no existe: ${tributeConceptCode}`);
  }
};

exports.checkCode = checkCode;
exports.getText = getText;
