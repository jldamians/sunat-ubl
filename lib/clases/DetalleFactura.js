"use strict";

const {
  TipoPrecioVenta,
} = require('sunat-catalogs');

const Detalle = require('./Detalle'),
      ImpuestoLineaIgv = require('./ImpuestoLineaIgv'),
      ImpuestoLineaIsc = require('./ImpuestoLineaIsc'),
      ImpuestoLineaOtros = require('./ImpuestoLineaOtros'),
      ImpuestoLineaIcbper = require('./ImpuestoLineaIcbper');

class DetalleFactura extends Detalle {
  constructor() {
    super(...arguments);

    this.tagCantidad = 'InvoicedQuantity';
    this.tagDetalle = 'InvoiceLine';
  }

  /**
   * Agregar información del impuesto
   * @param {
   *  ImpuestoLineaIgv |
   *  ImpuestoLineaIsc |
   *  ImpuestoLineaIcbper |
   *  ImpuestoLineaOtros
   * } impuesto, información del impuesto
   */
  agrImpuesto(impuesto) {
    const ingresado = this._impuestos.find((imp) => {
      return impuesto.codImpuesto === imp.codImpuesto;
    });

    if (!ingresado) {
      this._impuestos.push(impuesto);
    } else {
      throw new Error(`El impuesto "${impuesto.codImpuesto}" fue agregado anteriormente`);
    }
  }

  /**
   * Definir icbper del detalle
   * @param {Number} imptBase, importe base del icbper
   * @param {Number} tasa, tasa del icbper
   * @param {Number} imptImpuesto, importe del icbper
   */
  agrImpuestoIcbper(imptBase, tasa, imptImpuesto) {
    const impuesto = new ImpuestoLineaIcbper(imptBase, tasa, imptImpuesto, this._codMoneda);

    this.agrImpuesto(impuesto);
  }

  /**
   * Definir igv del detalle
   * @param {String} codAfectacion, código del tipo de afectación del igv
   * @param {Number} imptBase, importe base del igv
   * @param {Number} tasa, tasa del igv
   * @param {Number} imptImpuesto, importe del igv
   */
  agrImpuestoIgv(codAfectacion, imptBase, tasa, imptImpuesto) {
    let precio;

    try {
      precio = new TipoPrecioVenta(super.tipoPrecioUnit);
    } catch (error) {
      // Capturamos el error lanzando si el tipo de precio de venta unitario es incorrecto
      throw error;
    }

    const impuesto = new ImpuestoLineaIgv(
      codAfectacion, imptBase, tasa, imptImpuesto, precio.esOneroso(), this._codMoneda
    );

    this.agrImpuesto(impuesto);
  }

  /**
   * Definir isc del detalle
   * @param {String} codAfectacion, código del sistema de cálculo del isc
   * @param {Number} imptBase , importe base del isc
   * @param {Number} tasa , tasa del isc
   * @param {Number} imptImpuesto , importe del isc
   */
  agrImpuestoIsc(codAfectacion, imptBase, tasa, imptImpuesto) {
    const impuesto = new ImpuestoLineaIsc(
      codAfectacion, imptBase, tasa, imptImpuesto, this._codMoneda
    );

    this.agrImpuesto(impuesto);
  }

  /**
   * Definir otros tributos del detalle
   * @param {Number} imptBase, importe base del tributo
   * @param {Number} tasa, tasa del tributo
   * @param {Number} imptImpuesto, importe del tributo
   */
  agrImpuestoOtros(imptBase, tasa, imptImpuesto) {
    const impuesto = new ImpuestoLineaOtros(imptBase, tasa, imptImpuesto, this._codMoneda);

    this.agrImpuesto(impuesto);
  }
}

module.exports = DetalleFactura;
