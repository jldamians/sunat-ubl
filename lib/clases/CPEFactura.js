"use strict";

const {
  //TipoMoneda,
  TipoTributo,
  TipoDocumento,
  CargoDescuento,
  DocumentoRelacionado,
} = require('sunat-catalogs');

const CPE = require('./CPE'),
      Cargo = require('./Cargo'),
      Impuesto = require('./Impuesto'),
      Descuento = require('./Descuento'),
      ComprobanteDespacho = require('./ComprobanteDespacho'),
      ComprobanteAnticipo = require('./ComprobanteAnticipo'),
      ComprobanteAdicional = require('./ComprobanteAdicional');

class CPEFactura extends CPE {
  constructor(
    tipoOperacion=null,
    serie=null,
    numero=null,
    fechaEmision=null,
    horaEmision=null,
    fechaVencimiento=null
  ) {
    super(TipoDocumento.FA, serie, numero, fechaEmision, horaEmision);

    this._tipoOperacion = tipoOperacion;
    this._fechaVencimiento = fechaVencimiento;

    this._codMoneda = null;
    this._imptTotalPrecio = null;
    this._imptTotalValor = null;
    this._imptTotalVenta = null;
    this._imptTotalDescuento = null;
    this._imptTotalCargo = null;
    this._imptRedondeo = null;
    this._imptTotalTributo = null;
    this._impuestos = [];
    this._anexos = [];
    this._anticipos = [];
    this._cargo = null;
    this._descuento = null;
  }

  // Getters
    get fechaVencimiento() {
      return this._fechaVencimiento;
    }
    get tipoOperacion() {
      return this._tipoOperacion;
    }
    get codMoneda() {
      return this._codMoneda;
    }
    get imptTotalPrecio() {
      return this._imptTotalPrecio;
    }
    get imptTotalValor() {
      return this._imptTotalValor;
    }
    get imptTotalVenta() {
      return this._imptTotalVenta;
    }
    get imptTotalDescuento() {
      return this._imptTotalDescuento;
    }
    get imptTotalCargo() {
      return this._imptTotalCargo;
    }
    get imptRedondeo() {
      return this._imptRedondeo;
    }
    get imptTotalTributo() {
      return this._imptTotalTributo;
    }
    get impuestos() {
      return this._impuestos;
    }
    get anexos() {
      return this._anexos;
    }
    get anticipos() {
      return this._anticipos;
    }
    get cargo() {
      return this._cargo;
    }
    get descuento() {
      return this._descuento;
    }

  // Methods
    definirOpe(
      codMoneda=null,
      imptTotalPrecio=null,
      imptTotalValor=null,
      imptTotalVenta=null,
      imptTotalTributo=null,
      imptTotalCargo=null,
      imptTotalDescuento=null,
      imptRedondeo=null
    ) {
      this._codMoneda = codMoneda;

      this._imptTotalPrecio = imptTotalPrecio;

      this._imptTotalValor = imptTotalValor;

      this._imptTotalVenta = imptTotalVenta;

      this._imptTotalTributo = imptTotalTributo;

      this._imptTotalCargo = imptTotalCargo;

      this._imptTotalDescuento = imptTotalDescuento;

      this._imptRedondeo = imptRedondeo;
    }

    /**
     * Definir información del cargo global
     * @param {String} codCargo, código de motivo del cargo
     * @param {Number} tasaCargo, factor del cargo
     * @param {Number} imptBase, monto base del cargo
     * @param {Number} imptCargo, monto del cargo
     */
    definirCgo(codCargo=null, tasaCargo=null, imptBase=null, imptCargo=null) {
      const cargo = new CargoDescuento(codCargo);

      if (cargo.esCargoGlb() === true) {
        this._cargo = new Cargo(
          cargo.codigoCat,
          tasaCargo,
          imptBase,
          imptCargo,
          this._codMoneda
        );
      } else {
        throw new Error(`El código de cargo "${codCargo}" no está permitido para el global`);
      }
    }

