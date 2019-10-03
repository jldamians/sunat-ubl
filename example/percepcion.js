"use strict";

const {
  Pais,
  TipoMoneda,
  TipoDocumento,
  RegimenPercepcion,
  TipoDocumentoIdentidad,
} = require('sunat-catalogs');

const ubl = require('../lib');

const {
  CPEPercepcion,
} = ubl;

const regimen = new RegimenPercepcion(RegimenPercepcion.VENTA_INTERNA);

const percepcion = new CPEPercepcion('P001', 1000, '2019-01-11', '10:30:00');

percepcion.definirRgm(regimen.codigoCat, regimen.tasa(), 'Periodo 201909', 60.00, 3060.00, 0.23);

percepcion.definirEms(
  TipoDocumentoIdentidad.RUC,
  '20600543050',
  'FACTURACTIVA DEL PERU S.A.C.',
  'FACTURACTIVA'
);

percepcion.defDireccionEms(
  '150122',
  Pais.PERU,
  'CAL. ALFONSO UGARTE NRO. 349 INT. 201',
  'UBR. MUNICIPAL'
);

percepcion.definirCli(
  TipoDocumentoIdentidad.RUC,
  '20504561292',
  'TAM CONSULTORES S.A.C.',
  'TAM CONSULTORES'
);

percepcion.defDireccionCli(
  '150115',
  Pais.PERU,
  'AV. BUENA VISTA NRO. 393 DPTO. 301',
  'UBR. SAN RAFAEL'
);

percepcion.agregarDet(
  TipoDocumento.FA, // tipo cpe relacionado
  'F100', // serie cpe relacionado
  100, // número cpe relacionado
  '2019-09-01', // fecha emisión cpe relacionado
  1000.00, // importe total cpe relacionado
  TipoMoneda.DOLAR, // tipo moneda cpe relacionado

  '2019-09-01', // fecha cobro
  1, // número cobro
  1000.00, // importe de cobro sin percepción

  60.00, // importe percibido
  '2019-09-01', // fecha percepción
  3060.00, // importe total a cobrar

  TipoMoneda.DOLAR, // moneda de origen
  TipoMoneda.SOL, // moneda de destino
  3.00, // tipo de cambio
  '2019-09-01' // fecha tipo cambio
);

const xml = ubl(percepcion);

console.log(`${xml}`);

