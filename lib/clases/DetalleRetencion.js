"use string";

const {
  TipoMoneda,
} = require('sunat-catalogs');

const DetalleRegimen = require('./DetalleRegimen');

class DetalleRetencion extends DetalleRegimen {
  constructor() {
    super(...arguments);

    this._numeroPago = null;
    this._imptPago = null;
    this._fechaPago = null;
    this._codMonedaPago = this._codMonedaVenta;
    this._imptPagar = null;
    this._codMonedaPagar = TipoMoneda.SOL;
    this._imptRetenido = null;
    this._fechaRetencion = null;
    this._codMonedaRetenido = TipoMoneda.SOL;
  }

  // Getters
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
    get imptPagar() {
      return this._imptPagar;
    }
    get codMonedaPagar() {
      return this._codMonedaPagar;
    }

  // Methods
    /**
     * Definir los datos de pago
     * @param {Number} nroPago, número de pago
     * @param {Number} imptPago, importe de pago sin retención
     * @param {String} fechaPago, fecha de pago
     */
    defPagoDat(nroPago=null, imptPago=null, fechaPago=null) {
      // TODO: validar el formato de la fecha de pago
      this._numeroPago = nroPago;
      this._imptPago = imptPago;
      this._fechaPago = fechaPago;
    }

    /**
     * Definir los datos de retención
     * @param {Number} imptPagar, importe total a pagar (neto)
     * @param {Number} imptRetenido, importe retenido
     * @param {String} fechaRetencion, fecha de retención
     */
    defRetencionDat(imptPagar=null, imptRetenido=null, fechaRetencion=null) {
      this._imptPagar = imptPagar;
      this._imptRetenido = imptRetenido;
      this._fechaRetencion = fechaRetencion;
    }
}

module.exports = DetalleRetencion;
