"use strict";

const { assert } = require('chai');

const {
  TipoDocumento,
} = require('sunat-catalogs');

const CPERetencion = require('../lib/clases/CPERetencion');

describe('clase.CPERetencion(serie, numero, fechaEmision, horaEmision)', () => {
  const retencion = new CPERetencion();

  it('Debería ser una clase', () => {
    assert.isFunction(CPERetencion);
    assert.isObject(CPERetencion.prototype);
  });

  describe('#.tipoCpe', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPERetencion.prototype, 'tipoCpe');
      assert.property(retencion, 'tipoCpe');
    });
    it(`Debería retornar el valor "${TipoDocumento.CPER}"`, () => {
      assert.isNotNull(retencion.tipoCpe);
      assert.isString(retencion.tipoCpe);
      assert.propertyVal(retencion, 'tipoCpe', TipoDocumento.CPER);
    });
  });

  describe('#.serie', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPERetencion.prototype, 'serie');
      assert.property(retencion, 'serie');
    });
  });

  describe('#.numero', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPERetencion.prototype, 'numero');
      assert.property(retencion, 'numero');
    });
  });

  describe('#.fechaEmision', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPERetencion.prototype, 'fechaEmision');
      assert.property(retencion, 'fechaEmision');
    });
  });

  describe('#.horaEmision', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPERetencion.prototype, 'horaEmision');
      assert.property(retencion, 'horaEmision');
    });
  });

  describe('#.tipoRegimen', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPERetencion.prototype, 'tipoRegimen');
      assert.property(retencion, 'tipoRegimen');
    });
  });

  describe('#.tasaRegimen', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPERetencion.prototype, 'tasaRegimen');
      assert.property(retencion, 'tasaRegimen');
    });
  });

  describe('#.observacion', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPERetencion.prototype, 'observacion');
      assert.property(retencion, 'observacion');
    });
  });

  describe('#.imptTotalRetenido', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPERetencion.prototype, 'imptTotalRetenido');
      assert.property(retencion, 'imptTotalRetenido');
    });
  });

  describe('#.imptTotalPagado', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPERetencion.prototype, 'imptTotalPagado');
      assert.property(retencion, 'imptTotalPagado');
    });
  });

  describe('#.imptRedondeo', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPERetencion.prototype, 'imptRedondeo');
      assert.property(retencion, 'imptRedondeo');
    });
  });
});

