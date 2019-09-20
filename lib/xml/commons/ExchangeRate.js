"use strict";

const Element = require('../Element');

const constants = require('../../constants');

const XMLNS = constants.xmlns;

class ExchangeRate extends Element {
  /**
   * @constructor
   * @param {TipoCambio} cambio, tipo de cambio
   * @param {Object} prefix, prefijos de los namespace
   */
  constructor(cambio, prefix, ublVersion=null) {debugger;
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}ExchangeRate`;

    super(xmlName, prefix, ublVersion);

    this._cambio = cambio;
  }

  _setSourceCurrencyCodeTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}SourceCurrencyCode`);

    tag.create();

    tag.xml.txt(this._cambio.codMonedaOrigen);

    super.xml.importDocument(tag.xml);
  }

  _setTargetCurrencyCodeTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}TargetCurrencyCode`);

    tag.create();

    tag.xml.txt(this._cambio.codMonedaDestino);

    super.xml.importDocument(tag.xml);
  }

  _setCalculationRateTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}CalculationRate`);

    tag.create();

    tag.xml.txt(this._cambio.tasa);

    super.xml.importDocument(tag.xml);
  }

  _setDateTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}Date`);

    tag.create();

    tag.xml.txt(this._cambio.fecha);

    super.xml.importDocument(tag.xml);
  }

  /**
   * @function
   * Obtener el elemento xml
   * @return {xmlbuilder}
   */
  toXMLElement() {
    super.create();

    this._setSourceCurrencyCodeTag();

    this._setTargetCurrencyCodeTag();

    this._setCalculationRateTag();

    this._setDateTag();

    return super.xml;
  }
}

module.exports = ExchangeRate;
