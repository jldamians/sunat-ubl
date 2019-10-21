"use strict";

const {
  Pais,
  TipoMoneda,
  TipoDocumento,
  RegimenRetencion,
  TipoDocumentoIdentidad,
} = require('sunat-catalogs');

const ubl = require('../lib');

const {
  CPERetencion,
  DetalleRetencion,
} = ubl;

const regimen = new RegimenRetencion(RegimenRetencion.TASA_3);

const retencion = new CPERetencion(
  regimen.codigoCat,
  'R001',
  1000,
  '2019-01-11',
  '10:30:00'
);

retencion.defFirmante('6', '20600543050', 'FACTURACTIVA DEL PERU S.A.C. - FACTURACTIVA S.A.C.');

retencion.defTasaRegimen(regimen.tasa());

retencion.defObservacion('Periodo 201909');

retencion.defImptRetenidoTot(90.00);

retencion.defImptPagadoTot(2910.00);

retencion.defImptRedondeo(0.23);

retencion.defEmisor(
  TipoDocumentoIdentidad.RUC,
  '20600543050',
  'FACTURACTIVA DEL PERU S.A.C.',
  'FACTURACTIVA'
);

retencion.defDireccionEms(
  '150122',
  Pais.PERU,
  'CAL. ALFONSO UGARTE NRO. 349 INT. 201',
  'UBR. MUNICIPAL'
);

retencion.defReceptor(
  TipoDocumentoIdentidad.RUC,
  '20504561292',
  'TAM CONSULTORES S.A.C.',
  'TAM CONSULTORES'
);

retencion.defDireccionRec(
  '150115',
  Pais.PERU,
  'AV. BUENA VISTA NRO. 393 DPTO. 301',
  'UBR. SAN RAFAEL'
);

const det01 = new DetalleRetencion(
  TipoDocumento.FA, // tipo cpe relacionado
  'F100', // serie cpe relacionado
  100, // número cpe relacionado
  '2019-09-01', // fecha emisión cpe relacionado
  1000.00, // importe total cpe relacionado
  TipoMoneda.DOLAR // tipo moneda cpe relacionado
);

det01.defPagoDat(1, 1000.00, '2019-09-01');

det01.defRetencionDat(2910.00, 90.00, '2019-09-01');

det01.definirTc(3.00, '2019-09-01');

retencion.agrDetalle(det01);

const xml = ubl(retencion);

console.log(`${xml}`);

