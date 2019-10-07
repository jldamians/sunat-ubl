"use strict";

const {
  CargoDescuento,
} = require('sunat-catalogs');

const Cargo = require('./Cargo'),
      Concepto = require('./Concepto'),
      Descuento = require('./Descuento');

class Detalle {
  constructor(
    codInterno=null,
    codUnspsc=null,
    codGtin=null,
    descripcion=null,
    codMedida=null,
    cantidad=null,
    tipoPrecio=null,
    imptPrecio=null,
    imptValor=null,
    imptVenta=null,
    imptTributo=null,
    codMoneda=null
  ) {
    this._codInterno = codInterno;
    this._codUnspsc = codUnspsc;
    this._codGtin = codGtin;
    this._descripcion = descripcion;
    this._codMedida = codMedida;
    this._cantidad = cantidad;
    this._tipoPrecio = tipoPrecio;
    this._imptPrecio = imptPrecio;
    this._imptValor = imptValor;
    this._imptVenta = imptVenta;
    this._imptTributo = imptTributo;
    this._codMoneda = codMoneda;
    this._impuestos = [];
    this._conceptos = [];
    this._descuento = null;
    this._cargo = null;
  }

  // Getters
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

  // Setters
    set codMoneda(codMoneda) {
      this._codMoneda = codMoneda;
    }

  // Methods
    /**
     * Verificar si el concepto ha sido ingresado al detalle
     * @param {String} codigo
     */
    _existeCto(codigo) {
      const ingresado = this._conceptos.find((concepto) => {
        return concepto.codigo === codigo;
      });

      if (!ingresado) {
        throw new Error(`El concepto ya fue ingresado anteriormente al detalle`);
      } else {
        return false;
      }
    }

    /**
     * Agregar concepto
     */
    agregarCto(codigo, valor) {
      if (this._existeCto(codigo) === false) {
        this._conceptos.push(new Concepto(codigo, valor));
      }
    }

    /**
     * Definir descuento
     */
    definirDto(codDescuento, tasa, imptBase, imptDescuento) {
      const descuento = new CargoDescuento(codDescuento);

      if (descuento.esDescuentoDet() === true) {
        this._descuento = new Descuento(codDescuento, tasa, imptBase, imptDescuento, this._codMoneda);
      } else {
        throw new Error(`El código de descuento "${codDescuento}" no está permitido para el detalle`);
      }
    }

    /**
     * Definir cargo
     */
    definirCgo(codCargo, tasa, imptBase, imptCargo) {
      const cargo = new CargoDescuento(codCargo);

      if (cargo.esCargoDet() === true) {
        this._cargo = new Cargo(codCargo, tasa, imptBase, imptCargo, this._codMoneda);
      } else {
        throw new Error(`El código de cargo "${codCargo}" no está permitido para el detalle`);
      }
    }
}

module.exports = Detalle;
