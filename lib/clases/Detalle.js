"use strict";

const {
  CargoDescuento,
  TipoPrecioVenta,
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
    imptValor=null,
    imptVenta=null,
    imptTributo=null
  ) {
    this._secuencial = null;
    this._codInterno = codInterno;
    this._codUnspsc = null;
    this._codGtin = null;
    this._descripcion = descripcion;
    this._codMedida = codMedida;
    this._cantidad = cantidad;
    this._tipoPrecio = null;
    this._imptPrecio = null;
    this._imptValor = imptValor;
    this._imptVenta = imptVenta;
    this._imptTributo = imptTributo;
    this._codMoneda = null;
    this._impuestos = [];
    this._conceptos = [];
    this._descuento = null;
    this._cargo = null;
  }

  // Getters
    get secuencial() {
      return this._secuencial;
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
    get tipoPrecio() {
      return this._tipoPrecio;
    }
    get imptPrecio() {
      return this._imptPrecio;
    }
    get imptValor() {
      return this._imptValor;
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
     * Definir el secuencial
     * @param {Number} secuencial, número de orden del ítem
     */
    defSecuencial(secuencial=null) {
      this._secuencial = secuencial;
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
      this._tipoPrecio = TipoPrecioVenta.PRECIO_UNITARIO;

      this._imptPrecio = precio;
    }

    /**
     * Definir valor referencial unitario en operaciones no onerosas (gratuitas)
     * @param {Number} valor, valor referencial unitario
     */
    defValorUnit(valor=null) {
      this._tipoPrecio = TipoPrecioVenta.VALOR_REFERENCIAL_UNITARIO;

      this._imptPrecio = valor;
    }

    /**
     * Agregar concepto al detalle
     */
    agregarCto(codigo, valor) {
      const ingresado = this._conceptos.find((concepto) => {
        return concepto.codigo === codigo;
      });

      if (!ingresado) {
        this._conceptos.push(new Concepto(codigo, valor));
      } else {
        throw new Error(`El concepto "${codigo}" fue agregado anteriormente`);
      }
    }

    /**
     * Definir  descuento al detalle
     */
    definirDto(codDescuento, tasa, imptBase, imptDescuento) {
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
    definirCgo(codCargo, tasa, imptBase, imptCargo) {
      const cargo = new CargoDescuento(codCargo);

      if (cargo.esCargoDet() === true) {
        this._cargo = new Cargo(cargo.codigoCat, tasa, imptBase, imptCargo, this._codMoneda);
      } else {
        throw new Error(`El tipo de cargo "${cargo.codigoCat}" no está permitido para el detalle`);
      }
    }
}

module.exports = Detalle;
