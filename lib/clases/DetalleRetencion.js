"use string";

const {
  TipoMoneda,
} = require('sunat-catalogs');

class DetalleRetencion {
  constructor(
    cpe=null,
    fechaPago=null,
    numeroPago=null,
    imptPago=null,
    codMonedaPago=null,
    imptRetenido=null,
    fechaRetencion=null,
    imptPagado=null,
    tipoCambio=null
  ) {
    this._cpe = cpe;
    this._fechaPago = fechaPago;
    this._numeroPago = numeroPago;
    this._imptPago = imptPago;
    this._codMonedaPago = codMonedaPago;
    this._imptRetenido = imptRetenido;
    this._codMonedaRetenido = TipoMoneda.SOL;
    this._fechaRetencion = fechaRetencion;
    this._imptPagado = imptPagado;
    this._codMonedaPagado = TipoMoneda.SOL;
    this._tipoCambio = tipoCambio;
  }

  // Getters
    get cpe() {
      return this._cpe;
    }
    get fechaPago() {
      return this._fechaPago;
    }
    get numeroPago() {
      return this._numeroPago;
    }
    get imptPago() {
      return this._imptPago;
    }
    get codMonedaPago() {
      return this._codMonedaPago;
    }
    get imptRetenido() {
      return this._imptRetenido;
    }
    get codMonedaRetenido() {
      return this._codMonedaRetenido;
    }
    get fechaRetencion() {
      return this._fechaRetencion;
    }
    get imptPagado() {
      return this._imptPagado;
    }
    get codMonedaPagado() {
      return this._codMonedaPagado;
    }
    get tipoCambio() {
      return this._tipoCambio;
    }
}

module.exports = DetalleRetencion;
