"use strict";

const {
  Pais,
  TipoMoneda,
  TipoDocumento,
  TipoOperacion,
  CargoDescuento,
  TipoUnidadMedida,
  TipoAfectacionIgv,
  DocumentoRelacionado,
  TipoDocumentoIdentidad,
} = require('sunat-catalogs');

const ubl = require('../lib');

const {
  CPEFactura,
  DetalleFactura,
} = ubl;

const factura = new CPEFactura(
  TipoOperacion.VENTA_INTERNA, // tipo de operación
  'F001', // serie
  1000, // número correlativo
  '2019-09-21', // fecha emisión
  '10:35:15', // hora emisión
  '2019-09-30', // fecha vencimiento
  TipoMoneda.SOL // tipo de moneda
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

/*factura.defImportesTot(
  3777.60, // total precio de venta
  3299.68, // total valor de venta
  3777.60, // importe total de la venta
  576.92 // monto total de tributos
);*/

// total precio de venta
factura.defImptPrecioTot(3777.60);

// total valor de venta
factura.defImptValorTot(3299.68);

// importe total de la venta
factura.defImptVentaTot(3777.60);

// monto total de tributos
factura.defImptTributoTot(576.92);

factura.agrImpuestoIgv(
  3200.68, // total valor de venta operaciones gravadas
  576.12 // monto de la sumatoria de igv o ivap
);

factura.agrImpuestoIcbper(
  8.00, // monto base
  0.80 // monto de la sumatoria
);

factura.agrComprobanteAnt(DocumentoRelacionado.FA_ANTICIPO, 'F001', 1, 1800.00, '2019-10-01');
factura.agrComprobanteAnt(DocumentoRelacionado.FA_ANTICIPO, 'F001', 2, 2100.00, '2019-10-01');

factura.agrComprobanteRel(DocumentoRelacionado.FA_CORREGIR_RUC, 'FPR2', 1);
factura.agrComprobanteRel(DocumentoRelacionado.FA_CORREGIR_RUC, 'FPR2', 2);

factura.agrComprobanteDes(TipoDocumento.GRR, 'RPR1', 1);
factura.agrComprobanteDes(TipoDocumento.GRR, 'RPR1', 2);

factura.agrComprobanteDes(TipoDocumento.GRT, 'TPR1', 1);
factura.agrComprobanteDes(TipoDocumento.GRT, 'TPR1', 2);

factura.defDescuento(CargoDescuento.DCTOS_GLOBAL_AFECTA_BASE_IGV_IVAP, 0.10, 1500.00, 150.00);

factura.defCargo(CargoDescuento.CARGOS_GLOBAL_AFECTA_BASE_IGV_IVAP, 0.05, 1500.00, 75.00);

factura.defNroOrdenCompra('0001-301');

// DETALLE 01
const det01 = new DetalleFactura(
  '20191001', // código de producto
  'TÓNER IMPRESORA', // descripción detallada
  TipoUnidadMedida.UNIDAD_INTERNACIONAL, // unidad de medida por ítem
  16, // cantidad de unidades por ítem
  200.00, // valor unitario por ítem
  3200.00, // valor de venta po ítem
  576.00 // monto total de tributos por ítem
);

det01.defCodUnspsc('24111503'); // código de producto sunat

det01.defPrecioUnit(236.00); // precio de venta unitario por ítem

det01.agrImpuestoIgv(
  TipoAfectacionIgv.GRAVADO_ONEROSA, // afectación al igv o ivap
  3200.00, // monto base
  0.18, // tasa de igv o ivap
  576.00 // monto de tributo
);

// DETALLE 02
const det02 = new DetalleFactura(
  '20191002', 'BOLSA PLÁSTICA', TipoUnidadMedida.UNIDAD_INTERNACIONAL, 8, 0.0847, 0.68, 0.92
);

det02.defCodUnspsc('24111503');

det02.defPrecioUnit(0.10);

det02.agrImpuestoIgv(
  TipoAfectacionIgv.GRAVADO_ONEROSA,
  0.68,
  0.18,
  0.12
);

det02.agrImpuestoIcbper(8.00, 0.10, 0.80);

det02.defGastosNroPlaca('ABC-123');

factura.agrDetalle(det01);
factura.agrDetalle(det02);

const xml = ubl(factura);

console.log(xml);
