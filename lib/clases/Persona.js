class Persona {
  constructor(razonSocial, nombreComercial, tipoDocumento, numeroDocumento) {
    this._razonSocial = razonSocial;
    this._nombreComercial = nombreComercial;
    this._tipoDocumento = tipoDocumento;
    this._numeroDocumento = numeroDocumento;
  }

  set razonSocial(razonSocial) {
    this._razonSocial = razonSocial;
  }
  get razonSocial() {
    return this._razonSocial;
  }

  set nombreComercial(nombreComercial) {
    this._nombreComercial = nombreComercial;
  }
  get nombreComercial() {
    return this._nombreComercial;
  }

  set tipoDocumento(tipoDocumento) {
    this._tipoDocumento = tipoDocumento;
  }
  get tipoDocumento() {
    return this._tipoDocumento;
  }

  set numeroDocumento(numeroDocumento) {
    this._numeroDocumento = numeroDocumento;
  }
  get numeroDocumento() {
    return this._numeroDocumento;
  }
}

module.exports = Persona;
