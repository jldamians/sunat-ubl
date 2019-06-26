"use strict";

const xmlBuilder = require('xmlbuilder');

class Element {
  constructor(prefix) {
    this._prefix = prefix;
  }

  get prefix() {
    return this._prefix;
  }

  create(name) {
    return xmlBuilder.create(name);
  }
}

module.exports = Element;
