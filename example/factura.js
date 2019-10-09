"use strict";

const {
  Pais,
  TipoMoneda,
  TipoOperacion,
  TipoAfectacionIgv,
  TipoDocumentoIdentidad,
  TipoUnidadMedida,
} = require('sunat-catalogs');

const ubl = require('../lib');

const {
  CPEFactura,
  DetalleFactura,
} = ubl;

const factura = new CPEFactura(
  TipoOperacion.VENTA_INTERNA, 'F001', 1000, '2019-09-21', '10:35:15', '2019-09-30', TipoMoneda.SOL
);

factura.defEmisor(
  TipoDocumentoIdentidad.RUC,
  '20600543050',
  'FACTURACTIVA DEL PERU S.A.C.',
  'FACTURACTIVA'
);

factura.defDireccionEms(
  '150122',
  '0000',
  Pais.PERU,
  'CAL. ALFONSO UGARTE NRO. 349 INT. 201',
  'UBR. MUNICIPAL'
);

factura.defReceptor(
  TipoDocumentoIdentidad.RUC,
  '20504561292',
  'TAM CONSULTORES S.A.C.'
);

factura.defDireccionRec(
  '150115',
  Pais.PERU,
  'AV. BUENA VISTA NRO. 393 DPTO. 301',
  'UBR. SAN RAFAEL'
);

factura.defImportesTot(3777.60, 3299.68, 3777.60, 576.92);

factura.agrImpuestoIgv(3200.68, 576.12);

factura.agrImpuestoIcbper(8.00, 0.80);

// DETALLE 01
const det01 = new DetalleFactura(
  '20191001', 'TÓNER IMPRESORA', TipoUnidadMedida.UNIDAD_INTERNACIONAL, 16, 200.00, 3200.00, 576.00
);

det01.defCodUnspsc('24111503');

det01.defPrecioUnit(236.00);

det01.agrImpuestoIgv(TipoAfectacionIgv.GRAVADO_ONEROSA, 3200.00, 0.18, 576.00);

// DETALLE 02
const det02 = new DetalleFactura(
  '20191002', 'BOLSA PLÁSTICA', TipoUnidadMedida.UNIDAD_INTERNACIONAL, 8, 0.0847, 0.68, 0.92
);

det02.defCodUnspsc('24111503');

det02.defPrecioUnit(0.10);

det02.agrImpuestoIgv(TipoAfectacionIgv.GRAVADO_ONEROSA, 0.68, 0.18, 0.12);

det02.agrImpuestoIcbper(8.00, 0.10, 0.80);

factura.agrDetalle(det01);
factura.agrDetalle(det02);

const xml = ubl(factura);

console.log(xml);
