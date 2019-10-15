"use strict";

const {
  Pais,
  TipoMoneda,
  TipoDocumento,
  TipoNotaDebito,
  DocumentoRelacionado,
  TipoDocumentoIdentidad,
} = require('sunat-catalogs');

const ubl = require('../lib');

const {
  CPENotaDebito,
} = ubl;

const debito = new CPENotaDebito(
  TipoNotaDebito.AUMENTO_VALOR,
  'F001',
  1000,
  '2019-10-15',
  '09:30:15',
  TipoMoneda.SOL
);

debito.defSustento('ANULACION DE LA OPERACION');

debito.defEmisor(
  TipoDocumentoIdentidad.RUC,
  '20600543050',
  'FACTURACTIVA DEL PERU S.A.C.',
  'FACTURACTIVA'
);

debito.defDireccionEms(
  '150122',
  '0000',
  Pais.PERU,
  'CAL. ALFONSO UGARTE NRO. 349 INT. 201',
  'UBR. MUNICIPAL'
);

debito.defReceptor(
  TipoDocumentoIdentidad.RUC,
  '20504561292',
  'TAM CONSULTORES S.A.C.'
);

debito.agrComprobanteRel(DocumentoRelacionado.FA_CORREGIR_RUC, 'FPR1', 1);

debito.agrComprobanteDes(TipoDocumento.GRR, 'RPR1', 1);

debito.agrComprobanteDes(TipoDocumento.GRT, 'TPR1', 1);

debito.agrComprobanteRef(TipoDocumento.FA, 'FPR2', 1);

debito.agrComprobanteRef(TipoDocumento.FA, 'FPR2', 2);

const xml = ubl(debito);

console.log(xml);
