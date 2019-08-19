"use strict";

class Operacion {
  constructor(codigo, tasa, base, monto, codMoneda) {
    this._codigo = codigo;
    this._tasa = tasa;
    this._base = base;
    this._monto = monto;
    this._codMoneda = codMoneda;
  }

  get codigo(){
    return this._codigo;
  }

  get tasa(){
    return this._tasa;
  }

  get base(){
    return this._base;
  }

  get monto(){
    return this._monto;
  }

  get codMoneda(){
    return this._codMoneda;
  }
}

module.exports = Operacion;
