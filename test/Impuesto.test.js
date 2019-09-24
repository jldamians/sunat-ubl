"use strict";

const { assert, expect } = require('chai');

const { TipoTributo, TipoMoneda } = require('sunat-catalogs');

const Impuesto = require('../lib/clases/Impuesto');

describe('clase.Impuesto(codImpuesto, imptBase, imptImpuesto, codMoneda)', () => {
  const impuesto01 = new Impuesto(TipoTributo.ISC);
  const impuesto02 = new Impuesto(TipoTributo.IGV, 1000, 180, TipoMoneda.SOL);

  it('Debería ser una clase', () => {
    assert.isFunction(TipoTributo);
    assert.isObject(TipoTributo.prototype);
  });

  it('Debería lanzar una excepción si el argumento <codImpuesto> no es definido', () => {
    expect(() => {
      new Impuesto();
    }).to.throw();
  });

  it('Debería lanzar una excepción si el argumento <codImpuesto> es definido con un valor incorrecto', () => {
    expect(() => {
      new Impuesto('abcd');
    }).to.throw();
  });

  describe('#.codImpuesto', () => {
    it('Debería existir el atributo', () => {
      assert.property(Impuesto.prototype, 'codImpuesto');
      assert.property(impuesto01, 'codImpuesto');
    });
    it('Debería retornar un valor válido', () => {
      assert.isNotNull(impuesto02.codImpuesto);
      assert.isString(impuesto02.codImpuesto);
      assert.propertyVal(impuesto02, 'codImpuesto', TipoTributo.IGV);
    });
  });

  describe('#.imptBase', () => {
    it('Debería existir el atributo', () => {
      assert.property(Impuesto.prototype, 'imptBase');
      assert.property(impuesto01, 'imptBase');
    });

    it('Debería retornar un valor nulo', () => {
      assert.isNull(impuesto01.imptBase);
    });

    it('Debería retornar un valor válido', () => {
      assert.isNotNull(impuesto02.imptBase);
      assert.isNumber(impuesto02.imptBase);
      assert.propertyVal(impuesto02, 'imptBase', 1000);
    });
  });

  describe('#.imptImpuesto', () => {
    it('Debería existir el atributo', () => {
      assert.property(Impuesto.prototype, 'imptImpuesto');
      assert.property(impuesto01, 'imptImpuesto');
    });

    it('Debería retornar un valor nulo', () => {
      assert.isNull(impuesto01.imptImpuesto);
    });

    it('Debería retornar un valor válido', () => {
      assert.isNotNull(impuesto02.imptImpuesto);
      assert.isNumber(impuesto02.imptImpuesto);
      assert.propertyVal(impuesto02, 'imptImpuesto', 180);
    });
  });

  describe('#.codMoneda', () => {
    it('Debería existir el atributo', () => {
      assert.property(Impuesto.prototype, 'codMoneda');
      assert.property(impuesto01, 'codMoneda');
    });

    it('Debería retornar un valor nulo', () => {
      assert.isNull(impuesto01.codMoneda);
    });

    it('Debería retornar un valor válido', () => {
      assert.isNotNull(impuesto02.codMoneda);
      assert.isString(impuesto02.codMoneda);
      assert.propertyVal(impuesto02, 'codMoneda', TipoMoneda.SOL);
    });
  });
});
