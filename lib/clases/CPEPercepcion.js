"use strict";

const {
  TipoMoneda,
  TipoDocumento,
} = require('sunat-catalogs');

const CPERegimen = require('./CPERegimen'),
      TipoCambio = require('./TipoCambio'),
      DetallePercepcion = require('./DetallePercepcion'),
      ComprobanteRelacionado = require('./ComprobanteRelacionado');

class CPEPercepcion extends CPERegimen {
  /**
   * @constructor
   * @param {String} serie, serie del cpe
   * @param {Number} numero, número del cpe
   * @param {String} fechaEmision, fecha de emisión del cpe
   * @param {String} horaEmision, hora de emisión del cpe
   */
  constructor(
    tipoRegimen=null,
    serie=null,
    numero=null,
    fechaEmision=null,
    horaEmision=null
  ) {
    super(TipoDocumento.CPEP, tipoRegimen, serie, numero, fechaEmision, horaEmision);

    this._imptTotalPercibido = null;
    this._imptTotalCobrado = null;
  }

  // Getters
    get imptTotalPercibido() {
      return this._imptTotalPercibido;
    }
    get imptTotalCobrado() {
      return this._imptTotalCobrado;
    }

  // Methods
    defImptPercibidoTot(importe=null) {
      this._imptTotalPercibido = importe;
    }

    defImptCobradoTot(importe=null) {
      this._imptTotalCobrado = importe;
    }

    /**
     * Agregar detalle
     * @param {String} tipoCpeRef, tipo de documento relacionado
     * @param {String} serieRef, serie del documento relacionado
     * @param {Number} numeroRef, número del documento relacionado
     * @param {String} fechaEmisionRef, fecha de emisión del documento relacionado
     * @param {Number} imptTotalVentaRef, importe total del documento relacionado
     * @param {String} codMonedaVentaRef, tipo de moneda del documento relacionado
     * @param {String} fechaCobro, fecha de cobro
     * @param {Number} numeroCobro, número de cobro
     * @param {Number} imptCobro, importe de cobro sin percepción
     * @param {Number} imptPercibido, importe percibido
     * @param {String} fechaPercepcion, fecha de percepción
     * @param {Number} imptCobrado, importe total a cobrar (neto)
     * @param {String} codMonedaOrigen, moneda de origen para el tipo de cambio
     * @param {String} codMonedaDestino, moneda de detino para el tipo de cambio
     * @param {Number} tasaCambio, tipo de cambio
     * @param {String} fechaCambio, fecha de tipo de cambio
     */
    agregarDet(
      tipoCpeRef=null,
      serieRef=null,
      numeroRef=null,
      fechaEmisionRef=null,
      imptTotalVentaRef=null,
      codMonedaVentaRef=null,
      fechaCobro=null,
      numeroCobro=null,
      imptCobro=null,
      imptPercibido=null,
      fechaPercepcion=null,
      imptCobrado=null,
      codMonedaOrigen=null,
      codMonedaDestino=null,
      tasaCambio=null,
      fechaCambio=null
    ) {
      let comprobante,
          monedaOrigen,
          monedaDestino;

      try {
        comprobante = new TipoDocumento(tipoCpeRef);

        monedaOrigen = new TipoMoneda(codMonedaOrigen);

        monedaDestino = new TipoMoneda(codMonedaDestino);
      } catch(error) {
        throw error;
      }

      const ref = new ComprobanteRelacionado(
        comprobante.codigoCat,
        serieRef,
        numeroRef,
        fechaEmisionRef,
        imptTotalVentaRef,
        codMonedaVentaRef
      );

      const tc = new TipoCambio(
        monedaOrigen.codigoCat,
        monedaDestino.codigoCat,
        tasaCambio,
        fechaCambio
      );

      const det = new DetallePercepcion(
        ref,
        fechaCobro,
        numeroCobro,
        imptCobro,
        codMonedaVentaRef,
        imptPercibido,
        fechaPercepcion,
        imptCobrado,
        tc
      );

      this._detalle.push(det);
    }
}

module.exports = CPEPercepcion;
