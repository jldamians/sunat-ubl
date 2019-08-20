"use strict";

const pick = require('lodash.pick'),
      xmlBuilder = require('xmlbuilder');

const constants = require('../constants');

const XMLNS = constants.xmlns;

class Element {
  /**
   * @constructor
   * @param {String} xmlName, nombre que tendrá elemento xml
   * @param {Object} prefix, prefijos de los namespace
   */
  constructor(xmlName, prefix = null) {
    this._xmlName = xmlName;

    if (prefix !== null) {
      this._prefix = prefix;
    } else {
      this._prefix = pick(XMLNS, ['cac', 'cbc']);
    }

    this._xml = null;
  }

  // Getters
  get prefix() {
    return this._prefix;
  }
  get xmlName() {
    return this._xmlName;
  }
  get xml() {
    return this._xml;
  }

  /**
   * @function
   * Crear elemento xml
   * @param {String} name, nombre del elemento xml que será creado
   * @return {xmlbuilder}
   */
  create(xmlName = null) {
    if (xmlName !== null) {
      this._xml = xmlBuilder.create(xmlName);
    } else {
      this._xml = xmlBuilder.create(this._xmlName);
    }
  }
}

module.exports = Element;
