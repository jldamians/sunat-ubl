"use strict";

const pick = require('lodash.pick');

const {
  TipoPrecioVenta,
  ConceptoTributario,
} = require('sunat-catalogs');

const {
  Tributo,
  DetalleFactura,
  DetalleNotaDebito,
  DetalleNotaCredito,
} = require('../../clases');

const Element = require('../Element'),
      TaxTotal = require('./TaxTotal'),
      AllowanceCharge = require('./AllowanceCharge');

const constants = require('../../constants');

const XMLNS = constants.xmlns;

class LineGenericTag extends Element {
  constructor(detalle, prefix) {
    super(null, prefix);

    this._detalle = detalle;
  }

  /**
   * @function
   * Crear la etiqueta AdditionalItemProperty
   * @param {ConceptoTributario} concepto, información del concepto
   * @return {xmlbuilder}
   */
  _additionalItemPropertyTag(concepto) {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}AdditionalItemProperty`);

    tag.create();

    tag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Name`)
        .txt(concepto.nombre);

    tag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}NameCode`)
        .att('listAgencyName', 'PE:SUNAT')
        .att('listName', ConceptoTributario.nombreCat)
        .att('listURI', ConceptoTributario.uriCat)
        .txt(concepto.codigo);

    tag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Value`)
        .txt(concepto.valor);

    return tag.xml;
  }

  /**
   * @method
   * Agregar número de orden del ítem
   */
  _setIDTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}ID`);

    tag.create();

    tag.xml.txt(this._detalle.secuencial);

    super.xml.importDocument(tag.xml);
  }

  /**
   * @method
   * Agregar cantidad de unidades por ítem
   */
  _setQuantityTag() {
    let tagName;

    if (this._detalle instanceof DetalleFactura === true) {
      tagName = 'InvoicedQuantity';
    } else if (this._detalle instanceof DetalleNotaCredito === true) {
      tagName = 'CreditedQuantity';
    } else if (this._detalle instanceof DetalleNotaDebito === true) {
      tagName = 'DebitedQuantity';
    }

    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}${tagName}`);

    tag.create();

    tag.xml
      .att('unitCode', this._detalle.codMedida)
      .att('unitCodeListID', 'UN/ECE rec 20')
      .att('unitCodeListAgencyName', 'United Nations Economic Commission for Europe')
      .txt(this._detalle.cantidad);

    super.xml.importDocument(tag.xml);
  }

  /**
   * @method
   * Valor de venta por item
   */
  _setLineExtensionAmountTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}LineExtensionAmount`);

    tag.create();

    tag.xml
      .att('currencyID', this._detalle.codMoneda)
      .txt(this._detalle.imptVenta);

    super.xml.importDocument(tag.xml);
  }

  /**
   * @function
   * Crear un elemento con información del tipo de precio
   * @return {xmlbuilder}
   */
  _alternativeConditionPriceTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}AlternativeConditionPrice`);

    tag.create();

    // Consignar el valor del precio
    tag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}PriceAmount`)
        .att('currencyID', this._detalle.codMoneda)
        .txt(this._detalle.imptPrecio);

    // Consignar el código del precio
    tag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}PriceTypeCode`)
        .att('listAgencyName', 'PE:SUNAT')
        .att('listName', TipoPrecioVenta.nombreCat)
        .att('listURI', TipoPrecioVenta.uriCat)
        .txt(this._detalle.tipoPrecio);

    return tag.xml;
  }

  /**
   * @method
   * Agregar el precio unitario por ítem
   */
  _setPricingReferenceTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}PricingReference`);

    tag.create();

    tag.xml.importDocument(this._alternativeConditionPriceTag());

    super.xml.importDocument(tag.xml);
  }

  /**
   * @method
   * Agregar los impuestos por ítem
   */
  _setTaxTotalTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const tributo = new Tributo(this._detalle.codMoneda, this._detalle.imptTributo);

    this._detalle.impuestos.forEach((impuesto) => {
      if (impuesto.codMoneda === null) {
        impuesto.defCodMoneda(this._detalle.codMoneda);
      }

      tributo.agrImpuesto(impuesto);
    });

    const tag = new TaxTotal(tributo, prefix);

    super.xml.importDocument(tag.toXMLElement());
  }

  /**
   * @method
   * Agregar información del producto
   */
  _setItemTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}Item`);

    tag.create();

    // Consignar la descripción detallada
    tag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Description`)
        .txt(this._detalle.descripcion);

    if (this._detalle.codInterno !== null) {
      // Consignar el código de producto
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cac)}SellersItemIdentification`)
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
            .txt(this._detalle.codInterno);
    }

    if (this._detalle.codGtin !== null) {
      // Consignar el código de producto GTIN
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cac)}StandardItemIdentification`)
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
            .att('schemeID', 'Tipo de estructura GTIN')
            .txt(this._detalle.codGtin);
    }

    if (this._detalle.codUnspsc !== null) {
      // Consignar el código de producto UNSPSC
      tag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cac)}CommodityClassification`)
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ItemClassificationCode`)
            .att('listID', 'UNSPSC')
            .att('listAgencyName', 'GS1 US')
            .att('listName', 'Item Classification')
            .txt(this._detalle.codUnspsc);
    }

    // Consignar información adicional
    this._detalle.conceptos.forEach((concepto) => {
      tag.xml.importDocument(this._additionalItemPropertyTag(concepto));
    });

    super.xml.importDocument(tag.xml);
  }

  /**
   * @method
   * Agregar el importe del valor unitario
   */
  _setPriceTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}Price`);

    tag.create();

    tag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}PriceAmount`)
        .att('currencyID', this._detalle.codMoneda)
        .txt(this._detalle.imptValor);

    super.xml.importDocument(tag.xml);
  }

  /**
   * @method
   * Agregar los descuentos
   */
  _setDiscountTag() {
    if (this._detalle.descuento !== null) {
      const prefix = pick(super.prefix, ['cac', 'cbc']);

      this._detalle.descuento.defCodMoneda(this._detalle.codMoneda);

      const tag = new AllowanceCharge(this._detalle.descuento, prefix);

      super.xml.importDocument(tag.toXMLElement());
    }
  }

  /**
   * @method
   * Agregar los cargos
   */
  _setChargeTag() {
    if (this._detalle.cargo !== null) {
      const prefix = pick(super.prefix, ['cac', 'cbc']);

      this._detalle.cargo.defCodMoneda(this._detalle.codMoneda);

      const tag = new AllowanceCharge(this._detalle.cargo, prefix);

      super.xml.importDocument(tag.toXMLElement());
    }
  }

  /**
   * @function
   * Obtener el elemento xml
   * @return {xmlbuilder}
   */
  toXMLElement() {
    let tagName;

    if (this._detalle instanceof DetalleFactura === true) {
      tagName = 'InvoiceLine';
    } else if (this._detalle instanceof DetalleNotaCredito === true) {
      tagName = 'CreditNoteLine';
    } else if (this._detalle instanceof DetalleNotaDebito === true) {
      tagName = 'DebitNoteLine';
    }

    const xmlName = `${XMLNS.getPrefix(super.prefix.cac)}${tagName}`;

    super.create(xmlName);

    this._setIDTag();

    this._setQuantityTag();

    this._setLineExtensionAmountTag();

    this._setPricingReferenceTag();

    this._setDiscountTag();

    this._setChargeTag();

    this._setTaxTotalTag();

    this._setItemTag();

    this._setPriceTag();

    return super.xml;
  }
}

module.exports = LineGenericTag;
