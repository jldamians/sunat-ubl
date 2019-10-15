"use strict";

const {
  Ubigeos,
  TipoDocumento,
  DocumentoRelacionado,
  TipoDocumentoIdentidad,
} = require('sunat-catalogs');

const CPE = require('./CPE'),
      Receptor = require('./Receptor'),
      ComprobanteDespacho = require('./ComprobanteDespacho'),
      ComprobanteAdicional = require('./ComprobanteAdicional'),
      ComprobanteFacturacion = require('./ComprobanteFacturacion');

class CPENota extends CPE {
  constructor(
    tipoCpe=null,
    tipoNota=null,
    serie=null,
    numero=null,
    fechaEmision=null,
    horaEmision = null,
    codMoneda=null
  ) {
    super(tipoCpe, serie, numero, fechaEmision, horaEmision);

    this._tipoNota = tipoNota;
    this._codMoneda = codMoneda;
    this._sustento = null;
    this._referencias = [];
    this._anexos = [];
  }

  // Getters
    get tipoNota() {
      return this._tipoNota;
    }
    get sustento() {
      return this._sustento;
    }
    get codMoneda() {
      return this._codMoneda;
    }
    get referencias() {
      return this._referencias;
    }
    get anexos() {
      return this._anexos;
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
     * Definir la dirección del emisor
     * @param {String} codUbigeo, código de ubigeo
     * @param {String} codLocal, código de establecimiento anexo
     * @param {String} codPais, código de país
     * @param {String} direccion, dirección fiscal
     * @param {String} urbanizacion, urbanización
     */
    defDireccionEms(codUbigeo=null, codLocal=null, codPais=null, direccion=null, urbanizacion=null) {
      let ubigeo;

      if (this._emisor === null) {
        throw new Error('No se ha definido la información del emisor');
      }

      try {
        ubigeo = new Ubigeos(codUbigeo);
      } catch (error) {
        // Capturamos el error lanzando si el ubigeo es incorrecto
        throw error;
      }

      this._emisor.defDireccion(ubigeo.codigoCat, codLocal, codPais, direccion, urbanizacion);
    }

    /**
     * Definir la información del usuario o adquiriente
     * @param {String} tipoDocumento, tipo de documento de identidad del cliente
     * @param {String} numeroDocumento, número de documento de identidad del cliente
     * @param {String} razonSocial, razón social del cliente
     */
    defReceptor(tipoDocumento=null, numeroDocumento=null, razonSocial=null) {
      let identidad;

      try {
        identidad = new TipoDocumentoIdentidad(tipoDocumento);
      } catch (error) {
        // Capturamos el error lanzando si el tipo de documento de identidad es incorrecto
        throw error;
      }

      this._receptor = new Receptor(identidad.codigoCat, numeroDocumento, razonSocial);
    }

    /**
     * Agregar cpe de despacho
     * @param {String} tipoCpe, tipo de guía relacionada
     * @param {String} serie , serie de guía relacionada
     * @param {Number} numero, numero de guía relacionada
     */
    agrComprobanteDes(tipoCpe=null, serie=null, numero=null) {
      const despacho = new TipoDocumento(tipoCpe);

      const esCpeDespacho = (
        [TipoDocumento.GRR, TipoDocumento.GRT].includes(despacho.codigoCat) === true
      );

      if (esCpeDespacho === false) {
        throw new Error(`El código "${despacho.codigoCat}" no corresponde a un cpe de despacho`);
      }

      const ingresado = this._anexos.find((cpe) => {
        return `${cpe.tipoCpe}-${cpe.serie}-${cpe.numero}` === `${despacho.codigoCat}-${serie}-${numero}`;
      });

      if (!ingresado) {
        this._anexos.push(
          new ComprobanteDespacho(despacho.codigoCat, serie, numero)
        );
      } else {
          throw new Error(`El cpe "${despacho.codigoCat}-${serie}-${numero}" fue agregado anteriormente`);
      }
    }

    /**
     * Agregar cpe relacionado
     * @param {String} tipoCpe, tipo de cpe relacionado
     * @param {String} serie , serie de cpe relacionado
     * @param {Number} numero, numero de cpe relacionado
     */
    agrComprobanteRel(tipoCpe=null, serie=null, numero=null) {
      const adicional = new DocumentoRelacionado(tipoCpe);

      const esCpeAdicional = (
        [
          DocumentoRelacionado.TICKET_SALIDA_ENAPU,
          DocumentoRelacionado.FA_CORREGIR_RUC,
          DocumentoRelacionado.CODIGO_SCOP,
          DocumentoRelacionado.OTROS,
        ].includes(adicional.codigoCat) === true
      );

      if (esCpeAdicional === false) {
        throw new Error(`El código "${adicional.codigoCat}" no corresponde a un cpe relacionado`);
      }

      const ingresado = this._anexos.find((cpe) => {
        return `${cpe.tipoCpe}-${cpe.serie}-${cpe.numero}` === `${adicional.codigoCat}-${serie}-${numero}`;
      });

      if (!ingresado) {
        this._anexos.push(
          new ComprobanteAdicional(adicional.codigoCat, serie, numero)
        );
      } else {
        throw new Error(`El cpe "${adicional.codigoCat}-${serie}-${numero}" fue agregado anteriormente`);
      }
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
