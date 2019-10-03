"use strict";

const { assert } = require('chai');

const {
  TipoDocumento,
} = require('sunat-catalogs');

const CPEPercepcion = require('../lib/clases/CPEPercepcion');

describe('clase.CPEPercepcion(serie, numero, fechaEmision, horaEmision)', () => {
  const percepcion = new CPEPercepcion();

  it('Debería ser una clase', () => {
    assert.isFunction(CPEPercepcion);
    assert.isObject(CPEPercepcion.prototype);
  });

  describe('#.tipoCpe', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'tipoCpe');
      assert.property(percepcion, 'tipoCpe');
    });
    it(`Debería retornar el valor "${TipoDocumento.CPEP}"`, () => {
      assert.isNotNull(percepcion.tipoCpe);
      assert.isString(percepcion.tipoCpe);
      assert.propertyVal(percepcion, 'tipoCpe', TipoDocumento.CPEP);
    });
  });

  describe('#.serie', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'serie');
      assert.property(percepcion, 'serie');
    });
  });

  describe('#.numero', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'numero');
      assert.property(percepcion, 'numero');
    });
  });

  describe('#.fechaEmision', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'fechaEmision');
      assert.property(percepcion, 'fechaEmision');
    });
  });

  describe('#.horaEmision', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'horaEmision');
      assert.property(percepcion, 'horaEmision');
    });
  });

  describe('#.tipoRegimen', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'tipoRegimen');
      assert.property(percepcion, 'tipoRegimen');
    });
  });

  describe('#.tasaRegimen', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'tasaRegimen');
      assert.property(percepcion, 'tasaRegimen');
    });
  });

  describe('#.observacion', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'observacion');
      assert.property(percepcion, 'observacion');
    });
  });

  describe('#.imptTotalPercibido', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'imptTotalPercibido');
      assert.property(percepcion, 'imptTotalPercibido');
    });
  });

  describe('#.imptTotalCobrado', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'imptTotalCobrado');
      assert.property(percepcion, 'imptTotalCobrado');
    });
  });

  describe('#.imptRedondeo', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'imptRedondeo');
      assert.property(percepcion, 'imptRedondeo');
    });
  });
});

