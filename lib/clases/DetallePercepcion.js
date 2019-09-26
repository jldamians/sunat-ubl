"use string";

const {
  TipoMoneda,
  TipoDocumento,
} = require('sunat-catalogs');

const moment = require('moment');

const TipoCambio = require('./TipoCambio'),
      ComprobanteRelacionado = require('./ComprobanteRelacionado');

class DetallePercepcion {
  constructor(
    cpe=null,
    fechaCobro=null,
    numeroCobro=null,
    imptCobro=null,
    codMonedaCobro=null,
    imptPercibido=null,
    fechaPercepcion=null,
    imptCobrado=null,
    tipoCambio=null
  ) {
    this._cpe = cpe;
    this._fechaCobro = fechaCobro;
    this._numeroCobro = numeroCobro;
    this._imptCobro = imptCobro;
    this._codMonedaCobro = codMonedaCobro;
    this._imptPercibido = imptPercibido;
    this._codMonedaPercibido = TipoMoneda.SOL;
    this._fechaPercepcion = fechaPercepcion;
    this._imptCobrado = imptCobrado;
    this._codMonedaCobrado = TipoMoneda.SOL;
    this._tipoCambio = tipoCambio;
  }

  // Getters
    get cpe() {
      return this._cpe;
    }
    get fechaCobro() {
      return this._fechaCobro;
    }
    get numeroCobro() {
      return this._numeroCobro;
    }
    get imptCobro() {
      return this._imptCobro;
    }
    get codMonedaCobro() {
      return this._codMonedaCobro;
    }
    get imptPercibido() {
      return this._imptPercibido;
    }
    get codMonedaPercibido() {
      return this._codMonedaPercibido;
    }
    get fechaPercepcion() {
      return this._fechaPercepcion;
    }
    get imptCobrado() {
      return this._imptCobrado;
    }
    get codMonedaCobrado() {
      return this._codMonedaCobrado;
    }
    get tipoCambio() {
      return this._tipoCambio;
    }
  // Setters
    set cpe(cpe) {
      this._cpe = cpe;
    }
    set fechaCobro(fechaCobro) {
      this._fechaCobro = fechaCobro;
    }
    set numeroCobro(numeroCobro) {
      this._numeroCobro = numeroCobro;
    }
    set imptCobro(imptCobro) {
      this._imptCobro = imptCobro;
    }
    set codMonedaCobro(codMonedaCobro) {
      this._codMonedaCobro = codMonedaCobro;
    }
    set imptPercibido(imptPercibido) {
      this._imptPercibido = imptPercibido;
    }
    /*set codMonedaPercibido(codMonedaPercibido) {
      this._codMonedaPercibido = codMonedaPercibido;
    }*/
    set fechaPercepcion(fechaPercepcion) {
      this._fechaPercepcion = fechaPercepcion;
    }
    set imptCobrado(imptCobrado) {
      this._imptCobrado = imptCobrado;
    }
    /*set codMonedaCobrado(codMonedaCobrado) {
      this._codMonedaCobrado = codMonedaCobrado;
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

module.exports = DetallePercepcion;
