"use strict";

const numeral = require('numeral');

exports.hasOwnProperty = (object, prop) => {
  return Object.prototype.hasOwnProperty.call(object, prop);
};

exports.numberFormat = (number, decimals) => {
  if (number === null || number === undefined) {
    throw new Error('Debe ingresar un número correcto');
  }

  const length = (decimals !== null && decimals !== undefined) ? Number.parseInt(decimals, 10) : 2;

  const format = `0.${new Array(length).join('0')}`;

  return numeral(number).format(format);
};
