"use strict";

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
  /**
   * @param {string} tipoComprobante, código del tipo de comprobante
   */
  constructor(
    detalle
    /*tipoDescuento = null,
    baseDescuento = null,
    tasaDescuento = null,
    mntDescuento = null,

    tipoCargo = null,
    baseCargo = null,
    tasaCargo = null,
    mntCargo = null,

    nroPlacaVehiculo = null*/
  ) {
    super();

    this._detalle = detalle;

    /*this._tipoDescuento = tipoDescuento;
    this._baseDescuento = baseDescuento;
    this._tasaDescuento = tasaDescuento;
    this._mntDescuento = mntDescuento;

    this._tipoCargo = tipoCargo;
    this._baseCargo = baseCargo;
    this._tasaCargo = tasaCargo;
    this._mntCargo = mntCargo;

    this._nroPlacaVehiculo = nroPlacaVehiculo;*/
  }

  /**
   * @function
   * Obtener el nombre para la etiqueta detalle
   * @return {String} Nombre de la etiqueta
   */
  _getDetailTagName() {
    let detailTag;

    if (this._detalle instanceof poo.DetalleFactura) {
      detailTag = 'InvoiceLine';
    } else if (this._detalle instanceof poo.DetalleBoleta) {
      detailTag = 'InvoiceLine';
    } else if (this._detalle instanceof poo.DetalleNotaCredito) {
      detailTag = 'CreditNoteLine';
    } else if (this._detalle instanceof poo.DetalleNotaDebito) {
      detailTag = 'DebitNoteLine';
    } else {
      throw new Error(`xyz`);
    }

    /*
      switch (this._detalle.tipoComprobante) {
        case DOCUMENT_TYPE_CODES.FA:
        case DOCUMENT_TYPE_CODES.BV:
          detailTag = 'InvoiceLine';

          break;
        case DOCUMENT_TYPE_CODES.NC:
          detailTag = 'CreditNoteLine';

          break;
        case DOCUMENT_TYPE_CODES.ND:
          detailTag = 'DebitNoteLine';

          break;
        default:
          throw new Error(`El tipo de comprobante no ha sido implementado: ${this._detalle.tipoComprobante}`);
      }
    */

    return detailTag;
  }

  /**
   * @function
   * Obtener el nombre para la etiqueta cantidad
   * @return {String} Nombre de la etiqueta
   */
  _getQuantityTagName() {
    let quantityTag;

    if (this._detalle instanceof poo.DetalleFactura) {
      quantityTag = 'InvoiceLine';
    } else if (this._detalle instanceof poo.DetalleBoleta) {
      quantityTag = 'InvoiceLine';
    } else if (this._detalle instanceof poo.DetalleNotaCredito) {
      quantityTag = 'CreditNoteLine';
    } else if (this._detalle instanceof poo.DetalleNotaDebito) {
      quantityTag = 'DebitNoteLine';
    } else {
      throw new Error(`xyz`);
    }

    /*
      switch (this._detalle.tipoComprobante) {
        case DOCUMENT_TYPE_CODES.FA:
        case DOCUMENT_TYPE_CODES.BV:
          quantityTag = 'InvoicedQuantity';

          break;
        case DOCUMENT_TYPE_CODES.NC:
          quantityTag = 'CreditedQuantity';

          break;
        case DOCUMENT_TYPE_CODES.ND:
          quantityTag = 'DebitedQuantity';

          break;
        default:
          throw new Error(`El tipo de comprobante no ha sido implementado: ${this._detalle.tipoComprobante}`);
      }
    */

    return quantityTag;
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
   *
   * @return {xmlbuilder} elemento xml
   */
  _IDTag() {
    const IDTag = super.create(`${XMLNS.getPrefix(super.prefix.cbc)}ID`);

    return IDTag
      .txt(this._item);
  }

  /**
   * Cantidad de unidades por item
   * @return {xmlbuilder} elemento xml
   */
  _quantityGenericTag() {
    const quantityTag = super.create(`${XMLNS.getPrefix(super.prefix.cbc)}${this._getQuantityTagName()}`);

    return quantityTag
      .att('unitCode', this._codMedida)
      .att('unitCodeListID', 'UN/ECE rec 20')
      .att('unitCodeListAgencyName', 'United Nations Economic Commission for Europe')
      .txt('');
  }

  /**
   * Valor de venta por item
   * @return {xmlbuilder} elemento xml
   */
  _lineExtensionAmountTag() {
    const lineExtensionAmountTag = super.create(`${XMLNS.getPrefix(super.prefix.cac)}LineExtensionAmount`);

    return lineExtensionAmountTag
      .att('currencyID', this._codMoneda)
      .txt(this._imptValorTotal);
  }

  /**
   * Precio de venta unitario o valor referencial unitario
   * @return {xmlbuilder} elemento xml
   */
  _pricingReferenceTag() {
    const pricingReferenceTag = super.create(`${XMLNS.getPrefix(super.prefix.cac)}PricingReference`);
    const alternativeConditionPriceTag = super.create(`${XMLNS.getPrefix(super.prefix.cac)}AlternativeConditionPrice`);

    // Si el código de tipo de precio de venta no existe,
    // el método en uso lanzará una excepción
    SALE_PRICE_TYPE_CODES.getText(this._tipoPrecioUnitario);

    if (this._isCostless() === false ) {
      if (this._tipoPrecioUnitario !== SALE_PRICE_TYPE_CODES.PRECIO) {
        throw new Error(
          `En operaciones "onerosas" debe utilizar: ${SALE_PRICE_TYPE_CODES.PRECIO}(${SALE_PRICE_TYPE_CODES.getText(SALE_PRICE_TYPE_CODES.PRECIO)})`
        );
      }
    } else {
      if (this._tipoPrecioUnitario !== SALE_PRICE_TYPE_CODES.VALOR) {
        throw new Error(
          `En operaciones "no onerosas" debe utilizar: ${SALE_PRICE_TYPE_CODES.PRECIO}(${SALE_PRICE_TYPE_CODES.getText(SALE_PRICE_TYPE_CODES.VALOR)})`
        );
      }
    }

    // importe
    alternativeConditionPriceTag
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}PriceAmount`)
        .att('currencyID', this._codMoneda)
        .txt(this._imptPrecioUnitario);

    // código de precio
    alternativeConditionPriceTag
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}PriceTypeCode`)
        .att('listAgencyName', 'PE:SUNAT')
        .att('listName', CATALOGS.getName(CATALOGS.CATALOG_16))
        .att('listURI', CATALOGS.getURI(CATALOGS.CATALOG_16))
        .txt(this._tipoPrecioUnitario);

    return pricingReferenceTag
      .importDocument(alternativeConditionPriceTag);
  }

  /**
   * Monto de las operaciones: afectación al IGV, IVAP o ISC
   * @return {xmlbuilder} elemento xml
   */
  _taxTotalTag() {
    const taxTotalTag = new TaxTotal(this._codMoneda, this._mntTributos, this._getTaxes());

    return taxTotalTag
      .toXMLElement();
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
   * @method _setDiscount
   * Agregar el tag con los datos de descuento
   * @param {xmlbuilder} xml
   */
  _setDiscount(xml) {
    const discountTypeCodes = [
      CHARGE_TYPE_CODES.DCTOS_ITEM_AFECTA_BASE_IGV_IVAP,
      CHARGE_TYPE_CODES.DCTOS_ITEM_NO_AFECTA_BASE_IGV_IVAP,
    ];

    if (this._tipoDescuento !== null && this._baseDescuento !== null && this._tasaDescuento !== null && this._mntDescuento !== null) {
      if (!discountTypeCodes.includes(this._tipoDescuento)) {
        throw new Error(`Catálogo Nro. 53, sólo están permitidos los códigos de descuento: ${discountTypeCodes.join(',')}`);
      }

      const discountTag = new AllowanceCharge(
        this._codMoneda, this._tipoDescuento, this._baseDescuento, this._tasaDescuento, this._mntDescuento
      );

      xml.importDocument(discountTag.toXMLElement());
    }
  }

  /**
   * @method _setCharge
   * Agregar el tag con los datos de cargo
   * @param {xmlbuilder} xml
   */
  _setCharge(xml) {
    const chargeTypeCodes = [
      CHARGE_TYPE_CODES.CARGOS_ITEM_AFECTA_BASE_IGV_IVAP,
      CHARGE_TYPE_CODES.CARGOS_ITEM_NO_AFECTA_BASE_IGV_IVAP,
    ];

    if (this._tipoCargo !== null && this._baseCargo !== null && this._tasaCargo !== null && this._mntCargo !== null) {
      if (!chargeTypeCodes.includes(this._tipoCargo)) {
        throw new Error(`Catálogo Nro. 53, sólo están permitidos los códigos de cargo: ${chargeTypeCodes.join(',')}`);
      }

      const chargeTag = new AllowanceCharge(
        this._codMoneda, this._tipoCargo, this._baseCargo, this._tasaCargo, this._mntCargo
      );

      xml.importDocument(chargeTag.toXMLElement());
    }
  }

  toXMLElement() {
    const lineTag = super.create(`${XMLNS.getPrefix(super.prefix.cac)}${this._getDetailTagName()}`);

    lineTag
      .importDocument(this._IDTag())
      .importDocument(this._quantityGenericTag())
      .importDocument(this._lineExtensionAmountTag())
      .importDocument(this._pricingReferenceTag());

    this._setDiscount(lineTag);
    this._setCharge(lineTag);

    lineTag.importDocument(this._taxTotalTag());

    return lineTag;
  }
}

module.exports = LineGenericTag;
