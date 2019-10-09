"use strict";

const { Ubigeos } = require('sunat-catalogs');

class Direccion {
  constructor(codUbigeo=null, codLocal=null, codPais=null, descripcion=null, urbanizacion=null) {
    if (codUbigeo === null) {
      this._codUbigeo = null;
      this._departamento = null;
      this._provincia = null;
      this._distrito = null;
    } else {
      const ubigeo = new Ubigeos(codUbigeo);

      this._codUbigeo = ubigeo.codigoCat;
      this._departamento = ubigeo.departamento();
      this._provincia = ubigeo.provincia();
      this._distrito = ubigeo.distrito();
    }

    this._descripcion = descripcion;
    this._urbanizacion = urbanizacion;
    this._codLocal = codLocal;
    this._codPais = codPais;
  }

  // Getters
    get descripcion() {
      return this._descripcion;
    }
    get departamento() {
      return this._departamento;
    }
    get distrito() {
      return this._distrito;
    }
    get provincia() {
      return this._provincia;
    }
    get urbanizacion() {
      return this._urbanizacion;
    }
    get codUbigeo() {
      return this._codUbigeo;
    }
    get codLocal() {
      return this._codLocal;
    }
    get codPais() {
      return this._codPais;
    }
}

module.exports = Direccion;
