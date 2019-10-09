"use strict";

const pick = require('lodash.pick');

const {
  TipoPrecioVenta,
} = require('sunat-catalogs');

const {
  Tributo,
} = require('../../clases');

const Element = require('../Element'),
      TaxTotal = require('./TaxTotal'),
      AllowanceCharge = require('./AllowanceCharge');

const constants = require('../../constants');

const XMLNS = constants.xmlns,
      CATALOGS = constants.catalogs,
      CHARGE_TYPE_CODES = constants.chargeTypeCodes,
      TRIBUTE_TYPE_CODES = constants.tributeTypeCodes,
      TRIBUTE_CONCEPT_CODES = constants.tributeConceptCodes,
      CALCULATION_TYPE_CODES = constants.calculationTypeCodes,
      AFFECTATION_TYPES_CODES = constants.affectationTypeCodes;

class LineGenericTag extends Element {
  constructor(detalle, prefix) {
    super(null, prefix);

    this._detalle = detalle;
  }

  /**
   * Determina si la operación es ONEROSA o NO ONEROSA
   * @return {Boolean}
   */
  _isCostless() {
    const costlessAffectationTypeCodes = [
      AFFECTATION_TYPES_CODES.GRAVADO_PREMIO,
      AFFECTATION_TYPES_CODES.GRAVADO_DONACION,
      AFFECTATION_TYPES_CODES.GRAVADO_RETIRO,
      AFFECTATION_TYPES_CODES.GRAVADO_PUBLICIDAD,
      AFFECTATION_TYPES_CODES.GRAVADO_BONIFICACION,
      AFFECTATION_TYPES_CODES.GRAVADO_ENTREGA_TRABAJADOR,
      AFFECTATION_TYPES_CODES.EXONERADO_GRATUITA,
      AFFECTATION_TYPES_CODES.INAFECTO_BONIFICA,
      AFFECTATION_TYPES_CODES.INAFECTO_RETIRO,
      AFFECTATION_TYPES_CODES.INAFECTO_MUESTRA_MEDICA,
      AFFECTATION_TYPES_CODES.INAFECTO_CONVENIO_COLECTIVO,
      AFFECTATION_TYPES_CODES.INAFECTO_PREMIO,
      AFFECTATION_TYPES_CODES.INAFECTO_PUBLICIDAD,
      AFFECTATION_TYPES_CODES.INAFECTO_GRATUITA,
    ];

    const costless = costlessAffectationTypeCodes.includes(this._tipoAfectacionIgv);

    return costless === true;
  }

  /**
   * Obtener el código de tipo de tributo
   * @return {String} código de tipo de tributo
   */
  _getTributeTypeCode() {
    let tributeTypeCode;

    // Si el código de afectación no existe,
    // el método en uso lanzará una excepción
    AFFECTATION_TYPES_CODES.getText(this._tipoAfectacionIgv);

    switch (this._tipoAfectacionIgv) {
      case AFFECTATION_TYPES_CODES.GRAVADO_ONEROSA:
        tributeTypeCode = TRIBUTE_TYPE_CODES.IGV;

        break;
      case AFFECTATION_TYPES_CODES.GRAVADO_PREMIO:
      case AFFECTATION_TYPES_CODES.GRAVADO_DONACION:
      case AFFECTATION_TYPES_CODES.GRAVADO_RETIRO:
      case AFFECTATION_TYPES_CODES.GRAVADO_PUBLICIDAD:
      case AFFECTATION_TYPES_CODES.GRAVADO_BONIFICACION:
      case AFFECTATION_TYPES_CODES.GRAVADO_ENTREGA_TRABAJADOR:
      case AFFECTATION_TYPES_CODES.EXONERADO_GRATUITA:
      case AFFECTATION_TYPES_CODES.INAFECTO_BONIFICA:
      case AFFECTATION_TYPES_CODES.INAFECTO_RETIRO:
      case AFFECTATION_TYPES_CODES.INAFECTO_MUESTRA_MEDICA:
      case AFFECTATION_TYPES_CODES.INAFECTO_CONVENIO_COLECTIVO:
      case AFFECTATION_TYPES_CODES.INAFECTO_PREMIO:
      case AFFECTATION_TYPES_CODES.INAFECTO_PUBLICIDAD:
      case AFFECTATION_TYPES_CODES.INAFECTO_GRATUITA:
        tributeTypeCode = TRIBUTE_TYPE_CODES.GRA;

        break;
      case AFFECTATION_TYPES_CODES.GRAVADO_IVAP:
        tributeTypeCode = TRIBUTE_TYPE_CODES.IVAP;

        break;

      case AFFECTATION_TYPES_CODES.EXONERADO_ONEROSA:
        tributeTypeCode = TRIBUTE_TYPE_CODES.EXO;

        break;

      case AFFECTATION_TYPES_CODES.INAFECTO_ONEROSA:
        tributeTypeCode = TRIBUTE_TYPE_CODES.INA;

        break;
      case AFFECTATION_TYPES_CODES.EXPORTACION:
        tributeTypeCode = TRIBUTE_TYPE_CODES.EXP;

        break;
    }

    return tributeTypeCode;
  }

