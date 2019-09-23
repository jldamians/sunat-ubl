"use strict";

const { TipoMoneda, TipoDocumento } = require('sunat-catalogs');

const CPE = require('./CPE');

class CPEPercepcion extends CPE {
  /**
   * @constructor
   * @param {String} tipoRegimen, código del régimen de percepción
   * @param {String} serie, serie del cpe
   * @param {Integer} numero, número del cpe
   * @param {String} fechaEmision, fecha de emisión del cpe
   * @param {String} horaEmision, hora de emisión del cpe
   * @param {Double} tasa, tasa de percepción
   * @param {String} observacion, observaciones
   * @param {Double} imptTotalPercibido, importe total percibido
   * @param {Double} imptTotalCobrado, importe total cobrado
   * @param {Double} imptRedondeo, monto de redondeo del importe total cobrado
   */
  constructor(
    tipoRegimen=null,
    serie=null,
    numero=null,
    fechaEmision=null,
    horaEmision=null,
    tasa=null,
    observacion=null,
    imptTotalPercibido=null,
    imptTotalCobrado=null,
    imptRedondeo=null
  ) {
    super(TipoDocumento.CPEP, serie, numero, fechaEmision, horaEmision);

    this._tipoRegimen = tipoRegimen;
    this._tasa = tasa;
    this._observacion = observacion;
    this._imptTotalPercibido = imptTotalPercibido;
    this._codMonedaPercibido = TipoMoneda.SOL;
    this._imptTotalCobrado = imptTotalCobrado;
    this._codMonedaCobrado = TipoMoneda.SOL;
    this._imptRedondeo = imptRedondeo;
    this._codMonedaRedondeo = TipoMoneda.SOL;
    this._detalle = [];
  }

  // Getters
    get tipoRegimen() {
      return this._tipoRegimen;
    }
    get tasa() {
      return this._tasa;
    }
    get observacion() {
      return this._observacion;
    }
    get imptTotalPercibido() {
      return this._imptTotalPercibido;
    }
    get codMonedaPercibido() {
      return this._codMonedaPercibido;
    }
    get imptTotalCobrado() {
      return this._imptTotalCobrado;
    }
    get codMonedaCobrado() {
      return this._codMonedaCobrado;
    }
    get imptRedondeo() {
      return this._imptRedondeo;
    }
    get codMonedaRedondeo() {
      return this._codMonedaRedondeo;
    }
    get detalle() {
      return this._detalle;
    }

  // Setters
    set tipoRegimen(tipoRegimen) {
      this._tipoRegimen = tipoRegimen;
    }
    set tasa(tasa) {
      this._tasa = tasa;
    }
    set observacion(observacion) {
      this._observacion = observacion;
    }
    set imptTotalPercibido(imptTotalPercibido) {
      this._imptTotalPercibido = imptTotalPercibido;
    }
    /*set codMonedaPercibido(codMonedaPercibido) {
      this._codMonedaPercibido = codMonedaPercibido;
    }*/
    set imptTotalCobrado(imptTotalCobrado) {
      this._imptTotalCobrado = imptTotalCobrado;
    }
    /*set codMonedaCobrado(codMonedaCobrado) {
      this._codMonedaCobrado = codMonedaCobrado;
    }*/
    set imptRedondeo(imptRedondeo) {
      this._imptRedondeo = imptRedondeo;
    }
    /*set codMonedaRedondeo(codMonedaRedondeo) {
      this._codMonedaRedondeo = codMonedaRedondeo;
    }*/
    set detalle(detalle) {
      this._detalle = detalle;
    }

  // Methods
    agregarDet(det) {
      this._detalle.push(det);
    }
}

module.exports = CPEPercepcion;
