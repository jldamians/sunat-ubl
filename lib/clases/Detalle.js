"use strict";

const {
  CargoDescuento,
  TipoPrecioVenta,
  ConceptoTributario,
} = require('sunat-catalogs');

const Cargo = require('./Cargo'),
      Concepto = require('./Concepto'),
      Descuento = require('./Descuento');

class Detalle {
  constructor(
    codInterno=null,
    descripcion=null,
    codMedida=null,
    cantidad=null,
    imptValorUnit=null,
    imptVenta=null,
    imptTributo=null
  ) {
    this._nroOrden = null;
    this._codInterno = codInterno;
    this._codUnspsc = null;
    this._codGtin = null;
    this._descripcion = descripcion;
    this._codMedida = codMedida;
    this._cantidad = cantidad;
    this._tipoPrecioUnit = null;
    this._imptPrecioUnit = null;
    this._imptValorUnit = imptValorUnit;
    this._imptVenta = imptVenta;
    this._imptTributo = imptTributo;
    this._codMoneda = null;
    this._impuestos = [];
    this._conceptos = [];
    this._descuento = null;
    this._cargo = null;
  }

  // Getters
    get nroOrden() {
      return this._nroOrden;
    }
    get codInterno() {
      return this._codInterno;
    }
    get codUnspsc() {
      return this._codUnspsc;
    }
    get codGtin() {
      return this._codGtin;
    }
    get descripcion() {
      return this._descripcion;
    }
    get codMedida() {
      return this._codMedida;
    }
    get cantidad() {
      return this._cantidad;
    }
    get tipoPrecioUnit() {
      return this._tipoPrecioUnit;
    }
    get imptPrecioUnit() {
      return this._imptPrecioUnit;
    }
    get imptValorUnit() {
      return this._imptValorUnit;
    }
    get imptVenta() {
      return this._imptVenta;
    }
    get imptTributo() {
      return this._imptTributo;
    }
    get codMoneda() {
      return this._codMoneda;
    }
    get impuestos() {
      return this._impuestos;
    }
    get conceptos() {
      return this._conceptos;
    }
    get descuento() {
      return this._descuento;
    }
    get cargo() {
      return this._cargo;
    }

  // Methods
    /**
     * Definir tipo de moneda
     * @param {String} codMoneda, código del tipo de moneda
     */
    defCodMoneda(codMoneda=null) {
      this._codMoneda = codMoneda;
    }

    /**
     * Definir el número de orden del ítem
     * @param {Number} nroOrden, número de orden
     */
    defNroOrden(nroOrden=null) {
      this._nroOrden = nroOrden;
    }

    /**
     * Definir código de producto sunat
     * @param {String} codUnspsc, código estandar de producto
     */
    defCodUnspsc(codUnspsc=null) {
      this._codUnspsc = codUnspsc;
    }

    /**
     * Definir código de producto gtin
     * @param {String} codGtin, código mundial de un artículo comercial
     */
    defCodGtin(codGtin=null) {
      this._codGtin = codGtin;
    }

    /**
     * Definir precio unitario (incluye igv)
     * @param {Number} precio, precio unitario
     */
    defPrecioUnit(precio=null) {
      this._tipoPrecioUnit = TipoPrecioVenta.PRECIO_UNITARIO;

      this._imptPrecioUnit = precio;
    }

    /**
     * Definir valor referencial unitario en operaciones no onerosas (gratuitas)
     * @param {Number} valor, valor referencial unitario
     */
    defValorRefUnit(valor=null) {
      this._tipoPrecioUnit = TipoPrecioVenta.VALOR_REFERENCIAL_UNITARIO;

      this._imptPrecioUnit = valor;
    }

    /**
     * Agregar concepto al detalle
     * @param {String} codConcepto, código del conceptor
     * @param {String} valor, valor del conceptor
     */
    agrConcepto(codConcepto, valor) {
      const concepto = new ConceptoTributario(codConcepto);

      const ingresado = this._conceptos.find((concepto) => {
        return concepto.codConcepto === codConcepto;
      });

      if (!ingresado) {
        this._conceptos.push(
          new Concepto(codConcepto, valor, concepto.descripcion())
        );
      } else {
        throw new Error(`El concepto "${codConcepto}" fue agregado anteriormente`);
      }
    }

    /**
     * Definir el número de placa del vehículo automotor
     * @param {String} numero, número de placa del vehículo
     */
    defGastosNroPlaca(numero) {
      this.agrConcepto(ConceptoTributario.GTOS_RENTA_NRO_PLACA, numero);
    }

    /**
     * Definir  descuento al detalle
     */
    defDescuento(codDescuento, tasa, imptBase, imptDescuento) {
      const descuento = new CargoDescuento(codDescuento);

      if (descuento.esDescuentoDet() === true) {
        this._descuento = new Descuento(descuento.codigoCat, tasa, imptBase, imptDescuento, this._codMoneda);
      } else {
        throw new Error(`El tipo de descuento "${descuento.codigoCat}" no está permitido para el detalle`);
      }
    }

    /**
     * Definir  cargo al detalle
     */
    defCargo(codCargo, tasa, imptBase, imptCargo) {
      const cargo = new CargoDescuento(codCargo);

      if (cargo.esCargoDet() === true) {
        this._cargo = new Cargo(cargo.codigoCat, tasa, imptBase, imptCargo, this._codMoneda);
      } else {
        throw new Error(`El tipo de cargo "${cargo.codigoCat}" no está permitido para el detalle`);
      }
    }
}

module.exports = Detalle;