  /**
   * Obtener la información de los impuestos
   * @return {Array}
   */
  _getTaxes() {
    const taxes = [];

    // la información de afectación al igv debe ser obligatoria
    taxes.push({
      codigo: this._getTributeTypeCode(),
      base: this._baseAfectacionIgv,
      monto: this._mntAfectacionIgv,
      tasa: this._tasaAfectacionIgv,
      tipoAfectacionIgv: this._tipoAfectacionIgv,
    });

    // la información del calculo del isc debe ser opcional
    if (this._tipoCalculoIsc !== null && this._baseCalculoIsc !== null && this._mntCalculoIsc !== null && this._tasaCalculoIsc !== null) {
      // Si el código de cálculo no existe,
      // el método en uso lanzará una excepción
      CALCULATION_TYPE_CODES.getText(this._tipoCalculoIsc);

      taxes.push({
        codigo: TRIBUTE_TYPE_CODES.ISC,
        base: this._baseCalculoIsc,
        monto: this._mntCalculoIsc,
        tasa: this._tasaCalculoIsc,
        tipoAfectacionIgv: this._tipoCalculoIsc,
      });
    }

    return taxes;
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
        .txt(TRIBUTE_CONCEPT_CODES.getText(concepto.codigo));

    tag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}NameCode`)
        .att('listAgencyName', 'PE:SUNAT')
        .att('listName', CATALOGS.getName(CATALOGS.CATALOG_55))
        .att('listURI', CATALOGS.getURI(CATALOGS.CATALOG_55))
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
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}${this._detalle.getQuantityTagName()}`);

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
    // Si el código de tipo de precio de venta no existe,
    // el método en uso lanzará una excepción
    /*SALE_PRICE_TYPE_CODES.getText(this._detalle.tipoPrecioUnitario);

    if (this._isCostless() === false ) {
      if (this._detalle.tipoPrecioUnitario !== SALE_PRICE_TYPE_CODES.PRECIO) {
        throw new Error(
          `En operaciones "onerosas" debe utilizar: ${SALE_PRICE_TYPE_CODES.PRECIO}(${SALE_PRICE_TYPE_CODES.getText(SALE_PRICE_TYPE_CODES.PRECIO)})`
        );
      }
    } else {
      if (this._detalle.tipoPrecioUnitario !== SALE_PRICE_TYPE_CODES.VALOR) {
        throw new Error(
          `En operaciones "no onerosas" debe utilizar: ${SALE_PRICE_TYPE_CODES.PRECIO}(${SALE_PRICE_TYPE_CODES.getText(SALE_PRICE_TYPE_CODES.VALOR)})`
        );
      }
    }*/

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
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const discountTypeCodes = [
      CHARGE_TYPE_CODES.DCTOS_ITEM_AFECTA_BASE_IGV_IVAP,
      CHARGE_TYPE_CODES.DCTOS_ITEM_NO_AFECTA_BASE_IGV_IVAP,
    ];

    if (this._detalle.descuento !== null) {
      if (!discountTypeCodes.includes(this._detalle.descuento.codigo)) {
        throw new Error(`Catálogo Nro. 53, sólo están permitidos los códigos de descuento: ${discountTypeCodes.join(',')}`);
      }

      const tag = new AllowanceCharge(this._detalle.descuento, prefix);

      super.xml.importDocument(tag.toXMLElement());
    }
  }

  /**
   * @method
   * Agregar los cargos
   */
  _setChargeTag() {
    const prefix = pick(super.prefix, ['cac', 'cbc']);

    const chargeTypeCodes = [
      CHARGE_TYPE_CODES.CARGOS_ITEM_AFECTA_BASE_IGV_IVAP,
      CHARGE_TYPE_CODES.CARGOS_ITEM_NO_AFECTA_BASE_IGV_IVAP,
    ];

    if (this._detalle.cargo !== null) {
      if (!chargeTypeCodes.includes(this._detalle.cargo.codigo)) {
        throw new Error(`Catálogo Nro. 53, sólo están permitidos los códigos de cargo: ${chargeTypeCodes.join(',')}`);
      }

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
    const xmlName = `${XMLNS.getPrefix(super.prefix.cac)}${this._detalle.getDetailTagName()}`;

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
