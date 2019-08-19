"use strict";

const Detalle = require('./Detalle'),
      Comprobante = require('./Comprobante'),
      ComprobanteDespacho = require('./ComprobanteDespacho'),
      ComprobanteAnticipo = require('./ComprobanteAnticipo'),
      ComprobanteAdicional = require('./ComprobanteAdicional'),
      ComprobanteFacturacion = require('./ComprobanteFacturacion');

class CPE {
  constructor(
    tipo,
    fechaEmision,
    emisor,
    receptor = null,
    codMoneda = null,
    tributo = null,
    detalle = null,
    referencias = null,
    descuento = null,
    cargo = null
  ) {
    this._tipo = tipo;
    this._fechaEmision = fechaEmision;
    this._emisor = emisor;
    this._receptor = receptor;
    this._codMoneda = codMoneda;
    this._tributo = tributo;
    this._detalle = detalle || [];
    this._referencias = referencias || [];
    this._descuento = descuento;
    this._cargo = cargo;

  }

  get tipo() {
    return this._tipo;
  }

  get fechaEmision() {
    return this._fechaEmision;
  }

  get emisor() {
    return this._emisor;
  }

  get receptor() {
    return this._receptor;
  }

  get codMoneda() {
    return this._codMoneda;
  }

  get tributo() {
    return this._tributo;
  }

  get detalle() {
    return this._detalle;
  }

  get referencias() {
    return this._referencias;
  }

  get descuento() {
    return this._descuento;
  }

  get cargo() {
    return this._cargo;
  }

  /**
   * Agrega detalle al comprobante de pago electrónico
   * @param {Detalle} detalle, información del detalle
   */
  addDetalle(detalle) {
    const instanceOfDetail = (
      detalle instanceof Detalle === true
    );

    if (instanceOfDetail === true) {
      this._detalle.push(detalle);
    } else {
      throw new Error('Tipo de dato no permitido');
    }
  }

  /**
   * Agregar referencia al comprobante de pago electrónico
   * @param {ComprobanteFacturacion|ComprobanteAdicional|ComprobanteDespacho|ComprobanteAnticipo} referencia, información de la referencia
   */
  addComprobanteReferencia(referencia) {
    const instanceOfReference = (
      referencia instanceof Comprobante === true
    );

    if (instanceOfReference === true) {
      this._referencias.push(referencia);
    } else {
      throw new Error('Tipo de dato no permitido');
    }
  }

  /**
   * Obtener los comprobantes de referencia en base al contructor
   * @param {Class[]} constructores, constructores de las referencias
   * @return {Array}
   */
  _getComprobantes(constructor) {
    return this._referencias.map((cpe) => {
      const isInstanceOfComprobante = (
        cpe instanceof constructor === true
      );

      return isInstanceOfComprobante;
    });
  }

  /**
   * Obtener los comprobantes de despacho
   * @return {Array}
   */
  getComprobantesDespacho() {
    return this._getComprobantes(ComprobanteDespacho);
  }

  /**
   * Obtener los comprobantes adicionales
   * @return {Array}
   */
  getComprobantesAdicional() {
    return this._getComprobantes(ComprobanteAdicional);
  }

  /**
   * Obtener los comprobantes de anticipos
   * @return {Array}
   */
  getComprobantesAnticipo() {
    return this._getComprobantes(ComprobanteAnticipo);
  }

  /**
   * Obtener los comprobantes de facturacion
   * @return {Array}
   */
  getComprobantesFacturacion() {
    return this._getComprobantes(ComprobanteFacturacion);
  }
}

module.exports = CPE;
