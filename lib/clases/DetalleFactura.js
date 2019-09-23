"use strict";

const {
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

    this._impuestos = [];
  }

  get impuestos() {
    return this._impuestos || [];
  }

  // TODO: validar que sea array de impuestos
  // TODO: validar que los tipos de monedas sean iguales
  set impuestos(impuestos) {
    this._impuestos = impuestos;
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

  _existeImp(codImpuesto) {
    const ingresado = this.impuestos.find((impuesto) => {
      return impuesto.codImpuesto === codImpuesto;
      /*if (impuesto.codImpuesto === codImpuesto) {
        return true;
      }*/
    });

    if (!ingresado) {
      throw new Error(`El impuesto ya fue ingresado anteriormente al detalle`);
    } else {
      return false;
    }
  }

  _agregarImp(impuesto) {
    if (super.codMoneda === null) {
      throw new Error(`No se ha definido el tipo de moneda en el detalle`);
    }

    if (impuesto.codMoneda !== super.codMoneda) {
      throw new Error(`El tipo de moneda del impuesto y del detalle son diferentes`);
    }

    if (this._existeImp() === false) {
      this._impuestos.push(impuesto);
    }
  }

  agregarImpIcbper(imptBase, tasa, imptImpuesto) {
    const impuesto = new ImpuestoIcbper(imptBase, tasa, imptImpuesto, super.codMoneda);

    this._agregarImp(impuesto);
  }

  agregarImpIgv(codAfectacion, imptBase, tasa, imptImpuesto) {
    let onerosa;

    if (super.tipoPrecioUnitario === TipoPrecioVenta.PRECIO_UNITARIO) {
      onerosa = true;
    } else if (super.tipoPrecioUnitario === TipoPrecioVenta.VALOR_REFERENCIAL_UNITARIO) {
      onerosa = false;
    }

    const impuesto = new ImpuestoIgv(codAfectacion, imptBase, tasa, imptImpuesto, onerosa, super.codMoneda);

    this._agregarImp(impuesto);
  }

  agregarImpIsc(codAfectacion, imptBase, tasa, imptImpuesto) {
    const impuesto = new ImpuestoIsc(codAfectacion, imptBase, tasa, imptImpuesto, super.codMoneda);

    this._agregarImp(impuesto);
  }

  agregarImpOtros(imptBase, tasa, imptImpuesto) {
    const impuesto = new ImpuestoOtros(imptBase, tasa, imptImpuesto, super.codMoneda);

    this._agregarImp(impuesto);
  }
}

module.exports = DetalleFactura;
