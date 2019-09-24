"use strict";

const { assert } = require('chai');

const { TipoDocumento, TipoMoneda } = require('sunat-catalogs');

const CPEPercepcion = require('../lib/clases/CPEPercepcion');

describe('clase.CPEPercepcion(tipoRegimen, serie, numero, fechaEmision, horaEmision, tasa, observacion, imptTotalPercibido, imptTotalCobrado, imptRedondeo)', () => {
  const retencion = new CPEPercepcion();

  it('Debería ser una clase', () => {
    assert.isFunction(CPEPercepcion);
    assert.isObject(CPEPercepcion.prototype);
  });

  describe('#.tipoRegimen', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'tipoRegimen');
      assert.property(retencion, 'tipoRegimen');
    });
  });

  describe('#.serie', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'serie');
      assert.property(retencion, 'serie');
    });
  });

  describe('#.numero', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'numero');
      assert.property(retencion, 'numero');
    });
  });

  describe('#.fechaEmision', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'fechaEmision');
      assert.property(retencion, 'fechaEmision');
    });
  });

  describe('#.horaEmision', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'horaEmision');
      assert.property(retencion, 'horaEmision');
    });
  });

  describe('#.tasa', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'tasa');
      assert.property(retencion, 'tasa');
    });
  });

  describe('#.observacion', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'observacion');
      assert.property(retencion, 'observacion');
    });
  });

  describe('#.imptTotalPercibido', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'imptTotalPercibido');
      assert.property(retencion, 'imptTotalPercibido');
    });
  });

  describe('#.imptTotalCobrado', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'imptTotalCobrado');
      assert.property(retencion, 'imptTotalCobrado');
    });
  });

  describe('#.imptRedondeo', () => {
    it('Debería existir el atributo', () => {
      assert.property(CPEPercepcion.prototype, 'imptRedondeo');
      assert.property(retencion, 'imptRedondeo');
    });
  });
});

