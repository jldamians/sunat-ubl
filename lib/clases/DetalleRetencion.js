"use string";

const {
  TipoMoneda,
  TipoDocumento,
} = require('sunat-catalogs');

const moment = require('moment');

const TipoCambio = require('./TipoCambio'),
      ComprobanteRelacionado = require('./ComprobanteRelacionado');

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
  // Setters
    set cpe(cpe) {
      this._cpe = cpe;
    }
    set fechaPago(fechaPago) {
      this._fechaPago = fechaPago;
    }
    set numeroPago(numeroPago) {
      this._numeroPago = numeroPago;
    }
    set imptPago(imptPago) {
      this._imptPago = imptPago;
    }
    set codMonedaPago(codMonedaPago) {
      this._codMonedaPago = codMonedaPago;
    }
    set imptRetenido(imptRetenido) {
      this._imptRetenido = imptRetenido;
    }
    /*set codMonedaRetenido(codMonedaRetenido) {
      this._codMonedaRetenido = codMonedaRetenido;
    }*/
    set fechaRetencion(fechaRetencion) {
      this._fechaRetencion = fechaRetencion;
    }
    set imptPagado(imptPagado) {
      this._imptPagado = imptPagado;
    }
    /*set codMonedaPagado(codMonedaPagado) {
      this._codMonedaPagado = codMonedaPagado;
    }*/
    set tipoCambio(tipoCambio) {
      this._tipoCambio = tipoCambio;
    }

  // Métodos
    /**
     * Definir el comprobante relacionado o referenciado
     * @param {String} tipoCpe, tipo de cpe
     * @param {String} serie, serie del cpe
     * @param {Number} numero, número del cpe
     * @param {String} fechaEmision, fecha emisión del cpe
     * @param {Number} imptTotalVenta, valor total de venta del cpe
     * @param {String} codMonedaVenta
     */
    definirRef(tipoCpe=null, serie=null, numero=null, fechaEmision=null, imptTotalVenta=null, codMonedaVenta=null) {
      let ref;

      const newFechaEmision = moment(fechaEmision);

      try {
        ref = new TipoDocumento(tipoCpe);
      } catch (error) {
        // Capturamos el error lanzando si el tipo de documento es incorrecto
        throw error;
      }

      if (newFechaEmision.isValid() === false) {
        throw new Error(`La fecha de emisión "${fechaEmision}" es incorrecta`);
      }

      this._cpe = new ComprobanteRelacionado(
        ref.codigoCat, serie, numero, fechaEmision, imptTotalVenta, codMonedaVenta
      );
    }

    /**
     * Definir el tipo de cambio
     * @param {Number} tasa, tipo de cambio
     * @param {String} fecha, fecha de cambio
     */
    definirTc(tasa=null, fecha=null) {
      const existeCodMonedaOrigen = (
        this._cpe !== null && this._cpe.codMonedaVenta !== null
      );

      if (existeCodMonedaOrigen === true) {
        this._tipoCambio = new TipoCambio(
          this._cpe.codMonedaVenta, TipoMoneda.SOL, tasa, fecha
        );
      } else {
        throw new Error('No se ha definido el cpe relacionado o el tipo de moneda del mismo');
      }
    }
}

module.exports = DetalleRetencion;
