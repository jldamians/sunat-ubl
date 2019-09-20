"use string";

class TipoCambio {
  constructor(codMonedaOrigen=null, codMonedaDestino=null, tasa=null, fecha=null) {
    this._codMonedaOrigen = codMonedaOrigen;
    this._codMonedaDestino = codMonedaDestino;
    this._tasa = tasa;
    this._fecha = fecha;
  }

  // Getters
    get codMonedaOrigen() {
      return this._codMonedaOrigen;
    }
    get codMonedaDestino() {
      return this._codMonedaDestino;
    }
    get fecha() {
      return this._fecha;
    }
    get tasa() {
      return this._tasa;
    }
  // Setters
    set codMonedaOrigen(codMonedaOrigen) {
      this._codMonedaOrigen = codMonedaOrigen;
    }
    set codMonedaDestino(codMonedaDestino) {
      this._codMonedaDestino = codMonedaDestino;
    }
    set fecha(fecha) {
      this._fecha = fecha;
    }
    set tasa(tasa) {
      this._tasa = tasa;
    }
}

module.exports = TipoCambio;
