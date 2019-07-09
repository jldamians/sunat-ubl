/**
 * Constants enumerating the catalogs.
 */

"use strict";

const utils = require('../utils');

const catalogs = {};

const CATALOG_URI = 'urn:pe:gob:sunat:cpe:see:gem:catalogos';

catalogs[exports.CATALOG_01 = `${CATALOG_URI}:catalogo01`] = 'Tipo de Documento';

catalogs[exports.CATALOG_05 = `${CATALOG_URI}:catalogo05`] = 'Codigo de tributos';

catalogs[exports.CATALOG_06 = `${CATALOG_URI}:catalogo06`] = 'Documento de Identidad';

catalogs[exports.CATALOG_07 = `${CATALOG_URI}:catalogo07`] = 'Afectacion del IGV';

catalogs[exports.CATALOG_12 = `${CATALOG_URI}:catalogo12`] = 'Documento Relacionado';

catalogs[exports.CATALOG_16 = `${CATALOG_URI}:catalogo16`] = 'Tipo de Precio';

catalogs[exports.CATALOG_18 = `${CATALOG_URI}:catalogo18`] = 'Modalidad de Transporte';

catalogs[exports.CATALOG_20 = `${CATALOG_URI}:catalogo20`] = 'Motivo de Traslado';

catalogs[exports.CATALOG_51 = `${CATALOG_URI}:catalogo51`] = 'Tipo de Operacion';

catalogs[exports.CATALOG_53 = `${CATALOG_URI}:catalogo53`] = 'Cargo/descuento';

catalogs[exports.CATALOG_54 = `${CATALOG_URI}:catalogo54`] = 'Codigo de detraccion';

catalogs[exports.CATALOG_55 = `${CATALOG_URI}:catalogo55`] = 'Propiedad del item';

catalogs[exports.CATALOG_59 = `${CATALOG_URI}:catalogo59`] = 'Medio de pago';

exports.getCatalogText = function(catalogURI) {
  if (utils.hasOwnProperty(catalogs, catalogURI)) {
    return catalogs[catalogURI];
  } else {
    throw new Error(`El URI del catálogo no existe: ${catalogURI}`);
  }
};
