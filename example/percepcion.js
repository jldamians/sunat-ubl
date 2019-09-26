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
  Emisor,
  Receptor,
  Direccion,
  //TipoCambio,
  CPEPercepcion,
  DetallePercepcion,
  ComprobanteRelacionado,
} = ubl;

const regimen = new RegimenPercepcion(RegimenPercepcion.VENTA_INTERNA);

const percepcion = new CPEPercepcion(
  regimen.codigoCat, 'P001', 1000, '2019-01-11', '10:30:00'
  /*, regimen.tasa(), 'Cpes Periodo 201909', 60.00, 3060.00, 0.23*/
);

percepcion.tasa = regimen.tasa();
percepcion.observacion = 'Cpes correspondientes al periodo 201909';
percepcion.imptTotalPercibido = 60.00;
percepcion.imptTotalCobrado = 3060.00;
percepcion.imptRedondeo = 0.23;

percepcion.emisor = new Emisor(
  TipoDocumentoIdentidad.RUC,
  '20600543050',
  'FACTURACTIVA DEL PERU S.A.C.',
  'FACTURACTIVA',
  new Direccion(
    '150122',
    null,
    Pais.PERU,
    'CAL. ALFONSO UGARTE NRO. 349 INT. 201',
    'UBR. MUNICIPAL'
  )
);

percepcion.receptor = new Receptor(
  TipoDocumentoIdentidad.RUC,
  '20504561292',
  'TAM CONSULTORES S.A.C.',
  'TAM CONSULTORES',
  new Direccion(
    '150115',
    null,
    Pais.PERU,
    'AV. BUENA VISTA NRO. 393 DPTO. 301',
    'UBR. SAN RAFAEL'
  )
);

/*const comprobante = new ComprobanteRelacionado(
  //TipoDocumento.FA, 'F100', 100, '2019-09-01', 1000.00, TipoMoneda.DOLAR
);

comprobante.tipoCpe = TipoDocumento.FA;
comprobante.serie = 'F100';
comprobante.numero = 1000;
comprobante.fechaEmision = '2019-09-01';
comprobante.imptTotalVenta = 1000.00;
comprobante.codMonedaVenta = TipoMoneda.DOLAR;*/

/*const cambio = new TipoCambio(
  //TipoMoneda.DOLAR, TipoMoneda.SOL, 3.00, '2019-09-01'
);

cambio.codMonedaOrigen = TipoMoneda.DOLAR;
cambio.codMonedaDestino = TipoMoneda.SOL;
cambio.tasa = 3.00;
cambio.fecha = '2019-09-01';*/

const detalle = new DetallePercepcion(
  /*comprobante, '2019-09-01', 1, 1000.00, TipoMoneda.DOLAR, 60.00, '2019-09-01', 3060.00, cambio*/
);

//detalle.cpe = comprobante;
detalle.fechaCobro = '2019-09-01';
detalle.numeroCobro = 1;
detalle.imptCobro = 1000.00;
detalle.codMonedaCobro = TipoMoneda.DOLAR;
detalle.imptPercibido = 60.00;
detalle.fechaPercepcion = '2019-09-01';
detalle.imptCobrado = 3060.00;
//detalle.tipoCambio = cambio;
detalle.definirRef(TipoDocumento.FA, 'F100', 100, '2019-09-01', 1000.00, TipoMoneda.DOLAR);
detalle.definirTc(3.00, '2019-09-01');

percepcion.agregarDet(detalle);

const xml = ubl(percepcion);

console.log(`${xml}`);

