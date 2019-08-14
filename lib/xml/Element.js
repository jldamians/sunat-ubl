"use strict";

const xmlBuilder = require('xmlbuilder');

const constants = require('../../constants');

const XMLNS = constants.xmlns;

class Element {
  /**
   * @constructor
   * @param {Object} prefix, prefijos para los namespaces
   */
  constructor(prefix = null) {
    if (prefix) {
      this._prefix = prefix;
    } else {
      this._prefix = {
        cac: XMLNS.cac,
        cbc: XMLNS.cbc,
        sac: XMLNS.sac,
        ext: XMLNS.ext,
      };
    }
  }

  // Getters
  get prefix() {
    return this._prefix;
  }

  /**
   * Crea un elemento xml
   * @param {String} name, nombre del elemento xml que será creado
   * @return {xmlbuilder}
   */
  create(name) {
    return xmlBuilder.create(name);
  }
}

module.exports = Element;
