"use strict";

const ConceptoTributario = require('./ConceptoTributario');

class Detalle {
  constructor(
    secuencial = null,
    codMoneda = null,
    codInterno = null,
    codUnspsc = null,
    codGtin = null,
    codMedida = null,
    cantidad = null,
    descripcion = null,
    tipoPrecioUnitario = null,
    imptPrecioUnitario = null,
    imptValorUnitario = null,
    imptValorTotal = null,
    tributo = null,
    conceptos = null,
    descuento = null,
    cargo = null
  ) {
    this._secuencial = secuencial;
    this._codMoneda = codMoneda;
    this._codInterno = codInterno;
    this._codUnspsc = codUnspsc;
    this._codGtin = codGtin;
    this._codMedida = codMedida;
    this._cantidad = cantidad;
    this._descripcion = descripcion;
    this._tipoPrecioUnitario = tipoPrecioUnitario;
    this._imptPrecioUnitario = imptPrecioUnitario;
    this._imptValorUnitario = imptValorUnitario;
    this._imptValorTotal = imptValorTotal;
    this._tributo = tributo;
    this._conceptos = conceptos || [];
    this._descuento = descuento;
    this._cargo = cargo;
  }

  // Setters
    set secuencial(secuencial) {
      this._secuencial = secuencial;
    }

    set codMoneda(codMoneda) {
      this._codMoneda = codMoneda;
    }

  // Getters
    get secuencial() {
      return this._secuencial;
    }
    get codMoneda() {
      return this._codMoneda;
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
    get codMedida() {
      return this._codMedida;
    }
    get cantidad() {
      return this._cantidad;
    }
    get descripcion() {
      return this._descripcion;
    }
    get tipoPrecioUnitario() {
      return this._tipoPrecioUnitario;
    }
    get imptPrecioUnitario() {
      return this._imptPrecioUnitario;
    }
    get imptValorUnitario() {
      return this._imptValorUnitario;
    }
    get imptValorTotal() {
      return this._imptValorTotal;
    }
    get tributo() {
      return this._tributo;
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
    addConcept(concept) {
      const instanceOfConcept = (
        concept instanceof ConceptoTributario === true
      );

      if (instanceOfConcept) {
        this._conceptos.push(concept);
      } else {
        throw new Error('Tipo de dato no permitido');
      }
    }
}

module.exports = Detalle;
