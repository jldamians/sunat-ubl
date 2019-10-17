"use string";

const {
  TipoMoneda,
} = require('sunat-catalogs');

const DetalleRegimen = require('./DetalleRegimen');

class DetallePercepcion extends DetalleRegimen {
  constructor() {
    super(...arguments);

    this._numeroCobro = null;
    this._imptCobro = null;
    this._fechaCobro = null;
    this._codMonedaCobro = this._codMonedaVenta;
    this._imptCobrar = null;
    this._codMonedaCobrar = TipoMoneda.SOL;
    this._imptPercibido = null;
    this._fechaPercepcion = null;
    this._codMonedaPercibido = TipoMoneda.SOL;
  }

  // Getters
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
    get imptCobrar() {
      return this._imptCobrar;
    }
    get codMonedaCobrar() {
      return this._codMonedaCobrar;
    }

    // Methods
      /**
       * Definir los datos de cobro
       * @param {Number} nroCobro, número de cobro
       * @param {Number} imptCobro, importe de cobro sin percepción
       * @param {String} fechaCobro, fecha de cobro
       */
      defCobroDat(nroCobro=null, imptCobro=null, fechaCobro=null) {
        // TODO: validar el formato de la fecha de cobro
        this._numeroCobro = nroCobro;
        this._imptCobro = imptCobro;
        this._fechaCobro = fechaCobro;
      }

      /**
       * Definir los datos de percepción
       * @param {Number} imptCobrar, importe total a cobrar (neto)
       * @param {Number} imptPercibido, importe percibido
       * @param {String} fechaPercepcion, fecha de percepción
       */
      defPercepcionDat(imptCobrar=null, imptPercibido=null, fechaPercepcion=null) {
        this._imptCobrar = imptCobrar;
        this._imptPercibido = imptPercibido;
        this._fechaPercepcion = fechaPercepcion;
      }
}

module.exports = DetallePercepcion;
