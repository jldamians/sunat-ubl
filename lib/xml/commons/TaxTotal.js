"use strict";

const poo = require('../../clases'),
      constants = require('../../constants');

const Element = require('../Element');

const XMLNS = constants.xmlns,
      CATALOGS = constants.catalogs,
      TRIBUTE_TYPE_CODES = constants.tributeTypeCodes,
      MEASURE_UNIT_TYPE_CODES = constants.measureUnitTypeCodes;

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

    if (impuesto.codigo !== TRIBUTE_TYPE_CODES.ICBPER) {
      // Consignar la base para el cálculo del impuesto
      taxSubtotalTag.xml
        .ele(`${XMLNS.getPrefix(super.prefix.cbc)}TaxableAmount`)
          .att('currencyID', impuesto.codMoneda)
          .txt(impuesto.base);
    }

    // Consignar el monto del impuesto
    taxSubtotalTag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}TaxAmount`)
        .att('currencyID', impuesto.codMoneda)
        .txt(impuesto.monto);

    if (impuesto instanceof poo.ImpuestoLinea === true) {
      if (impuesto.codigo === TRIBUTE_TYPE_CODES.ICBPER) {
        // Consignar la cantidad de bolsas de plástico
        taxSubtotalTag.xml
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}BaseUnitMeasure`)
            .att('unitCode', MEASURE_UNIT_TYPE_CODES.NIU)
            .txt(impuesto.base);
      }
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
      impuesto instanceof poo.ImpuestoLinea === true
    );

    const isPlasticBagTax = (
      impuesto.codigo === TRIBUTE_TYPE_CODES.ICBPER
    );

    const taxCategoryTag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}TaxCategory`);

    taxCategoryTag.create();

    // Consignar el código de categoria del impuesto
    taxCategoryTag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
        .att('schemeID', 'UN/ECE 5305')
        .att('schemeName', 'Codigo de tributos')
        .att('schemeAgencyName', 'PE:SUNAT')
        .txt(TRIBUTE_TYPE_CODES.getCategory(impuesto.codigo));

    if (isDetailTax === true) {
      if (isPlasticBagTax === false) {
        // Consignar la tasa del impuesto
        taxCategoryTag.xml
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Percent`)
            .txt(impuesto.tasa);
      } else {
        // Consignar el monto unitario del impuesto
        taxCategoryTag.xml
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}PerUnitAmount`)
            .att('currencyID', this._tributo.codMoneda)
            .txt(impuesto.tasa);
      }

      if (impuesto.tipoAfectacionIgv !== null) {
        // Consignar el código de afectación del igv
        taxCategoryTag.xml
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}TaxExemptionReasonCode`)
            .att('listAgencyName', 'PE:SUNAT')
            .att('listName', CATALOGS.getName(CATALOGS.CATALOG_07))
            .att('listURI', CATALOGS.getURI(CATALOGS.CATALOG_07))
            .txt(impuesto.tipoAfectacionIgv);
      }

      if (impuesto.tipoAfectacionIsc !== null) {
        // Consignar el código de sistema de cálculo del isc
        taxCategoryTag.xml
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}TierRange`)
            .txt(impuesto.tipoAfectacionIsc);
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
        .att('schemeAgencyName', 'PE:SUNAT')
        .att('schemeName', CATALOGS.getName(CATALOGS.CATALOG_05))
        .att('schemeURI', CATALOGS.getURI(CATALOGS.CATALOG_05))
        .txt(impuesto.codigo);

    // Consignar el nombre de impuesto
    taxSchemeTag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Name`)
        .txt(TRIBUTE_TYPE_CODES.getName(impuesto.codigo));

    // Consignar el código internacional de impuesto
    taxSchemeTag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}TaxTypeCode`)
        .txt(TRIBUTE_TYPE_CODES.getInternationalCode(impuesto.codigo));

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
        .txt(this._tributo.mntTotal);
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
