"use strict";

const { assert } = require('chai');

const { TipoDocumento, TipoMoneda } = require('sunat-catalogs');

const DetallePercepcion = require('../lib/clases/DetallePercepcion');

describe('clase.DetallePercepcion(cpe, fechaCobro, numeroCobro, imptCobro, codMonedaCobro, imptPercibido, fechaPercepcion, imptCobrado, tipoCambio)', () => {
  const detalle = new DetallePercepcion();

  it('Debería ser una clase', () => {
    assert.isFunction(DetallePercepcion);
    assert.isObject(DetallePercepcion.prototype);
  });

  describe('#.cpe', () => {
    it('Debería existir el atributo', () => {
      assert.property(DetallePercepcion.prototype, 'cpe');
      assert.property(detalle, 'cpe');
    });
  });

  describe('#.fechaCobro', () => {
    it('Debería existir el atributo', () => {
      assert.property(DetallePercepcion.prototype, 'fechaCobro');
      assert.property(detalle, 'fechaCobro');
    });
  });

  describe('#.numeroCobro', () => {
    it('Debería existir el atributo', () => {
      assert.property(DetallePercepcion.prototype, 'numeroCobro');
      assert.property(detalle, 'numeroCobro');
    });
  });

  describe('#.imptCobro', () => {
    it('Debería existir el atributo', () => {
      assert.property(DetallePercepcion.prototype, 'imptCobro');
      assert.property(detalle, 'imptCobro');
    });
  });

  describe('#.codMonedaCobro', () => {
    it('Debería existir el atributo', () => {
      assert.property(DetallePercepcion.prototype, 'codMonedaCobro');
      assert.property(detalle, 'codMonedaCobro');
    });
  });

  describe('#.imptPercibido', () => {
    it('Debería existir el atributo', () => {
      assert.property(DetallePercepcion.prototype, 'imptPercibido');
      assert.property(detalle, 'imptPercibido');
    });
  });

  describe('#.fechaPercepcion', () => {
    it('Debería existir el atributo', () => {
      assert.property(DetallePercepcion.prototype, 'fechaPercepcion');
      assert.property(detalle, 'fechaPercepcion');
    });
  });

  describe('#.imptCobrado', () => {
    it('Debería existir el atributo', () => {
      assert.property(DetallePercepcion.prototype, 'imptCobrado');
      assert.property(detalle, 'imptCobrado');
    });
  });

  describe('#.tipoCambio', () => {
    it('Debería existir el atributo', () => {
      assert.property(DetallePercepcion.prototype, 'tipoCambio');
      assert.property(detalle, 'tipoCambio');
    });
  });
});
