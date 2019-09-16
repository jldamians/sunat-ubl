"use strict";

const { TipoTributo, TipoAfectacionIgv } = require('sunat-catalogs');

const poo = require('../../clases'),
      constants = require('../../constants');

const Element = require('../Element');

const XMLNS = constants.xmlns,
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

    if (impuesto.codigo !== TipoTributo.ICBPER) {
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
      if (impuesto.codigo === TipoTributo.ICBPER) {
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
      impuesto.codigo === TipoTributo.ICBPER
    );

    const taxCategoryTag = new Element(`${XMLNS.getPrefix(super.prefix.cac)}TaxCategory`);

    const tributo = new TipoTributo(impuesto.codigo);

    taxCategoryTag.create();

    // Consignar el código de categoria del impuesto
    taxCategoryTag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
        .att('schemeID', 'UN/ECE 5305')
        .att('schemeName', TipoTributo.nombreCat)
        .att('schemeAgencyName', TipoTributo.agenciaCat)
        .txt(tributo.categoria());

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
            .att('currencyID', impuesto.codMoneda)
            .txt(impuesto.tasa);
      }

      if (impuesto.tipoAfectacionIgv !== null) {
        // Consignar el código de afectación del igv
        taxCategoryTag.xml
          .ele(`${XMLNS.getPrefix(super.prefix.cbc)}TaxExemptionReasonCode`)
            .att('listAgencyName', TipoAfectacionIgv.agenciaCat)
            .att('listName', TipoAfectacionIgv.nombreCat)
            .att('listURI', TipoAfectacionIgv.uriCat)
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

    const tributo = new TipoTributo(impuesto.codigo);

    taxSchemeTag.create();

    // Consignar el código de impuesto
    taxSchemeTag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}ID`)
        .att('schemeID', 'UN/ECE 5153')
        .att('schemeAgencyName', TipoTributo.agenciaCat)
        .att('schemeName', TipoTributo.nombreCat)
        .att('schemeURI', TipoTributo.uriCat)
        .txt(impuesto.codigo);

    // Consignar el nombre de impuesto
    taxSchemeTag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}Name`)
        .txt(tributo.nombre());

    // Consignar el código internacional de impuesto
    taxSchemeTag.xml
      .ele(`${XMLNS.getPrefix(super.prefix.cbc)}TaxTypeCode`)
        .txt(tributo.codigo());

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
