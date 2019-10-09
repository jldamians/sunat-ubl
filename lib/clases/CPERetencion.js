"use strict";

const {
  Ubigeos,
  TipoMoneda,
  TipoDocumento,
  RegimenRetencion,
  TipoDocumentoIdentidad,
} = require('sunat-catalogs');

const CPE = require('./CPE'),
      Emisor = require('./Emisor'),
      Receptor = require('./Receptor'),
      Direccion = require('./Direccion'),
      TipoCambio = require('./TipoCambio'),
      DetalleRetencion = require('./DetalleRetencion'),
      ComprobanteRelacionado = require('./ComprobanteRelacionado');

class CPERetencion extends CPE {
  /**
   * @constructor
   * @param {String} serie, serie del cpe
   * @param {Number} numero, número del cpe
   * @param {String} fechaEmision, fecha de emisión del cpe
   * @param {String} horaEmision, hora de emisión del cpe
   */
  constructor(
    serie=null,
    numero=null,
    fechaEmision=null,
    horaEmision=null
  ) {
    super(TipoDocumento.CPER, serie, numero, fechaEmision, horaEmision);

    this._tipoRegimen = null;
    this._tasaRegimen = null;
    this._observacion = null;

    this._imptTotalRetenido = null;
    this._codMonedaRetenido = TipoMoneda.SOL;

    this._imptTotalPagado = null;
    this._codMonedaPagado = TipoMoneda.SOL;

    this._imptRedondeo = null;
    this._codMonedaRedondeo = TipoMoneda.SOL;
  }

  // Getters
    get tipoRegimen() {
      return this._tipoRegimen;
    }
    get tasaRegimen() {
      return this._tasaRegimen;
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

  // Methods
    /**
     * Definir la información del régimen de retención
     * @param {String} tipoRegimen, tipo de régimen de retención
     * @param {Number} tasaRegimen, tasa del régimen de retención
     * @param {String} observacion, observación de la retención
     * @param {Number} imptTotalRetenido, importe total retenido
     * @param {Number} imptTotalPagado, importe total pagado
     * @param {Number} imptRedondeo, monto de redondeo
     */
    definirRgm(tipoRegimen=null, tasaRegimen=null, observacion=null, imptTotalRetenido=null, imptTotalPagado=null, imptRedondeo=null) {
      let regimen;

      try {
        regimen = new RegimenRetencion(tipoRegimen);
      } catch(error) {
        // Capturamos el error lanzado si régimen de retención es incorrecto
        throw error;
      }

      this._tipoRegimen = regimen.codigoCat;

      this._tasaRegimen = tasaRegimen; // regimen.tasa();

      this._observacion = observacion;

      this._imptTotalRetenido = imptTotalRetenido;

      this._imptTotalPagado = imptTotalPagado;

      this._imptRedondeo = imptRedondeo;
    }

    /**
     * Definir la dirección del emisor
     * @param {String} codUbigeo, código de ubigeo
     * @param {String} codPais, código de país
     * @param {String} direccion, dirección fiscal
     * @param {String} urbanizacion, urbanización
     */
    defDireccionEms(codUbigeo=null, codPais=null, direccion=null, urbanizacion=null) {
      let ubigeo;

      try {
        ubigeo = new Ubigeos(codUbigeo);
      } catch (error) {
        // Capturamos el error lanzando si el ubigeo es incorrecto
        throw error;
      }

      if (this._emisor === null) {
        throw new Error('No se ha definido la información del emisor');
      }

      this._emisor.defDireccion(ubigeo.codigoCat, null, codPais, direccion, urbanizacion);
    }

    /**
     * Definir la información del proveedor
     * @param {String} tipoDocumento, tipo de documento de identidad del proveedor
     * @param {String} numeroDocumento, número de documento de identidad del proveedor
     * @param {String} razonSocial, razón social del proveedor
     * @param {String} nombreComercial, nombre comercial del proveedor
     */
    defReceptor(tipoDocumento=null, numeroDocumento=null, razonSocial=null, nombreComercial=null) {
      let identidad;

      try {
        identidad = new TipoDocumentoIdentidad(tipoDocumento);
      } catch (error) {
        // Capturamos el error lanzando si el tipo de documento de identidad es incorrecto
        throw error;
      }

      this._receptor = new Receptor(identidad.codigoCat, numeroDocumento, razonSocial, nombreComercial);
    }

    /**
     * Definir la dirección del proveedor
     * @param {String} codUbigeo, código de ubigeo
     * @param {String} codPais, codigo de país
     * @param {String} direccion, dirección fiscal
     * @param {String} urbanizacion, urbanización
     */
    defDireccionRec(codUbigeo=null, codPais=null, direccion=null, urbanizacion=null) {
      let ubigeo;

      try {
        ubigeo = new Ubigeos(codUbigeo);
      } catch (error) {
        // Capturamos el error lanzando si el ubigeo es incorrecto
        throw error;
      }

      if (this._receptor === null) {
        throw new Error('No se ha definido la información del proveedor');
      }

      this._receptor.defDireccion(ubigeo.codigoCat, null, codPais, direccion, urbanizacion);
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
