"use strict";

const {
  TipoDocumento,
} = require('sunat-catalogs');

const CPEGeneral = require('./CPEGeneral'),
      ComprobanteFacturacion = require('./ComprobanteFacturacion');

class CPENota extends CPEGeneral {
  constructor(
    tipoCpe=null,
    tipoNota=null,
    serie=null,
    numero=null,
    fechaEmision=null,
    horaEmision = null,
    codMoneda=null
  ) {
    super(tipoCpe, serie, numero, fechaEmision, horaEmision, codMoneda);

    this._tipoNota = tipoNota;
    this._referencias = [];
    this._sustento = null;
  }

  // Getters
    get tipoNota() {
      return this._tipoNota;
    }
    get sustento() {
      return this._sustento;
    }
    get referencias() {
      return this._referencias;
    }

  // Methods
    /**
     * Definir el motivo o sustento
     * @param {String} sustento, motivo o sustento
     */
    defSustento(sustento=null) {
      this._sustento = sustento;
    }

    /**
     * Agregar cpe de referencia
     * @param {String} tipoCpe, tipo de cpe de referencia
     * @param {String} serie , serie de cpe de referencia
     * @param {Number} numero, numero de cpe de referencia
     */
    agrComprobanteRef(tipoCpe=null, serie=null, numero=null) {
      const referencia = new TipoDocumento(tipoCpe);

      const ingresado = this._referencias.find((cpe) => {
        return `${cpe.tipoCpe}-${cpe.serie}-${cpe.numero}` === `${referencia.codigoCat}-${serie}-${numero}`;
      });

      if (!ingresado) {
        this._referencias.push(
          new ComprobanteFacturacion(referencia.codigoCat, serie, numero)
        );
      } else {
        throw new Error(`El cpe "${referencia.codigoCat}-${serie}-${numero}" fue agregado anteriormente`);
      }
    }
}

module.exports = CPENota;
