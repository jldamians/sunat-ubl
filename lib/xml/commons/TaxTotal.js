"use strict";

const {
  TipoTributo,
  TipoUnidadMedida,
  TipoAfectacionIgv,
} = require('sunat-catalogs');

const {
  ImpuestoLineaIgv,
  ImpuestoLineaIsc,
  ImpuestoLineaOtros,
  ImpuestoLineaIcbper,
} = require('../../clases');

const constants = require('../../constants');

const Element = require('../Element');

const XMLNS = constants.xmlns;

class TaxTotal extends Element {
  /**
   * @constructor
   * @param {Tributo} tributo, información de los tributo (impuestos)
   * @param {Object} prefix, prefijos de los namespace
   */
  constructor(tributo, prefix) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}TaxTotal`;

    super(xmlName, prefix);

    this._tributo = tributo;
  }

  /**
   * @function
   * Crear la etiqueta TaxSubtotal
   * @param {ImpuestoLinea | ImpuestoGlobal} impuesto, información del impuesto
   * @return {xmlbuilder}
   */
  _taxSubtotalTag(impuesto) {
    const taxSubtotalTag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}TaxSubtotal`);

    taxSubtotalTag.create();

    if (impuesto.codImpuesto !== TipoTributo.ICBPER) {
      // Consignar la base para el cálculo del impuesto
      taxSubtotalTag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}TaxableAmount`)
          .att('currencyID', impuesto.codMoneda)
          .txt(impuesto.imptBase);
    }

    // Consignar el monto del impuesto
    taxSubtotalTag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}TaxAmount`)
        .att('currencyID', impuesto.codMoneda)
        .txt(impuesto.imptImpuesto);

    if (impuesto instanceof ImpuestoLineaIcbper === true) {
      // Consignar la cantidad de bolsas de plástico
      taxSubtotalTag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}BaseUnitMeasure`)
          .att('unitCode', TipoUnidadMedida.UNIDAD_INTERNACIONAL)
          .txt(impuesto.imptBase);
    }

    taxSubtotalTag.xml.importDocument(this._taxCategoryTag(impuesto));

    return taxSubtotalTag.xml;
  }

  /**
   * @function
   * Crear la etiqueta TaxCategory
   * @param {ImpuestoLinea | ImpuestoGlobal} impuesto, información del impuesto
   * @return {xmlbuilder}
   */
  _taxCategoryTag(impuesto) {
    const isDetailTax = (
      impuesto instanceof ImpuestoLineaIgv === true ||
      impuesto instanceof ImpuestoLineaIsc === true ||
      impuesto instanceof ImpuestoLineaOtros === true ||
      impuesto instanceof ImpuestoLineaIcbper === true
    );

    const taxCategoryTag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}TaxCategory`);

    taxCategoryTag.create();

    // Consignar el código de categoria del impuesto
    taxCategoryTag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
        .att('schemeID', 'UN/ECE 5305')
        .att('schemeName', TipoTributo.nombreCat)
        .att('schemeAgencyName', TipoTributo.agenciaCat)
        .txt(impuesto.categoria);

    if (isDetailTax === true) {
      if (impuesto instanceof ImpuestoLineaIcbper === true) {
        // Consignar el monto unitario del impuesto
        taxCategoryTag.xml
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}PerUnitAmount`)
            .att('currencyID', impuesto.codMoneda)
            .txt(impuesto.tasa);
      } else {
        // Consignar la tasa del impuesto
        taxCategoryTag.xml
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Percent`)
            .txt(impuesto.tasa);
      }

      if (impuesto instanceof ImpuestoLineaIgv === true) {
        // Consignar el código de afectación del igv
        taxCategoryTag.xml
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}TaxExemptionReasonCode`)
            .att('listAgencyName', TipoAfectacionIgv.agenciaCat)
            .att('listName', TipoAfectacionIgv.nombreCat)
            .att('listURI', TipoAfectacionIgv.uriCat)
            .txt(impuesto.codAfectacionIgv);
      }

      if (impuesto instanceof ImpuestoLineaIsc === true) {
        // Consignar el código de sistema de cálculo del isc
        taxCategoryTag.xml
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}TierRange`)
            .txt(impuesto.codAfectacionIsc);
      }
    }

    taxCategoryTag.xml.importDocument(this._taxSchemeTag(impuesto));

    return taxCategoryTag.xml;
  }

  /**
   * @function
   * Crear la etiqueta TaxScheme
   * @param {ImpuestoLinea | ImpuestoGlobal} impuesto, información del impuesto
   * @return {xmlbuilder}
   */
  _taxSchemeTag(impuesto) {
    const taxSchemeTag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}TaxScheme`);

    taxSchemeTag.create();

    // Consignar el código de impuesto
    taxSchemeTag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
        .att('schemeID', 'UN/ECE 5153')
        .att('schemeAgencyName', TipoTributo.agenciaCat)
        .att('schemeName', TipoTributo.nombreCat)
        .att('schemeURI', TipoTributo.uriCat)
        .txt(impuesto.codImpuesto);

    // Consignar el nombre de impuesto
    taxSchemeTag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Name`)
        .txt(impuesto.nombre);

    // Consignar el código internacional de impuesto
    taxSchemeTag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}TaxTypeCode`)
        .txt(impuesto.codInternacional);

    return taxSchemeTag.xml;
  }

  /**
   * @method
   * Agregar el monto total de impuestos
   */
  _setTaxAmountTag() {
    const tagName = `${XMLNS.getPrefix(super.prefix.cbc)}TaxAmount`;

    super.xml
      .ele(tagName)
        .att('currencyID', this._tributo.codMoneda)
        .txt(this._tributo.imptTotal);
  }

  /**
   * @method
   * Agregar los impuestos
   */
  _setTaxSubtotalTag() {
    this._tributo.impuestos.forEach((impuesto) => {
      super.xml.importDocument(this._taxSubtotalTag(impuesto));
    });
  }

  /**
   * @function
   * Obtener el elemento xml
   * @return {xmlbuilder}
   */
  toXMLElement() {
    super.create();

    this._setTaxAmountTag();

    this._setTaxSubtotalTag();

    return super.xml;
  }
}

module.exports = TaxTotal;
