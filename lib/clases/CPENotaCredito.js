"use strict";

const { TipoDocumento } = require('sunat-catalogs');

const CPENota = require('./CPENota');

class CPENotaCredito extends CPENota{
  constructor() {
    super(TipoDocumento.NC, ...arguments);
  }
}

module.exports = CPENotaCredito;
