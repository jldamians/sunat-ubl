"use strict";

const {
  Ubigeos,
  TipoMoneda,
  TipoDocumento,
  RegimenPercepcion,
  TipoDocumentoIdentidad,
} = require('sunat-catalogs');

const CPE = require('./CPE'),
      Receptor = require('./Receptor'),
      TipoCambio = require('./TipoCambio'),
      DetallePercepcion = require('./DetallePercepcion'),
      ComprobanteRelacionado = require('./ComprobanteRelacionado');

class CPEPercepcion extends CPE {
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
    super(TipoDocumento.CPEP, serie, numero, fechaEmision, horaEmision);

    this._tipoRegimen = null;
    this._tasaRegimen = null;
    this._observacion = null;

    this._imptTotalPercibido = null;
    this._codMonedaPercibido = TipoMoneda.SOL;

    this._imptTotalCobrado = null;
    this._codMonedaCobrado = TipoMoneda.SOL;

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

  // Methods
    /**
     * Definir la información del régimen de percepción
     * @param {String} tipoRegimen, código del régimen de percepción
     * @param {Number} tasaRegimen, tasa del régimen de percepción
     * @param {String} observacion, observación de la percepción
     * @param {Number} imptTotalPercibido, importe total percibido
     * @param {Number} imptTotalCobrado, importe total cobrado
     * @param {Number} imptRedondeo, monto de redondeo
     */
    definirRgm(tipoRegimen=null, tasaRegimen=null, observacion=null, imptTotalPercibido=null, imptTotalCobrado=null, imptRedondeo=null) {
      let regimen;

      try {
        regimen = new RegimenPercepcion(tipoRegimen);
      } catch(error) {
        // Capturamos el error lanzado si régimen de percepción es incorrecto
        throw error;
      }

      this._tipoRegimen = regimen.codigoCat;

      this._tasaRegimen = tasaRegimen; // regimen.tasa();

      this._observacion = observacion;

      this._imptTotalPercibido = imptTotalPercibido;

      this._imptTotalCobrado = imptTotalCobrado;

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

      if (this._emisor === null) {
        throw new Error('No se ha definido la información del emisor');
      }

      try {
        ubigeo = new Ubigeos(codUbigeo);
      } catch (error) {
        // Capturamos el error lanzando si el ubigeo es incorrecto
        throw error;
      }

      this._emisor.defDireccion(ubigeo.codigoCat, null, codPais, direccion, urbanizacion);
    }

    /**
     * Definir la información del cliente
     * @param {String} tipoDocumento, tipo de documento de identidad del cliente
     * @param {String} numeroDocumento, número de documento de identidad del cliente
     * @param {String} razonSocial, razón social del cliente
     * @param {String} nombreComercial, nombre comercial del cliente
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
     * Definir la dirección del cliente
     * @param {String} codUbigeo, código de ubigeo
     * @param {String} codPais, codigo de país
     * @param {String} direccion, dirección fiscal
     * @param {String} urbanizacion, urbanización
     */
    defDireccionRec(codUbigeo=null, codPais=null, direccion=null, urbanizacion=null) {
      let ubigeo;

      if (this._receptor === null) {
        throw new Error('No se ha definido la información del cliente');
      }

      try {
        ubigeo = new Ubigeos(codUbigeo);
      } catch (error) {
        // Capturamos el error lanzando si el ubigeo es incorrecto
        throw error;
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
