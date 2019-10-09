/**
 * @author: jldamians <jlds161089@gmail.com>
 */

"use strict";

const {
  CargoDescuento,
} = require('sunat-catalogs');

const {
  Cargo,
  Descuento,
} = require('../../clases');

const constants = require('../../constants');

const Element = require('../Element');

const XMLNS = constants.xmlns;

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

    tag.xml.txt(this._operacion.indicador);

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
      .att('listAgencyName', CargoDescuento.agenciaCat)
      .att('listName', CargoDescuento.nombreCat)
      .att('listURI', CargoDescuento.uriCat);

    if (this._operacion instanceof Cargo) {
      tag.xml.txt(this._operacion.codCargo);
    } else if (this._operacion instanceof Descuento) {
      tag.xml.txt(this._operacion.codDescuento);
    }

    super.xml.importDocument(tag.xml);
  }

  /**
   * @method
   * Agregar factor de cargo o descuento
   */
  _setMultiplierFactorNumericTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}MultiplierFactorNumeric`);

    tag.create();

    if (this._operacion instanceof Cargo) {
      tag.xml.txt(this._operacion.tasaCargo);
    } else if (this._operacion instanceof Descuento) {
      tag.xml.txt(this._operacion.tasaDescuento);
    }

    super.xml.importDocument(tag.xml);
  }

  /**
   * @method
   * Agregar monto de cargo o descuento
   */
  _setAmountTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}Amount`);

    tag.create();

    tag.xml.att('currencyID', this._operacion.codMoneda);

    if (this._operacion instanceof Cargo) {
      tag.xml.txt(this._operacion.imptCargo);
    } else if (this._operacion instanceof Descuento) {
      tag.xml.txt(this._operacion.imptDescuento);
    }

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
      .txt(this._operacion.imptBase);

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
