"use string";

class TipoCambio {
  constructor(codMonedaOrigen=null, codMonedaDestino=null, tasaCambio=null, fechaCambio=null) {
    this._codMonedaOrigen = codMonedaOrigen;
    this._codMonedaDestino = codMonedaDestino;
    this._tasaCambio = tasaCambio;
    this._fechaCambio = fechaCambio;
  }

  // Getters
    get codMonedaOrigen() {
      return this._codMonedaOrigen;
    }
    get codMonedaDestino() {
      return this._codMonedaDestino;
    }
    get fechaCambio() {
      return this._fechaCambio;
    }
    get tasaCambio() {
      return this._tasaCambio;
    }
  // Setters
    set codMonedaOrigen(codMonedaOrigen) {
      this._codMonedaOrigen = codMonedaOrigen;
    }
    set codMonedaDestino(codMonedaDestino) {
      this._codMonedaDestino = codMonedaDestino;
    }
    set fechaCambio(fechaCambio) {
      this._fechaCambio = fechaCambio;
    }
    set tasaCambio(tasaCambio) {
      this._tasaCambio = tasaCambio;
    }
}

module.exports = TipoCambio;
