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
  DetallePercepcion,
} = ubl;

const regimen = new RegimenPercepcion(RegimenPercepcion.VENTA_INTERNA);

const percepcion = new CPEPercepcion(
  regimen.codigoCat,
  'P001',
  1000,
  '2019-01-11',
  '10:30:00'
);

percepcion.defFirmante('6', '20600543050', 'FACTURACTIVA DEL PERU S.A.C. - FACTURACTIVA S.A.C.');

percepcion.defTasaRegimen(regimen.tasa());

percepcion.defObservacion('Periodo 201909');

percepcion.defImptPercibidoTot(60.00);

percepcion.defImptCobradoTot(3060.00);

percepcion.defImptRedondeo(0.23);

percepcion.defEmisor(
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

percepcion.defReceptor(
  TipoDocumentoIdentidad.RUC,
  '20504561292',
  'TAM CONSULTORES S.A.C.',
  'TAM CONSULTORES'
);

percepcion.defDireccionRec(
  '150115',
  Pais.PERU,
  'AV. BUENA VISTA NRO. 393 DPTO. 301',
  'UBR. SAN RAFAEL'
);

const det01 = new DetallePercepcion(
  TipoDocumento.FA,
  'F100',
  100,
  '2019-09-01',
  1000.00,
  TipoMoneda.DOLAR
);

det01.defCobroDat(1, 1000.00, '2019-09-01');

det01.defPercepcionDat(3060.00, 60.00, '2019-09-01');

det01.definirTc(3.00, '2019-09-01');

percepcion.agrDetalle(det01);

const xml = ubl(percepcion);

console.log(`${xml}`);

