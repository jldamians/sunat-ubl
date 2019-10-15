"use strict";

const number2words = require('written-number');

const {
  Ubigeos,
  Leyenda,
  TipoTributo,
  TipoDocumento,
  CargoDescuento,
  DocumentoRelacionado,
  TipoDocumentoIdentidad,
} = require('sunat-catalogs');

const CPE = require('./CPE'),
      Cargo = require('./Cargo'),
      Receptor = require('./Receptor'),
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
    fechaVencimiento=null,
    codMoneda=null
  ) {
    super(TipoDocumento.FA, serie, numero, fechaEmision, horaEmision);

    this._codMoneda = codMoneda;
    this._tipoOperacion = tipoOperacion;
    this._fechaVencimiento = fechaVencimiento;

    this._imptTotalPrecio = null;
    this._imptTotalValor = null;
    this._imptTotalVenta = null;
    this._imptTotalDescuento = null;
    this._imptTotalCargo = null;
    this._imptRedondeo = null;
    this._imptTotalTributo = null;
    this._imptAnticipos = null;
    this._impuestos = [];
    this._anexos = [];
    this._anticipos = [];
    this._cargo = null;
    this._descuento = null;
    this._nroOrden = null;
  }

  // Getters
    get codMoneda() {
      return this._codMoneda;
    }
    get tipoOperacion() {
      return this._tipoOperacion;
    }
    get fechaVencimiento() {
      return this._fechaVencimiento;
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
    get imptAnticipos() {
      return this._imptAnticipos;
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
    get nroOrden() {
      return this._nroOrden;
    }

  // Methods
    /**
     * Definir los importes totales
     * @param {Number} imptTotalPrecio, total precio de venta
     * @param {Number} imptTotalValor, total valor de venta
     * @param {Number} imptTotalVenta, importe total de la venta
     * @param {Number} imptTotalTributo, monto total de tributos
     */
    /*defImportesTot(imptTotalPrecio=null, imptTotalValor=null, imptTotalVenta=null, imptTotalTributo=null) {
      this._imptTotalPrecio = imptTotalPrecio;
      this._imptTotalValor = imptTotalValor;
      this._imptTotalVenta = imptTotalVenta;
      this._imptTotalTributo = imptTotalTributo;
    }*/

    /**
     * Definir el precio total de venta
     * @param {Number} importe, precio total de venta
     */
    defImptPrecioTot(importe=null) {
      this._imptTotalPrecio = importe;
    }

    /**
     * Definir el valor total de venta
     * @param {Number} importe, valor total de venta
     */
    defImptValorTot(importe=null) {
      this._imptTotalValor = importe;
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

        this._notas.push({
          codNota: Leyenda.MONTO_LETRAS,
          descripcion: `${letras.toUpperCase()} Y ${decimal}/100 SOLES`,
        });
      }
    }

    /**
     * Definir el monto total de tributos
     * @param {Number} importe, monto total de tributos
     */
    defImptTributoTot(importe=null) {
      this._imptTotalTributo = importe;
    }

    /**
     * Definir la sumatoria de cargos
     * @param {Number} importe, sumatoria otros cargos (no afectan la base imponible del igv)
     */
    defImptCargoTot(importe=null) {
      this._imptTotalCargo = importe;
    }

    /**
     * Definir la sumatoria de descuentos
     * @param {Number} importe, sumatoria otros descuentos (no afectan la base imponible del igv)
     */
    defImptDescuentoTot(importe=null) {
      this._imptTotalDescuento = importe;
    }

    /**
     * Definir el monto de redondeo
     * @param {Number} importe, monto de redondeo del importe total
     */
    defImptRedondeo(importe=null) {
      this._imptRedondeo = importe;
    }

    /**
     * Definir el total de anticipos
     * @param {Number} importe, total de anticipos
     */
    defImptAnticipos(importe=null) {
      this._imptAnticipos = importe;
    }

    /**
     * Definir información del cargo global
     * @param {String} codCargo, código de motivo del cargo
     * @param {Number} tasaCargo, factor del cargo
     * @param {Number} imptBase, monto base del cargo
     * @param {Number} imptCargo, monto del cargo
     */
    defCargo(codCargo=null, tasaCargo=null, imptBase=null, imptCargo=null) {
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
    defDescuento(codDescuento=null, tasaDescuento=null, imptBase=null, imptDescuento=null) {
      const descuento = new CargoDescuento(codDescuento);

      if (descuento.esDescuentoGlb() === true) {
        this._descuento = new Descuento(
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
        const idPago = `${anticipo.codigoCat}-${serie}-${numero}`;

        const comprobante = new ComprobanteAnticipo(
          anticipo.codigoCat, serie, numero, idPago, imptAnticipo, fechaPago, this._codMoneda
        );

        comprobante.defEmisor(this._emisor.tipoDocumento, this._emisor.numeroDocumento);

        this._anticipos.push(comprobante);
      } else {
        throw new Error(`El cpe "${anticipo.codigoCat}-${serie}-${numero}" fue agregado anteriormente`);
      }
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
     * Agregar impuesto global ICBPER
     * @param {Number} imptBase, monto base icbper
     * @param {Number} imptImpuesto, importe icbper
     */
    agrImpuestoIcbper(imptBase=null, imptImpuesto=null) {
      this.agrImpuesto(TipoTributo.ICBPER, imptBase, imptImpuesto);
    }

    /**
     * Agregar impuesto global EXPORTACION
     * @param {Number} imptBase, monto base exportación
     */
    agrImpuestoExp(imptBase=null) {
      this.agrImpuesto(TipoTributo.EXP, imptBase, 0.00);
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
     * Agregar impuesto global EXONERADO
     * @param {Number} imptBase, monto base exonerado
     */
    agrImpuestoExo(imptBase=null) {
      this.agrImpuesto(TipoTributo.EXO, imptBase, 0.00);
    }

    /**
     * Agregar impuesto global INAFECTO
     * @param {Number} imptBase, monto base inafecto
     */
    agrImpuestoIna(imptBase=null) {
      this.agrImpuesto(TipoTributo.INA, imptBase, 0.00);
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
     * Agregar detalle a la factura
     * @param {DetalleFactura} detalle, detalle de la factura
     */
    agrDetalle(detalle) {
      // TODO: validar detalle repetidos
      this._detalle.push(detalle);
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
     * Definir la dirección del proveedor
     * @param {String} codUbigeo, código de ubigeo
     * @param {String} codPais, codigo de país
     * @param {String} direccion, dirección fiscal
     * @param {String} urbanizacion, urbanización
     */
    defDireccionRec(codUbigeo=null, codPais=null, direccion=null, urbanizacion=null) {
      let ubigeo;

      try {
        ubigeo = new Ubigeos(codUbigeo);
      } catch (error) {
        // Capturamos el error lanzando si el ubigeo es incorrecto
        throw error;
      }

      if (this._receptor === null) {
        throw new Error('No se ha definido la información del proveedor');
      }

      this._receptor.defDireccion(ubigeo.codigoCat, null, codPais, direccion, urbanizacion);
    }

    /**
     * Definir el número de la orden de compra o servicio
     * @param {String} nroOrden, número de la orden
     */
    defNroOrdenCompra(nroOrden=null) {
      this._nroOrden = nroOrden;
    }
}

module.exports = CPEFactura;