    /**
     * Definir información del descuento global
     * @param {String} codDescuento, codigo de motivo del descuento
     * @param {Number} tasaDescuento, factor del descuento
     * @param {Number} imptBase, monto base del descuento
     * @param {Number} imptDescuento, monto del descuento
     */
    definirDto(codDescuento=null, tasaDescuento=null, imptBase=null, imptDescuento=null) {
      const descuento = new CargoDescuento(codDescuento);

      if (descuento.esDescuentoGlb() === true) {
        this._cargo = new Descuento(
          descuento.codigoCat,
          tasaDescuento,
          imptBase,
          imptDescuento,
          this._codMoneda
        );
      } else {
        throw new Error(`El código de descuento "${codDescuento}" no está permitido para el global`);
      }
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
        throw new Error(`El cpe "${despacho.codigoCat}-${serie}-${numero}" fue agregado anteriormente`);
      } else {
        this._anexos.push(
          new ComprobanteDespacho(despacho.codigoCat, serie, numero)
        );
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
        throw new Error(`El cpe "${adicional.codigoCat}-${serie}-${numero}" fue agregado anteriormente`);
      } else {
        this._anexos.push(
          new ComprobanteAdicional(adicional.codigoCat, serie, numero)
        );
      }
    }

    /**
     * Agregar cpe que realizó anticipo
     * @param {String} tipoCpe, tipo de cpe que se realizó el anticipo
     * @param {String} serie , serie de cpe que se realizó el anticipo
     * @param {Number} numero, numero de cpe que se realizó el anticipo
     * @param {Number} imptAnticipo, importe del anticipo
     * @param {String} fechaPago, fecha de pago
     */
    agrComprobanteAnt(tipoCpe=null, serie=null, numero=null, imptAnticipo=null, fechaPago=null) {
      const anticipo = new DocumentoRelacionado(tipoCpe);

      const esCpeAnticipo = (
        [DocumentoRelacionado.FA_ANTICIPO, DocumentoRelacionado.BV_ANTICIPO].includes(anticipo.codigoCat) === true
      );

      if (esCpeAnticipo === false) {
        throw new Error(`El código "${anticipo.codigoCat}" no corresponde a un cpe de anticipo`);
      }

      const ingresado = this._anticipos.find((cpe) => {
        return `${cpe.tipoCpe}-${cpe.serie}-${cpe.numero}` === `${anticipo.codigoCat}-${serie}-${numero}`;
      });

      if (!ingresado) {
        throw new Error(`El cpe "${anticipo.codigoCat}-${serie}-${numero}" fue agregado anteriormente`);
      } else {
        const idPago = `${anticipo.codigoCat}-${serie}-${numero}`;

        this._anticipos.push(
          new ComprobanteAnticipo(anticipo.codigoCat, serie, numero, idPago, imptAnticipo, fechaPago, this._codMoneda, this._emisor)
        );
      }
    }

    /**
     * Agregar impuesto global
     * @param {String} codImpuesto, código del tributo
     * @param {Number} imptBase, monto base
     * @param {Number} imptImpuesto, importe del tributo
     */
    agregarImp(codImpuesto=null, imptBase=null, imptImpuesto=null) {
      const tributo = new TipoTributo(codImpuesto);

      if (this._codMoneda === null) {
        throw new Error('No ha definido el tipo de moneda del cpe');
      }

      const ingresado = this._impuestos.find((impuesto) => {
        return impuesto.codImpuesto === tributo.codigoCat;
      });

      if (!ingresado) {
        throw new Error(`El impuesto "${tributo.codigoCat}" fue agregado anteriormente`);
      } else {
        this._impuestos.push(
          new Impuesto(tributo.codigoCat, imptBase, imptImpuesto, this._codMoneda)
        );
      }
    }

    /**
     * Agregar impuesto global IGV
     * @param {Number} imptBase, monto base igv
     * @param {Number} imptImpuesto, importe igv
     */
    agrImpuestoIgv(imptBase=null, imptImpuesto=null) {
      this.agregarImp(TipoTributo.IGV, imptBase, imptImpuesto);
    }

    /**
     * Agregar impuesto global IVAP
     * @param {Number} imptBase, monto base ivap
     * @param {Number} imptImpuesto, importe ivap
     */
    agrImpuestoIvap(imptBase=null, imptImpuesto=null) {
      this.agregarImp(TipoTributo.IVAP, imptBase, imptImpuesto);
    }

    /**
     * Agregar impuesto global ISC
     * @param {Number} imptBase, monto base isc
     * @param {Number} imptImpuesto, importe isc
     */
    agrImpuestoIsc(imptBase=null, imptImpuesto=null) {
      this.agregarImp(TipoTributo.ISC, imptBase, imptImpuesto);
    }

    /**
     * Agregar impuesto global ICBPER
     * @param {Number} imptBase, monto base icbper
     * @param {Number} imptImpuesto, importe icbper
     */
    agrImpuestoIcbper(imptBase=null, imptImpuesto=null) {
      this.agregarImp(TipoTributo.ICBPER, imptBase, imptImpuesto);
    }

    /**
     * Agregar impuesto global EXPORTACION
     * @param {Number} imptBase, monto base exportación
     */
    agrImpuestoExp(imptBase=null) {
      this.agregarImp(TipoTributo.EXP, imptBase, 0.00);
    }

    /**
     * Agregar impuesto global GRATUITO
     * @param {Number} imptBase, monto base gratuito
     * @param {Number} imptImpuesto, importe gratuito
     */
    agrImpuestoGra(imptBase=null, imptImpuesto=null) {
      this.agregarImp(TipoTributo.GRA, imptBase, imptImpuesto);
    }

    /**
     * Agregar impuesto global EXONERADO
     * @param {Number} imptBase, monto base exonerado
     */
    agrImpuestoExo(imptBase=null) {
      this.agregarImp(TipoTributo.EXO, imptBase, 0.00);
    }

    /**
     * Agregar impuesto global INAFECTO
     * @param {Number} imptBase, monto base inafecto
     */
    agrImpuestoIna(imptBase=null) {
      this.agregarImp(TipoTributo.INA, imptBase, 0.00);
    }

    /**
     * Agregar impuesto global OTROS TRIBUTOS
     * @param {Number} imptBase, monto base otros tributos
     * @param {Number} imptImpuesto, importe otros tributos
     */
    agrImpuestoOtros(imptBase=null, imptImpuesto=null) {
      this.agregarImp(TipoTributo.OTROS, imptBase, imptImpuesto);
    }
}

module.exports = CPEFactura;
