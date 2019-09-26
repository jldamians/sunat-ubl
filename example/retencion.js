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
  Emisor,
  Receptor,
  Direccion,
  //TipoCambio,
  CPERetencion,
  DetalleRetencion,
  ComprobanteRelacionado,
} = ubl;

const regimen = new RegimenRetencion(RegimenRetencion.TASA_3);

const retention = new CPERetencion(
  regimen.codigoCat, 'R001', 1000, '2019-01-11', '10:30:00'
  /*, regimen.tasa(), 'Cpes Periodo 201909', 60.00, 3060.00, 0.23*/
);

retention.tasa = regimen.tasa();
retention.observacion = 'Cpes correspondientes al periodo 201909';
retention.imptTotalRetenido = 90.00;
retention.imptTotalPagado = 2910.00;
retention.imptRedondeo = 0.23;

retention.emisor = new Emisor(
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

retention.receptor = new Receptor(
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
comprobante.numero = 100;
comprobante.fechaEmision = '2019-09-01';
comprobante.imptTotalVenta = 1000.00;
comprobante.codMonedaVenta = TipoMoneda.DOLAR;*/

/*const cambio = new TipoCambio(
  TipoMoneda.DOLAR, TipoMoneda.SOL, 3.00, '2019-09-01'
);

cambio.codMonedaOrigen = TipoMoneda.DOLAR;
cambio.codMonedaDestino = TipoMoneda.SOL;
cambio.tasa = 3.00;
cambio.fecha = '2019-09-01';*/

const detalle = new DetalleRetencion(
  /*comprobante, '2019-09-01', 1, 1000.00, TipoMoneda.DOLAR, 90.00, '2019-09-01', 2910.00, cambio*/
);

//detalle.cpe = comprobante;
detalle.fechaPago = '2019-09-01';
detalle.numeroPago = 1;
detalle.imptPago = 1000.00;
detalle.codMonedaPago = TipoMoneda.DOLAR;
detalle.imptRetenido = 90.00;
detalle.fechaRetencion = '2019-09-01';
detalle.imptPagado = 2910.00;
//detalle.tipoCambio = cambio;
detalle.definirRef(TipoDocumento.FA, 'F100', 100, '2019-09-01', 1000.00, TipoMoneda.DOLAR);
detalle.definirTc(3.00, '2019-09-24');

retention.agregarDet(detalle);

const xml = ubl(retention);

console.log(`${xml}`);

