"use strict";

const Detalle = require('./Detalle');

class DetalleNotaCredito extends Detalle {
  constructor() {
    super(...arguments);
  }

  /**
   * @function
   * Obtener el nombre para la etiqueta detalle
   * @return {String}
   */
  getDetailTagName() {
    return 'CreditNoteLine';
  }

  /**
   * @function
   * Obtener el nombre para la etiqueta cantidad
   * @return {String}
   */
  getQuantityTagName() {
    return 'CreditedQuantity';
  }
}

module.exports = DetalleNotaCredito;
