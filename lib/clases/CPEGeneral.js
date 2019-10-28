"use strict";

const number2words = require('written-number');

const {
  Ubigeos,
  Leyenda,
  TipoTributo,
  TipoDocumento,
  DocumentoRelacionado,
  TipoDocumentoIdentidad,
} = require('sunat-catalogs');

const CPE = require('./CPE'),
      Persona = require('./Persona'),
      Impuesto = require('./Impuesto'),
      ComprobanteDespacho = require('./ComprobanteDespacho'),
      ComprobanteAdicional = require('./ComprobanteAdicional');

class CPEGeneral extends CPE {
  constructor(
    tipoCpe=null,
    serie=null,
    numero=null,
    fechaEmision=null,
    horaEmision=null,
    codMoneda=null
  ) {
    super(tipoCpe, serie, numero, fechaEmision, horaEmision);

    this._codMoneda = codMoneda;
    this._anexos = [];
    this._leyendas = [];
    this._impuestos = [];
    this._imptRedondeo = null;
    this._imptTotalTributo = null;
    this._imptTotalVenta = null;
    this._imptTotalCargo = null;
  }

  // Getters
    get codMoneda() {
      return this._codMoneda;
    }
    get anexos() {
      return this._anexos;
    }
    get leyendas() {
      return this._leyendas;
    }
    get impuestos() {
      return this._impuestos;
    }
    get imptRedondeo() {
      return this._imptRedondeo;
    }
    get imptTotalTributo() {
      return this._imptTotalTributo;
    }
    get imptTotalVenta() {
      return this._imptTotalVenta;
    }
    get imptTotalCargo() {
      return this._imptTotalCargo;
    }

  // Methods
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

      this._receptor = new Persona(identidad.codigoCat, numeroDocumento, razonSocial);
    }

    /**
     * Definir el monto de redondeo
     * @param {Number} importe, monto de redondeo del importe total
     */
    defImptRedondeo(importe=null) {
      this._imptRedondeo = importe;
    }

    /**
     * Definir el monto total de tributos
     * @param {Number} importe, monto total de tributos
     */
    defImptTributoTot(importe=null) {
      this._imptTotalTributo = importe;
    }

    /**
     * Definir el precio total de venta
     * @param {Number} importe, precio total de venta
     */
    defImptVentaTot(importe=null) {
      this._imptTotalVenta = importe;

      if (importe !== null) {
        const entero = Math.trunc(importe);

        const decimal = Number.parseFloat((importe - entero).toFixed(2)) * 100;

        const letras = number2words(entero, {lang: 'es'});

        this._leyendas.push({
          codLeyenda: Leyenda.MONTO_LETRAS,
          descripcion: `${letras.toUpperCase()} Y ${decimal}/100 SOLES`,
        });
      }
    }

    /**
     * Definir la sumatoria de cargos
     * @param {Number} importe, sumatoria otros cargos (no afectan la base imponible del igv)
     */
    defImptCargoTot(importe=null) {
      this._imptTotalCargo = importe;
    }

    /**
     * Agregar impuesto global
     * @param {String} codImpuesto, código del tributo
     * @param {Number} imptBase, monto base
     * @param {Number} imptImpuesto, importe del tributo
     */
    agrImpuesto(codImpuesto=null, imptBase=null, imptImpuesto=null) {
      const tributo = new TipoTributo(codImpuesto);

      if (this._codMoneda === null) {
        throw new Error('No ha definido el tipo de moneda del cpe');
      }

      const ingresado = this._impuestos.find((impuesto) => {
        return impuesto.codImpuesto === tributo.codigoCat;
      });

      if (!ingresado) {
        this._impuestos.push(
          new Impuesto(tributo.codigoCat, imptBase, imptImpuesto, this._codMoneda)
        );
      } else {
        throw new Error(`El impuesto "${tributo.codigoCat}" fue agregado anteriormente`);
      }
    }

    /**
     * Agregar impuesto global EXPORTACION
     * @param {Number} imptBase, monto base exportación
     */
    agrImpuestoExp(imptBase=null) {
      this.agrImpuesto(TipoTributo.EXP, imptBase, 0.00);
    }

    /**
     * Agregar impuesto global INAFECTO
     * @param {Number} imptBase, monto base inafecto
     */
    agrImpuestoIna(imptBase=null) {
      this.agrImpuesto(TipoTributo.INA, imptBase, 0.00);
    }

    /**
     * Agregar impuesto global EXONERADO
     * @param {Number} imptBase, monto base exonerado
     */
    agrImpuestoExo(imptBase=null) {
      this.agrImpuesto(TipoTributo.EXO, imptBase, 0.00);
    }

    /**
     * Agregar impuesto global GRATUITO
     * @param {Number} imptBase, monto base gratuito
     * @param {Number} imptImpuesto, importe gratuito
     */
    agrImpuestoGra(imptBase=null, imptImpuesto=null) {
      this.agrImpuesto(TipoTributo.GRA, imptBase, imptImpuesto);
    }

    /**
     * Agregar impuesto global IGV
     * @param {Number} imptBase, monto base igv
     * @param {Number} imptImpuesto, importe igv
     */
    agrImpuestoIgv(imptBase=null, imptImpuesto=null) {
      this.agrImpuesto(TipoTributo.IGV, imptBase, imptImpuesto);
    }

    /**
     * Agregar impuesto global IVAP
     * @param {Number} imptBase, monto base ivap
     * @param {Number} imptImpuesto, importe ivap
     */
    agrImpuestoIvap(imptBase=null, imptImpuesto=null) {
      this.agrImpuesto(TipoTributo.IVAP, imptBase, imptImpuesto);
    }

    /**
     * Agregar impuesto global ISC
     * @param {Number} imptBase, monto base isc
     * @param {Number} imptImpuesto, importe isc
     */
    agrImpuestoIsc(imptBase=null, imptImpuesto=null) {
      this.agrImpuesto(TipoTributo.ISC, imptBase, imptImpuesto);
    }

    /**
     * Agregar impuesto global OTROS TRIBUTOS
     * @param {Number} imptBase, monto base otros tributos
     * @param {Number} imptImpuesto, importe otros tributos
     */
    agrImpuestoOtros(imptBase=null, imptImpuesto=null) {
      this.agrImpuesto(TipoTributo.OTROS, imptBase, imptImpuesto);
    }

    /**
     * Agregar impuesto global ICBPER
     * @param {Number} imptBase, monto base icbper
     * @param {Number} imptImpuesto, importe icbper
     */
    agrImpuestoIcbper(imptBase=null, imptImpuesto=null) {
      this.agrImpuesto(TipoTributo.ICBPER, imptBase, imptImpuesto);
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
}

module.exports = CPEGeneral;
