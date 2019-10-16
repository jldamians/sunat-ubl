"use strict";

const {
  TipoDocumento,
} = require('sunat-catalogs');

const CPEPago = require('./CPEPago');

class CPEFactura extends CPEPago {
  constructor(
    tipoOperacion=null,
    serie=null,
    numero=null,
    fechaEmision=null,
    horaEmision=null,
    fechaVencimiento=null,
    codMoneda=null
  ) {
    super(TipoDocumento.FA, tipoOperacion, serie, numero, fechaEmision, horaEmision, codMoneda);

    this._fechaVencimiento = fechaVencimiento;
    this._nroOrden = null;
  }

  // Getters
    get fechaVencimiento() {
      return this._fechaVencimiento;
    }
    get nroOrden() {
      return this._nroOrden;
    }

  // Methods
    /**
     * Agregar detalle a la factura
     * @param {DetalleFactura} detalle, detalle de la factura
     */
    agrDetalle(detalle) {
      // TODO: validar detalle repetidos
      this._detalle.push(detalle);
    }

    /**
     * Definir el número de la orden de compra o servicio
     * @param {String} nroOrden, número de la orden
     */
    defNroOrdenCompra(nroOrden=null) {
      this._nroOrden = nroOrden;
    }
}

module.exports = CPEFactura;
