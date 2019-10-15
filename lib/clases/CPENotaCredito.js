"use strict";

const { TipoDocumento } = require('sunat-catalogs');

const CPENota = require('./CPENota');

class CPENotaCredito extends CPENota{
  constructor(
    /*tipoNota=null,
    serie=null,
    numero=null,
    fechaEmision=null,
    horaEmision = null*/
  ) {
    super(TipoDocumento.NC, ...arguments/*, tipoNota, serie, numero, fechaEmision, horaEmision*/);
  }
}

module.exports = CPENotaCredito;
