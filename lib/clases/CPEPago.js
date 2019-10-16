"use strict";

const {
  Ubigeos,
  CargoDescuento,
  DocumentoRelacionado,
} = require('sunat-catalogs');

const Cargo = require('./Cargo'),
      Descuento = require('./Descuento'),
      CPEGeneral = require('./CPEGeneral'),
      ComprobanteAnticipo = require('./ComprobanteAnticipo');

class CPEPago extends CPEGeneral {
  constructor(
    tipoCpe=null,
    tipoOperacion=null,
    serie=null,
    numero=null,
    fechaEmision=null,
    horaEmision = null,
    codMoneda=null
  ) {
    super(tipoCpe, serie, numero, fechaEmision, horaEmision, codMoneda);

    this._tipoOperacion = tipoOperacion;
    this._anticipos = [];
    this._imptTotalPrecio = null;
    this._imptTotalValor = null;
    this._imptTotalDescuento = null;
    this._imptAnticipos = null;
    this._cargo = null;
    this._descuento = null;
  }

  // Getters
    get tipoOperacion() {
      return this._tipoOperacion;
    }
    get imptTotalPrecio() {
      return this._imptTotalPrecio;
    }
    get imptTotalValor() {
      return this._imptTotalValor;
    }
    get imptTotalDescuento() {
      return this._imptTotalDescuento;
    }
    get imptAnticipos() {
      return this._imptAnticipos;
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
     * Definir la sumatoria de descuentos
     * @param {Number} importe, sumatoria otros descuentos (no afectan la base imponible del igv)
     */
    defImptDescuentoTot(importe=null) {
      this._imptTotalDescuento = importe;
    }

    /**
     * Definir el total de anticipos
     * @param {Number} importe, total de anticipos
     */
    defImptAnticipos(importe=null) {
      this._imptAnticipos = importe;
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
}

module.exports = CPEPago;
