"use strict";

const {
  TipoTributo,
  TipoPrecioVenta,
} = require('sunat-catalogs');

const Detalle = require('./Detalle'),
      ImpuestoIgv = require('./ImpuestoIgv'),
      ImpuestoIsc = require('./ImpuestoIsc'),
      ImpuestoOtros = require('./ImpuestoOtros'),
      ImpuestoIcbper = require('./ImpuestoIcbper');

class DetalleFactura extends Detalle {
  constructor() {
    super(...arguments);
  }

  /**
   * @function
   * Obtener el nombre para la etiqueta detalle
   * @return {String}
   */
  getDetailTagName() {
    return 'InvoiceLine';
  }

  /**
   * @function
   * Obtener el nombre para la etiqueta cantidad
   * @return {String}
   */
  getQuantityTagName() {
    return 'InvoicedQuantity';
  }

  /**
   * Agregar información del impuesto
   * @param {ImpuestoIgv | ImpuestoIsc | ImpuestoIcbper | ImpuestoOtros} impuesto, información del impuesto
   */
  agregarImp(impuesto) {
    const esMonedaIncorrecto = !(this._codMoneda !== null && this._codMoneda === impuesto.codMoneda);

    if (esMonedaIncorrecto === true) {
      throw new Error(`Los tipo de moneda del impuesto (${impuesto.codMoneda}) y detalle (${this._codMoneda}) deben ser iguales`);
    }

    const ingresado = this._impuestos.find((imp) => {
      return impuesto.codImpuesto === imp.codImpuesto;
    });

    if (!ingresado) {
      throw new Error(`El impuesto "${impuesto.codImpuesto}" fue agregado anteriormente`);
    } else {
      this._impuestos.push(impuesto);
    }
  }

  /**
   * Definir icbper del detalle
   * @param {Number} imptBase, importe base del icbper
   * @param {Number} tasa, tasa del icbper
   * @param {Number} imptImpuesto, importe del icbper
   */
  agrImpuestoIcbper(imptBase, tasa, imptImpuesto) {
    const impuesto = new ImpuestoIcbper(imptBase, tasa, imptImpuesto, this._codMoneda);

    this.agregarImp(impuesto);
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
      precio = new TipoPrecioVenta(super.tipoPrecio);
    } catch (error) {
      // Capturamos el error lanzando si el tipo de precio de venta unitario es incorrecto
      throw error;
    }

    const impuesto = new ImpuestoIgv(
      codAfectacion, imptBase, tasa, imptImpuesto, precio.esOneroso(), this._codMoneda
    );

    this.agregarImp(impuesto);
  }

  /**
   * Definir isc del detalle
   * @param {String} codAfectacion, código del sistema de cálculo del isc
   * @param {Number} imptBase , importe base del isc
   * @param {Number} tasa , tasa del isc
   * @param {Number} imptImpuesto , importe del isc
   */
  agrImpuestoIsc(codAfectacion, imptBase, tasa, imptImpuesto) {
    const impuesto = new ImpuestoIsc(
      codAfectacion, imptBase, tasa, imptImpuesto, this._codMoneda
    );

    this.agregarImp(impuesto);
  }

  /**
   * Definir otros tributos del detalle
   * @param {Number} imptBase, importe base del tributo
   * @param {Number} tasa, tasa del tributo
   * @param {Number} imptImpuesto, importe del tributo
   */
  agrImpuestoOtros(imptBase, tasa, imptImpuesto) {
    const impuesto = new ImpuestoOtros(imptBase, tasa, imptImpuesto, this._codMoneda);

    this.agregarImp(impuesto);
  }
}

module.exports = DetalleFactura;
