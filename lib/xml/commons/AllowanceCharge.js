/**
 * @author: jldamians <jlds161089@gmail.com>
 */

"use strict";

const constants = require('../../constants');

const Element = require('../Element');

const XMLNS = constants.xmlns,
      CATALOGS = constants.catalogs,
      CHARGE_TYPE_CODES = constants.chargeTypeCodes;

class AllowanceCharge extends Element {
  /**
   * @constructor
   * @param {Descuento | Cargo} operación, información del descuento o cargo
   * @param {Object} prefix, prefijos de los namespace
   */
  constructor(operacion, prefix) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}AllowanceCharge`;

    super(xmlName, prefix);

    this._operacion = operacion;
  }

  /**
   * @method
   * Agregar indicador de cargo o descuento
   */
  _setChargeIndicatorTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}ChargeIndicator`);

    tag.create();

    tag.xml.txt(CHARGE_TYPE_CODES.getIndicator(this._operacion.codigo));

    super.xml.importDocument(tag.xml);
  }

  /**
   * @method
   * Agregar código de cargo o descuento
   */
  _setAllowanceChargeReasonCodeTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}AllowanceChargeReasonCode`);

    tag.create();

    tag.xml
      .att('listAgencyName', 'PE:SUNAT')
      .att('listName', CATALOGS.getName(CATALOGS.CATALOG_53))
      .att('listURI', CATALOGS.getURI(CATALOGS.CATALOG_53))
      .txt(this._operacion.codigo);

    super.xml.importDocument(tag.xml);
  }

  /**
   * @method
   * Agregar factor de cargo o descuento
   */
  _setMultiplierFactorNumericTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}MultiplierFactorNumeric`);

    tag.create();

    tag.xml.txt(this._operacion.tasa);

    super.xml.importDocument(tag.xml);
  }

  /**
   * @method
   * Agregar monto de cargo o descuento
   */
  _setAmountTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}Amount`);

    tag.create();

    tag.xml
      .att('currencyID', this._operacion.codMoneda)
      .txt(this._operacion.monto);

    super.xml.importDocument(tag.xml);
  }

  /**
   * @method
   * Agregar monto base del cargo o descuento
   */
  _setBaseAmountTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}BaseAmount`);

    tag.create();

    tag.xml
      .att('currencyID', this._operacion.codMoneda)
      .txt(this._operacion.base);

    super.xml.importDocument(tag.xml);
  }

  /**
   * @return {xmlbuilder} xml element
   */
  toXMLElement() {
    super.create();

    this._setChargeIndicatorTag();

    this._setAllowanceChargeReasonCodeTag();

    this._setMultiplierFactorNumericTag();

    this._setAmountTag();

    this._setBaseAmountTag();

    return super.xml;
  }
}

module.exports = AllowanceCharge;
