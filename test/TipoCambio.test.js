"use strict";

const { assert } = require('chai');

const { TipoMoneda } = require('sunat-catalogs');

const TipoCambio = require('../lib/clases/TipoCambio');

describe('clase.TipoCambio(codMonedaOrigen, codMonedaDestino, tasaCambio, fechaCambio)', () => {
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

  describe('#.fechaCambio', () => {
    it('Debería existir el atributo', () => {
      assert.property(TipoCambio.prototype, 'fechaCambio');
      assert.property(cambio01, 'fechaCambio');
    });

    it('Debería retornar un valor nulo', () => {
      assert.isNull(cambio01.fechaCambio);
    });

    it('Debería retornar un valor válido', () => {
      assert.isNotNull(cambio02.fechaCambio);
      assert.isString(cambio02.fechaCambio);
      assert.propertyVal(cambio02, 'fechaCambio', '2019-09-24');
    });
  });

  describe('#.tasaCambio', () => {
    it('Debería existir el atributo', () => {
      assert.property(TipoCambio.prototype, 'tasaCambio');
      assert.property(cambio01, 'tasaCambio');
    });

    it('Debería retornar un valor nulo', () => {
      assert.isNull(cambio01.tasaCambio);
    });

    it('Debería retornar un valor válido', () => {
      assert.isNotNull(cambio02.tasaCambio);
      assert.isNumber(cambio02.tasaCambio);
      assert.propertyVal(cambio02, 'tasaCambio', 3.35);
    });
  });
});
