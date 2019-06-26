"use strict";

const utils = require('../../../utils');
const tributeTypes = require('../../../constants/tributeTypes');

const Element = require('../Element');
const TaxScheme = require('./TaxScheme');

class TaxCategory extends Element {
  constructor(prefix, payload) {
    if (!utils.hasOwnProperty(prefix, 'cac')) {
      throw new ('Necesita definir el xmlns cac');
    }

    if (!utils.hasOwnProperty(prefix, 'cbc')) {
      throw new ('Necesita definir el xmlns cbc');
    }

    super(prefix);

    this._payload = payload;
  }

  get payload() {
    return this._payload;
  }

  /**
   * Categoría de impuestos
   * @return {xmlbuilder} xml element
   */
  _ID() {
    const ID = super.create(`${super.prefix.cbc}:ID`);

    const tributeData = tributeTypes.getTributeData(this.payload.codigoImpuesto);

    ID
      .att('schemeID', 'UN/ECE 5305')
      .att('schemeName', 'Codigo de tributos')
      .att('schemeAgencyName', 'PE:SUNAT')
      .txt(tributeData.category);

    return ID;
  }

  /**
   * Porcentaje de impuesto del IGV o IVAP
   * @return {xmlbuilder} xml element
   */
  _percent() {
    const Percent = super.create(`${super.prefix.cbc}:Percent`);

    Percent.txt(this.payload.tasaImpuesto);

    return Percent;
  }


  /**
   * Código de tipo de afectación del IGV o IVAP
   * @return {xmlbuilder} xml element
   */
  _taxExemptionReasonCode() {
    const TaxExemptionReasonCode = super.create(`${super.prefix.cbc}:TaxExemptionReasonCode`);

    TaxExemptionReasonCode
      .att('listAgencyName', 'PE:SUNAT')
      .att('listName', 'Afectacion del IGV')
      .att('listURI', 'urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo07')
      .txt(this.payload.codigoAfectacionIgv);

    return TaxExemptionReasonCode;
  }

  /**
   * Código de tipo de sistema ISC
   * @return {xmlbuilder} xml element
   */
  _tierRange() {
    const TierRange = super.create(`${super.prefix.cbc}:TierRange`);

    TierRange.txt(this.payload.codigoSistemaCalculoIsc);

    return TierRange;
  }

  /**
   * @return {xmlbuilder} xml element
   */
  _taxScheme() {
    const prefix = {
      cac: super.prefix.cac,
      cbc: super.prefix.cbc
    };

    const data = {
      codigoImpuesto: this.payload.codigoImpuesto
    };

    const newTaxScheme = new TaxScheme(prefix, data);

    return newTaxScheme.toXMLElement();
  }

  toXMLElement() {
    const TaxCategory = super.create(`${super.prefix.cac}:TaxCategory`);

    TaxCategory.importDocument(this._ID());

    if (this.payload.tasaImpuesto !== null && utils.isUndefined(this.payload.tasaImpuesto) === true) {
      if (this.payload.tasaImpuesto >= 0) {
        TaxCategory.importDocument(this._percent());
      }
    }

    if (this.payload.codigoAfectacionIgv !== null && utils.isUndefined(this.payload.codigoAfectacionIgv) === true) {
      TaxCategory.importDocument(this._taxExemptionReasonCode());
    }

    if (this.payload.codigoSistemaCalculoIsc !== null && utils.isUndefined(this.payload.codigoSistemaCalculoIsc) === true) {
      TaxCategory.importDocument(this._tierRange());
    }

    TaxCategory.importDocument(this._taxScheme());

    return TaxCategory;
  }
}


module.exports = TaxCategory;
