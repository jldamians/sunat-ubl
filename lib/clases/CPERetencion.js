"use strict";

const { TipoMoneda, TipoDocumento } = require('sunat-catalogs');

const CPE = require('./CPE');

class CPERetencion extends CPE {
  /**
   * @constructor
   * @param {String} tipoRegimen, código del régimen de retención
   * @param {String} serie, serie del cpe
   * @param {Integer} numero, número del cpe
   * @param {String} fechaEmision, fecha de emisión del cpe
   * @param {String} horaEmision, hora de emisión del cpe
   * @param {Double} tasa, tasa de retención
   * @param {String} observacion, observaciones
   * @param {Double} imptTotalRetenido, importe total retenido
   * @param {Double} imptTotalPagado, importe total pagado
   * @param {Double} imptRedondeo, monto de redondeo del importe total pagado
   */
  constructor(
    tipoRegimen=null,
    serie=null,
    numero=null,
    fechaEmision=null,
    horaEmision=null,
    tasa=null,
    observacion=null,
    imptTotalRetenido=null,
    imptTotalPagado=null,
    imptRedondeo=null
  ) {
    super(TipoDocumento.CPER, serie, numero, fechaEmision, horaEmision);

    this._tipoRegimen = tipoRegimen;
    this._tasa = tasa;
    this._observacion = observacion;
    this._imptTotalRetenido = imptTotalRetenido;
    this._codMonedaRetenido = TipoMoneda.SOL;
    this._imptTotalPagado = imptTotalPagado;
    this._codMonedaPagado = TipoMoneda.SOL;
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
    get imptTotalRetenido() {
      return this._imptTotalRetenido;
    }
    get codMonedaRetenido() {
      return this._codMonedaRetenido;
    }
    get imptTotalPagado() {
      return this._imptTotalPagado;
    }
    get codMonedaPagado() {
      return this._codMonedaPagado;
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
    set imptTotalRetenido(imptTotalRetenido) {
      this._imptTotalRetenido = imptTotalRetenido;
    }
    /*set codMonedaRetenido(codMonedaRetenido) {
      this._codMonedaRetenido = codMonedaRetenido;
    }*/
    set imptTotalPagado(imptTotalPagado) {
      this._imptTotalPagado = imptTotalPagado;
    }
    /*set codMonedaPagado(codMonedaPagado) {
      this._codMonedaPagado = codMonedaPagado;
    }*/
    set imptRedondeo(imptRedondeo) {
      this._imptRedondeo = imptRedondeo;
    }
    /*set imptRedondeo(imptRedondeo) {
      this._imptRedondeo = imptRedondeo;
    }*/
    set detalle(detalle) {
      this._detalle = detalle;
    }

  agregarDet(det) {
    this._detalle.push(det);
  }
}

module.exports = CPERetencion;
