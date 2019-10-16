"use strict";

const { TipoDocumento } = require('sunat-catalogs');

const CPEPago = require('./CPEPago');

class CPEBoleta extends CPEPago {
  constructor() {
    super(TipoDocumento.BV, ...arguments);
  }
}

module.exports = CPEBoleta;
