"use strict";

const xmlBuilder = require('xmlbuilder');

const XMLNS = require('../../constants/xmlns');

class Element {
  constructor() {
    this._prefix = {
      cac: XMLNS.getPrefixText(XMLNS.CAC),
      cbc: XMLNS.getPrefixText(XMLNS.CBC),
      sac: XMLNS.getPrefixText(XMLNS.SAC),
      ext: XMLNS.getPrefixText(XMLNS.EXT)
    };
  }

  get prefix() {
    return this._prefix;
  }

  create(name) {
    return xmlBuilder.create(name);
  }
}

module.exports = Element;
