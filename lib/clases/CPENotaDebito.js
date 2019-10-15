"use strict";

const { TipoDocumento } = require('sunat-catalogs');

const CPENota = require('./CPENota');

class CPENotaDebito extends CPENota{
  constructor(
    /*tipoNota=null,
    serie=null,
    numero=null,
    fechaEmision=null,
    horaEmision = null*/
  ) {
    super(TipoDocumento.ND, ...arguments/*tipoNota, serie, numero, fechaEmision, horaEmision*/);
  }
}

module.exports = CPENotaDebito;
