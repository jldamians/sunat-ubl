"use strict";

const { assert } = require('chai');

const { TipoDocumento, TipoMoneda } = require('sunat-catalogs');

const DetalleRetencion = require('../lib/clases/DetalleRetencion');

describe('clase.DetalleRetencion(cpe, fechaPago, numeroPago, imptPago, codMonedaPago, imptRetenido, fechaRetencion, imptPagado, tipoCambio)', () => {
  const detalle = new DetalleRetencion();

  it('Debería ser una clase', () => {
    assert.isFunction(DetalleRetencion);
    assert.isObject(DetalleRetencion.prototype);
  });

  describe('#.cpe', () => {
    it('Debería existir el atributo', () => {
      assert.property(DetalleRetencion.prototype, 'cpe');
      assert.property(detalle, 'cpe');
    });
  });

  describe('#.fechaPago', () => {
    it('Debería existir el atributo', () => {
      assert.property(DetalleRetencion.prototype, 'fechaPago');
      assert.property(detalle, 'fechaPago');
    });
  });

  describe('#.numeroPago', () => {
    it('Debería existir el atributo', () => {
      assert.property(DetalleRetencion.prototype, 'numeroPago');
      assert.property(detalle, 'numeroPago');
    });
  });

  describe('#.imptPago', () => {
    it('Debería existir el atributo', () => {
      assert.property(DetalleRetencion.prototype, 'imptPago');
      assert.property(detalle, 'imptPago');
    });
  });

  describe('#.codMonedaPago', () => {
    it('Debería existir el atributo', () => {
      assert.property(DetalleRetencion.prototype, 'codMonedaPago');
      assert.property(detalle, 'codMonedaPago');
    });
  });

  describe('#.imptRetenido', () => {
    it('Debería existir el atributo', () => {
      assert.property(DetalleRetencion.prototype, 'imptRetenido');
      assert.property(detalle, 'imptRetenido');
    });
  });

  describe('#.fechaRetencion', () => {
    it('Debería existir el atributo', () => {
      assert.property(DetalleRetencion.prototype, 'fechaRetencion');
      assert.property(detalle, 'fechaRetencion');
    });
  });

  describe('#.imptPagado', () => {
    it('Debería existir el atributo', () => {
      assert.property(DetalleRetencion.prototype, 'imptPagado');
      assert.property(detalle, 'imptPagado');
    });
  });

  describe('#.tipoCambio', () => {
    it('Debería existir el atributo', () => {
      assert.property(DetalleRetencion.prototype, 'tipoCambio');
      assert.property(detalle, 'tipoCambio');
    });
  });
});
