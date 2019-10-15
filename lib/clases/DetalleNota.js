"use strict";

const {
  TipoPrecioVenta,
} = require('sunat-catalogs');

const ImpuestoLineaIgv = require('./ImpuestoLineaIgv'),
      ImpuestoLineaIsc = require('./ImpuestoLineaIsc'),
      ImpuestoLineaOtros = require('./ImpuestoLineaOtros'),
      ImpuestoLineaIcbper = require('./ImpuestoLineaIcbper');

class DetalleNota {
  constructor(
    codInterno=null,
    descripcion=null,
    codMedida=null,
    cantidad=null,
    imptValorUnit=null,
    imptVenta=null,
    imptTributo=null
  ) {
    this._codMedida = codMedida;
    this._cantidad = cantidad;
    this._codInterno = codInterno;
    this._descripcion = descripcion;
    this._imptValorUnit = imptValorUnit;
    this._imptVenta = imptVenta;
    this._imptTributo = imptTributo;
    this._nroOrden = null;
    this._codMoneda = null;
    this._codUnspsc = null;
    this._codGtin = null;
    this._tipoPrecioUnit = null;
    this._imptPrecioUnit = null;
    this._impuestos = [];
  }

  // Getters
    get nroOrden() {
      return this._nroOrden;
    }
    get codMedida() {
      return this._codMedida;
    }
    get cantidad() {
      return this._cantidad;
    }
    get codInterno() {
      return this._codInterno;
    }
    get codUnspsc() {
      return this._codUnspsc;
    }
    get codGtin() {
      return this._codGtin;
    }
    get descripcion() {
      return this._descripcion;
    }
    get tipoPrecioUnit() {
      return this._tipoPrecioUnit;
    }
    get imptPrecioUnit() {
      return this._imptPrecioUnit;
    }
    get imptValorUnit() {
      return this._imptValorUnit;
    }
    get imptVenta() {
      return this._imptVenta;
    }
    get imptTributo() {
      return this._imptTributo;
    }
    get codMoneda() {
      return this._codMoneda;
    }
    get impuestos() {
      return this._impuestos;
    }

  // Methods
    /**
     * Definir tipo de moneda
     * @param {String} codMoneda, código del tipo de moneda
     */
    defCodMoneda(codMoneda=null) {
      this._codMoneda = codMoneda;
    }

    /**
     * Definir el número de orden del ítem
     * @param {Number} nroOrden, número de orden
     */
    defNroOrden(nroOrden=null) {
      this._nroOrden = nroOrden;
    }

    /**
     * Definir código de producto sunat
     * @param {String} codUnspsc, código estandar de producto
     */
    defCodUnspsc(codUnspsc=null) {
      this._codUnspsc = codUnspsc;
    }

    /**
     * Definir código de producto gtin
     * @param {String} codGtin, código mundial de un artículo comercial
     */
    defCodGtin(codGtin=null) {
      this._codGtin = codGtin;
    }

    /**
     * Definir precio unitario (incluye igv)
     * @param {Number} precio, precio unitario
     */
    defPrecioUnit(precio=null) {
      this._tipoPrecioUnit = TipoPrecioVenta.PRECIO_UNITARIO;

      this._imptPrecioUnit = precio;
    }

    /**
     * Definir valor referencial unitario en operaciones no onerosas (gratuitas)
     * @param {Number} valor, valor referencial unitario
     */
    defValorUnit(valor=null) {
      this._tipoPrecioUnit = TipoPrecioVenta.VALOR_REFERENCIAL_UNITARIO;

      this._imptPrecioUnit = valor;
    }

  /**
   * Agregar información del impuesto
   * @param {
    *  ImpuestoLineaIgv |
    *  ImpuestoLineaIsc |
    *  ImpuestoLineaIcbper |
    *  ImpuestoLineaOtros
    * } impuesto, información del impuesto
    */
   agrImpuesto(impuesto) {
     const ingresado = this._impuestos.find((imp) => {
       return impuesto.codImpuesto === imp.codImpuesto;
     });

     if (!ingresado) {
       this._impuestos.push(impuesto);
     } else {
       throw new Error(`El impuesto "${impuesto.codImpuesto}" fue agregado anteriormente`);
     }
   }

   /**
    * Definir icbper del detalle
    * @param {Number} imptBase, importe base del icbper
    * @param {Number} tasa, tasa del icbper
    * @param {Number} imptImpuesto, importe del icbper
    */
   agrImpuestoIcbper(imptBase, tasa, imptImpuesto) {
     const impuesto = new ImpuestoLineaIcbper(imptBase, tasa, imptImpuesto, this._codMoneda);

     this.agrImpuesto(impuesto);
   }

   /**
    * Definir igv del detalle
    * @param {String} codAfectacion, código del tipo de afectación del igv
    * @param {Number} imptBase, importe base del igv
    * @param {Number} tasa, tasa del igv
    * @param {Number} imptImpuesto, importe del igv
    */
   agrImpuestoIgv(codAfectacion, imptBase, tasa, imptImpuesto) {
     let precio;

     try {
       precio = new TipoPrecioVenta(super.tipoPrecio);
     } catch (error) {
       // Capturamos el error lanzando si el tipo de precio de venta unitario es incorrecto
       throw error;
     }

     const impuesto = new ImpuestoLineaIgv(
       codAfectacion, imptBase, tasa, imptImpuesto, precio.esOneroso(), this._codMoneda
     );

     this.agrImpuesto(impuesto);
   }

   /**
    * Definir isc del detalle
    * @param {String} codAfectacion, código del sistema de cálculo del isc
    * @param {Number} imptBase , importe base del isc
    * @param {Number} tasa , tasa del isc
    * @param {Number} imptImpuesto , importe del isc
    */
   agrImpuestoIsc(codAfectacion, imptBase, tasa, imptImpuesto) {
     const impuesto = new ImpuestoLineaIsc(
       codAfectacion, imptBase, tasa, imptImpuesto, this._codMoneda
     );

     this.agrImpuesto(impuesto);
   }

   /**
    * Definir otros tributos del detalle
    * @param {Number} imptBase, importe base del tributo
    * @param {Number} tasa, tasa del tributo
    * @param {Number} imptImpuesto, importe del tributo
    */
   agrImpuestoOtros(imptBase, tasa, imptImpuesto) {
     const impuesto = new ImpuestoLineaOtros(imptBase, tasa, imptImpuesto, this._codMoneda);

     this.agrImpuesto(impuesto);
   }
}

module.exports = DetalleNota;
