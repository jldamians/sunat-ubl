"use strict";

const Detalle = require('./Detalle');

class DetalleNotaDebito extends Detalle {
  constructor() {
    super(...arguments);
  }

  /**
   * @function
   * Obtener el nombre para la etiqueta detalle
   * @return {String}
   */
  getDetailTagName() {
    return 'DebitNoteLine';
  }

  /**
   * @function
   * Obtener el nombre para la etiqueta cantidad
   * @return {String}
   */
  getQuantityTagName() {
    return 'DebitedQuantity';
  }
}

module.exports = DetalleNotaDebito;
