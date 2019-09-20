"use strict";

const { Ubigeos } = require('sunat-catalogs');

class Direccion {
  constructor(codUbigeo=null, codLocal=null, codPais=null, descripcion=null, urbanizacion=null) {
    let ubigeo;

    const codUbigeoVacio = (
      codUbigeo === null || typeof codUbigeo === "undefined"
    );

    if (codUbigeoVacio === true) {
      this._codUbigeo = null;
      this._departamento = null;
      this._provincia = null;
      this._distrito = null;
    } else {
      ubigeo = new Ubigeos(codUbigeo);

      this._codUbigeo = codUbigeo;
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
  // Setters
    set descripcion(descripcion) {
      this._descripcion = descripcion;
    }

    set departamento(departamento) {
      this._departamento = departamento;
    }

    set distrito(distrito) {
      this._distrito = distrito;
    }

    set provincia(provincia) {
      this._provincia = provincia;
    }

    set urbanizacion(urbanizacion) {
      this._urbanizacion = urbanizacion;
    }

    set codUbigeo(codUbigeo) {
      const ubigeo = new Ubigeos(codUbigeo);

      this._codUbigeo = codUbigeo;

      this._departamento = ubigeo.departamento();
      this._provincia = ubigeo.provincia();
      this._distrito = ubigeo.distrito();
    }

    set codLocal(codLocal) {
      this._codLocal = codLocal;
    }

    set codPais(codPais) {
      this._codPais = codPais;
    }
}

module.exports = Direccion;
