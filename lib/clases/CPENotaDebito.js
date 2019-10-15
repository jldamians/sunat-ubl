"use strict";

const { TipoDocumento } = require('sunat-catalogs');

const CPENota = require('./CPENota');

class CPENotaDebito extends CPENota{
  constructor() {
    super(TipoDocumento.ND, ...arguments);
  }
}

module.exports = CPENotaDebito;
