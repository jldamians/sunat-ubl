"use strict";

const {
  TipoMoneda,
  TipoDocumento,
} = require('sunat-catalogs');

const CPERegimen = require('./CPERegimen'),
      TipoCambio = require('./TipoCambio'),
      DetalleRetencion = require('./DetalleRetencion'),
      ComprobanteRelacionado = require('./ComprobanteRelacionado');

class CPERetencion extends CPERegimen {
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
    super(TipoDocumento.CPER, tipoRegimen, serie, numero, fechaEmision, horaEmision);

    this._imptTotalRetenido = null;
    this._imptTotalPagado = null;
  }

  // Getters
    get imptTotalRetenido() {
      return this._imptTotalRetenido;
    }
    get imptTotalPagado() {
      return this._imptTotalPagado;
    }

  // Methods
    defImptRetenidoTot(importe=null) {
      this._imptTotalRetenido = importe;
    }

    defImptPagadoTot(importe=null) {
      this._imptTotalPagado = importe;
    }

    /**
     * Agregar detalle
     * @param {String} tipoCpeRef, tipo de documento relacionado
     * @param {String} serieRef, serie del documento relacionado
     * @param {Number} numeroRef, número del documento relacionado
     * @param {String} fechaEmisionRef, fecha de emisión del documento relacionado
     * @param {Number} imptTotalVentaRef, importe total del documento relacionado
     * @param {String} codMonedaVentaRef, tipo de moneda del documento relacionado
     * @param {String} fechaPago, fecha de pago
     * @param {Number} numeroPago, número de pago
     * @param {Number} imptPago, importe de pago sin retención
     * @param {Number} imptRetenido, importe retenido
     * @param {String} fechaRetencion, fecha de retención
     * @param {Number} imptPagado, importe total a pagar (neto)
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
      fechaPago=null,
      numeroPago=null,
      imptPago=null,
      imptRetenido=null,
      fechaRetencion=null,
      imptPagado=null,
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

      const det = new DetalleRetencion(
        ref,
        fechaPago,
        numeroPago,
        imptPago,
        codMonedaVentaRef,
        imptRetenido,
        fechaRetencion,
        imptPagado,
        tc
      );

      this._detalle.push(det);
    }
}

module.exports = CPERetencion;
