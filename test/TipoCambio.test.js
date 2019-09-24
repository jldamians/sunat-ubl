"use strict";

const { assert } = require('chai');

const { TipoMoneda } = require('sunat-catalogs');

const TipoCambio = require('../lib/clases/TipoCambio');

describe('clase.TipoCambio(codMonedaOrigen, codMonedaDestino, tasa, fecha)', () => {
  const cambio01 = new TipoCambio();
  const cambio02 = new TipoCambio(TipoMoneda.DOLAR, TipoMoneda.SOL, 3.35, '2019-09-24');

  it('Debería ser una clase', () => {
    assert.isFunction(TipoCambio);
    assert.isObject(TipoCambio.prototype);
  });

  describe('#.codMonedaOrigen', () => {
    it('Debería existir el atributo', () => {
      assert.property(TipoCambio.prototype, 'codMonedaOrigen');
      assert.property(cambio01, 'codMonedaOrigen');
    });
    it('Debería retornar un valor nulo', () => {
      assert.isNull(cambio01.codMonedaOrigen);
    });
    it('Debería retornar un valor válido', () => {
      assert.isNotNull(cambio02.codMonedaOrigen);
      assert.isString(cambio02.codMonedaOrigen);
      assert.propertyVal(cambio02, 'codMonedaOrigen', TipoMoneda.DOLAR);
    });
  });

  describe('#.codMonedaDestino', () => {
    it('Debería existir el atributo', () => {
      assert.property(TipoCambio.prototype, 'codMonedaDestino');
      assert.property(cambio01, 'codMonedaDestino');
    });

    it('Debería retornar un valor nulo', () => {
      assert.isNull(cambio01.codMonedaDestino);
    });

    it('Debería retornar un valor válido', () => {
      assert.isNotNull(cambio02.codMonedaDestino);
      assert.isString(cambio02.codMonedaDestino);
      assert.propertyVal(cambio02, 'codMonedaDestino', TipoMoneda.SOL);
    });
  });

  describe('#.fecha', () => {
    it('Debería existir el atributo', () => {
      assert.property(TipoCambio.prototype, 'fecha');
      assert.property(cambio01, 'fecha');
    });

    it('Debería retornar un valor nulo', () => {
      assert.isNull(cambio01.fecha);
    });

    it('Debería retornar un valor válido', () => {
      assert.isNotNull(cambio02.fecha);
      assert.isString(cambio02.fecha);
      assert.propertyVal(cambio02, 'fecha', '2019-09-24');
    });
  });

  describe('#.tasa', () => {
    it('Debería existir el atributo', () => {
      assert.property(TipoCambio.prototype, 'tasa');
      assert.property(cambio01, 'tasa');
    });

    it('Debería retornar un valor nulo', () => {
      assert.isNull(cambio01.tasa);
    });

    it('Debería retornar un valor válido', () => {
      assert.isNotNull(cambio02.tasa);
      assert.isNumber(cambio02.tasa);
      assert.propertyVal(cambio02, 'tasa', 3.35);
    });
  });
});
