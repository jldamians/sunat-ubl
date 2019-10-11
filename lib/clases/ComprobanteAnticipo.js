"use strict";

const Emisor = require('./Emisor'),
      Comprobante = require('./Comprobante');

class ComprobanteAnticipo extends Comprobante{
  /**
   * @constructor
   * @param {String} tipoCpe, tipo de cpe que se realizó el anticipo
   * @param {String} serie, serie de cpe que se realizó el anticipo
   * @param {Integer} numero, número de cpe que se realizó el anticipo
   * @param {String} idPago, identificador del pago
   * @param {Number} imptAnticipo, importe del anticipo
   * @param {String} fechaPago, fecha de pago
   * @param {String} codMoneda, tipo de moneda del anticipo
   * @param {Emisor} emisor, emisor del anticipo
   */
  constructor(
    tipoCpe=null,
    serie=null,
    numero=null,
    idPago=null,
    imptAnticipo=null,
    fechaPago=null,
    codMoneda=null,
    emisor=null
  ) {
    super(tipoCpe, serie, numero);

    this._idPago = idPago;
    this._imptAnticipo = imptAnticipo;
    this._fechaPago = fechaPago;
    this._codMoneda = codMoneda;
    this._emisor = emisor;
  }

  // Getters
    get idPago() {
      return this._idPago;
    }
    get imptAnticipo() {
      return this._imptAnticipo;
    }
    get fechaPago() {
      return this._fechaPago;
    }
    get codMoneda() {
      return this._codMoneda;
    }
    get emisor() {
      return this._emisor;
    }

  // Methods
    defEmisor(tipoDocumento=null, numeroDocumento=null) {
      this._emisor = new Emisor(tipoDocumento, numeroDocumento);
    }
}

module.exports = ComprobanteAnticipo;
