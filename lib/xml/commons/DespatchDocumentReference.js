/**
 * @author: jldamians <jlds161089@gmail.com>
 * @description: Referencia a documentos de transporte asociados a la factura.
 * Catálogo No. 01: Código de Tipo de Documento
 */

"use strict";

const {
  TipoDocumento,
} = require('sunat-catalogs');

const Element = require('../Element');

const constants = require('../../constants');

const XMLNS = constants.xmlns;

class DespatchDocumentReference extends Element {
  /**
   * @constructor
   * @param {ComprobanteDespacho} cpe, información del comprobante
   * @param {Object} prefix, prefijos de los namespace
   */
  constructor(cpe, prefix) {
    const xmlName = `${XMLNS.getPrefix(prefix.cac)}DespatchDocumentReference`;

    super(xmlName, prefix);

    this._cpe = cpe;
  }

  /**
   * @method
   * Agregar serie y número de guía
   */
  _setIDTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}ID`);

    tag.create();

    tag.xml.txt(`${this._cpe.serie}-${this._cpe.numero}`);

    super.xml.importDocument(tag.xml);
  }

  /**
   * @method
   * Agregar código de tipo de guía de remisión
   */
  _setDocumentTypeCodeTag() {
    const tag = new Element(`${XMLNS.getPrefix(super.prefix.cbc)}DocumentTypeCode`);

    tag.create();

    tag.xml
      .att('listAgencyName', TipoDocumento.agenciaCat)
      .att('listName', TipoDocumento.nombreCat)
      .att('listURI', TipoDocumento.uriCat)
      .txt(this._cpe.tipoCpe);

    super.xml.importDocument(tag.xml);
  }

  /**
   * @function
   * Obtener el elemento xml
   * @return {xmlbuilder}
   */
  toXMLElement() {
    super.create();

    this._setIDTag();

    this._setDocumentTypeCodeTag();

    return super.xml;
  }
}

module.exports = DespatchDocumentReference;
