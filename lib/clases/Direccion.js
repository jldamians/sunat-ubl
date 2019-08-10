class Direccion {
  constructor(descripcion, departamento, provincia, distrito, urbanizacion, codUbigeo, codLocal, codPais) {
    this._descripcion = descripcion;
    this._departamento = departamento;
    this._provincia = provincia;
    this._distrito = distrito;
    this._urbanizacion = urbanizacion;
    this._codUbigeo = codUbigeo;
    this._codLocal = codLocal;
    this._codPais = codPais;
  }

  set descripcion(descripcion) {
    this._descripcion = descripcion;
  }
  get descripcion() {
    return this._descripcion;
  }

  set departamento(departamento) {
    this._departamento = departamento;
  }
  get departamento() {
    return this._departamento;
  }

  set distrito(distrito) {
    this._distrito = distrito;
  }
  get distrito() {
    return this._distrito;
  }

  set provincia(provincia) {
    this._provincia = provincia;
  }
  get provincia() {
    return this._provincia;
  }

  set urbanizacion(urbanizacion) {
    this._urbanizacion = urbanizacion;
  }
  get urbanizacion() {
    return this._urbanizacion;
  }

  set codUbigeo(codUbigeo) {
    this._codUbigeo = codUbigeo;
  }
  get codUbigeo() {
    return this._codUbigeo;
  }

  set codLocal(codLocal) {
    this._codLocal = codLocal;
  }
  get codLocal() {
    return this._codLocal;
  }

  set codPais(codPais) {
    this._codPais = codPais;
  }
  get codPais() {
    return this._codPais;
  }
}

module.exports = Direccion;
