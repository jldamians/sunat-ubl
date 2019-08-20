"use strict";

const Detalle = require('./Detalle');

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
}

module.exports = DetalleFactura;
