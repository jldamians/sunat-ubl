"use strict";

const pick = require('lodash.pick');

const Element = require('../Element'),
      TaxTotal = require('./TaxTotal'),
      AllowanceCharge = require('./AllowanceCharge');

const poo = require('../../clases'),
      constants = require('../../constants');

const XMLNS = constants.xmlns,
      CATALOGS = constants.catalogs,
      CHARGE_TYPE_CODES = constants.chargeTypeCodes,
      TRIBUTE_TYPE_CODES = constants.tributeTypeCodes,
      DOCUMENT_TYPE_CODES = constants.documentTypeCodes,
      CURRENCY_TYPE_CODES = constants.currencyTypeCodes,
      SALE_PRICE_TYPE_CODES = constants.salePriceTypeCodes,
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

    return costless;
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
   * Crea la etiqueta "AdditionalItemProperty", con información
   * del "Catálogo Nro. 55 - Código de Identificación del Concepto Tributario"
   * @param {string} tributeConceptCode, código de concepto tributario
   * @param {string} value, valor relacionado al concepto tributario
   * @return {xmlbuilder} elemento xml
   */
  _additionalItemPropertyTag(tributeConceptCode, value) {
    const additionalItemPropertyTag = super.create(`${XMLNS.getPrefix(super.prefix.cac)}AdditionalItemProperty`);

    additionalItemPropertyTag
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Name`) // nombre del concepto tributario
        .txt(TRIBUTE_CONCEPT_CODES.getName(tributeConceptCode))
      .up()
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}NameCode`) // código del concepto tributario
        .att('listAgencyName', 'PE:SUNAT')
        .att('listName', CATALOGS.getName(CATALOGS.CATALOG_55))
        .att('listURI', CATALOGS.getURI(CATALOGS.CATALOG_55))
        .txt(tributeConceptCode)
      .up()
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Value`) // valor del concepto tributario
        .txt(value);

    return additionalItemPropertyTag;
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
      .txt(this._detalle.imptValorTotal);

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
        .txt(this._detalle.imptPrecioUnitario);

    // Consignar el código del precio
    tag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}PriceTypeCode`)
        .att('listAgencyName', 'PE:SUNAT')
        .att('listName', CATALOGS.getName(CATALOGS.CATALOG_16))
        .att('listURI', CATALOGS.getURI(CATALOGS.CATALOG_16))
        .txt(this._detalle.tipoPrecioUnitario);

    return tag.xml;
  }

  /**
   * @method
   * Agregar el precio unitario por ítem
   */
  _setPricingReferenceTag() {
    // Si el código de tipo de precio de venta no existe,
    // el método en uso lanzará una excepción
    SALE_PRICE_TYPE_CODES.getText(this._detalle.tipoPrecioUnitario);

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
    }

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

    const tag = new TaxTotal(this._detalle.tributo, prefix);

    super.xml.importDocument(tag.toXMLElement());
  }

  /**
   *
   * @return {xmlbuilder} elemento xml
   */
  _itemTag() {
    const itemTag = super.create(`${XMLNS.getPrefix(super.prefix.cac)}Item`);

    const REGEXP = {
      vehicleLicensePlate: /(^[A-Z]{2}-[1-9]{4}$)|(^[A-Z]{3}-[1-9]{3}$)/,
      //vehicleLicensePlate: /^[A-Z]{3}-[1-9]{3}|^[A-Z]{1}[1-9]{1}[A-Z]{1}-[1-9]{3}|^[1-9]{4}-[A-Z,1-9]{2}|^[A-Z]{2}-[1-9]{4}$/,
    };

    // Descripción detalla indicando las características
    itemTag
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Description`)
        .txt('');

    // Código de producto
    itemTag
      .ele(`${XMLNS.getPrefix(super.prefix.cac)}SellersItemIdentification`)
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
          .txt('');

    // Código de producto GS1
    itemTag
      .ele(`${XMLNS.getPrefix(super.prefix.cac)}StandardItemIdentification`)
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
          .att('schemeID', 'Tipo de estructura GTIN')
          .txt('');

    // Código de producto SUNAT
    itemTag
      .ele(`${XMLNS.getPrefix(super.prefix.cac)}CommodityClassification`)
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ItemClassificationCode`)
          .att('listID', 'UNSPSC')
          .att('listAgencyName', 'GS1 US')
          .att('listName', 'Item Classification')
          .txt('');

    // Número de placa del vehículo
    if (this._nroPlacaVehiculo !== null) {
      const correctLicensePlateFormat = REGEXP.vehicleLicensePlate.test(this._nroPlacaVehiculo);

      if (correctLicensePlateFormat === false) {
        throw new Error(`El formato de número de placa del vehículo es incorrecto: ${this._nroPlacaVehiculo}`);
      }

      itemTag.importDocument(this._additionalItemPropertyTag(
        TRIBUTE_CONCEPT_CODES.GTOS_RENTA_NRO_PLACA, this._nroPlacaVehiculo
      ));
    }

    return itemTag;
  }

  /**
   * Valor unitario por item: Se consignará el importe correspondiente al valor o monto unitario,
   * este importe no incluye los tributos (IGV, ISC y otros tributos), ni los cargos globales
   * @return {xmlbuilder} elemento xml
   */
  _priceTag() {
    const priceTag = super.create(`${XMLNS.getPrefix(super.prefix.cac)}Price`);

    return priceTag
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}PriceAmount`)
      .att('currencyID', this._codMoneda)
      .txt(this._imptValorUnitario);
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

    return super.xml;
  }
}

module.exports = LineGenericTag;
