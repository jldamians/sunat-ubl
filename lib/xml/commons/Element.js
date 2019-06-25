'use strict';

const xmlBuilder = require('xmlbuilder');

class Element {
  constructor(prefixes) {
    this._prefixes = prefixes;
  }

  get prefixes() {
    return this._prefixes;
  }

  create(name) {
    return xmlBuilder.create(name);
  }
}


module.exports = Element;
