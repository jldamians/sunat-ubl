"use string";

const {
  TipoMoneda,
} = require('sunat-catalogs');

const TipoCambio = require('./TipoCambio'),
      Comprobante = require('./Comprobante');

class DetalleRegimen extends Comprobante {
  constructor(
    tipoCpe=null,
    serie=null,
    numero=null,
    fechaEmision=null,
    imptTotalVenta=null,
    codMonedaVenta=null
  ) {
    super(tipoCpe, serie, numero);

    this._fechaEmision = fechaEmision;
    this._imptTotalVenta = imptTotalVenta;
    this._codMonedaVenta = codMonedaVenta;
    this._tipoCambio = null;
  }

  // Getters
    get fechaEmision() {
      return this._fechaEmision;
    }
    get imptTotalVenta() {
      return this._imptTotalVenta;
    }
    get codMonedaVenta() {
      return this._codMonedaVenta;
    }
    get tipoCambio() {
      return this._tipoCambio;
    }

  // Methods
    /**
     * Definir los datos del tipo de cambio
     * @param {Number} tasaCambio, factor aplicado o tipo de cambio
     * @param {String} fechaCambio, fecha de tipo de cambio
     */
    definirTc(tasaCambio=null, fechaCambio=null) {
      // TODO: validar el formato de la fecha de cambio
      this._tipoCambio = new TipoCambio(
        this._codMonedaVenta, // código de moneda de origen
        TipoMoneda.SOL, // código de moneda de destino
        tasaCambio,
        fechaCambio
      );
    }
}

module.exports = DetalleRegimen;
