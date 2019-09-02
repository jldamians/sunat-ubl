# SUNAT - UBL 2.1

## Nomenclatura

Tipo de campo | Descripción
:------------ | :----------
`a`           | `Caracter alfabético`
`n`           | `Caracter numérico`
`an`          | `Caracter alfanumérico`

Longitud de campo | Descripción
:---------------- | :----------
`a3`              | `3 caracteres alfabéticos` ***(longitud fija)***
`n3`              | `3 caracteres numéricos` ***(longitud fija)***
`an3`             | `3 caracteres alfanuméricos` ***(longitud fija)***
`a..3`            | `Hasta 3 caracteres alfabéticos` ***(longitud variable)***
`n..3`            | `Hasta 3 caracteres numéricos` ***(longitud variable)***
`an..3`           | `Hasta 3 caracteres alfanuméricos` ***(longitud variable)***

Formato de campo | Descripción
:--------------- | :----------------
`n(10,2)`        | `Hasta 10 enteros + punto decimal + hasta 2 decimales`
`F###`           | `Inicia con la letra F seguida de 3 números`
`YYYY-MM-DD`     | `YYYY=año, MM=mes y DD=día`

## Abreviatura

Abreviatura | Descripción
:---------- | :----------
`HBLTD`     | `Habilitado`
`OBGTR`     | `Obligatorio`

###  Tabla de campos "{ emisor }"

`Campo` | `Descripción` | `Longitud / Formato` | `Factura y Boleta` | `Nota de Crédito y Nota de Débito` | `Retención y Percepción`
:- | :- | :- | :- | :- | :-
***`tipoDocumento`*** | **_`Tipo de documento de indentidad`_** <br><br> `Consultar catálogo nro. 06 (Códigos de Tipo de Documento de Identidad) - Anexo 8 SUNAT` <br><br> `Se deberá emplear el código `**`6 - Registro Único de Contribuyente (RUC)`** | **`n1`** | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR`
***`numeroDocumento`*** | **_`Número de documento de identidad`_** <br><br> `Número de Registro Único de Contribuyente (RUC)` | **`n11`** | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR`
***`razonSocial`*** | **_`Razón social,`_**`denominación o apellidos y nombres` | **`an..1500`** | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR`
***`nombreComercial`*** | **_`Nombre comercial`_** | **`an..1500`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
***`codUbigeo`*** | **_`Código de UBIGEO,`_**`del domicilio fiscal` <br><br> `Consultar catálogo nro. 13 (Códigos de Ubicación Geográfica) - Anexo 8 SUNAT` | **`n6`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
***`departamento`*** | **_`Departamento,`_**`del domicilio fiscal` | **`an..30`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
***`provincia`*** | **_`Provincia,`_**`del domicilio fiscal` | **`an..30`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
***`distrito`*** | **_`Distrito,`_**`del domicilio fiscal` | **`an..30`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
***`codLocal`*** | **_`Código del estableciminto anexo,`_**`donde se está realizando la venta de bienes` <br><br> `En caso de no poder determinar el lugar de la venta, informar` **`"0000"`** | **`n4`** | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR` | `[ ] HBLTD`<br>`[ ] OBGTR`
***`direccion`*** | **_`Dirección,`_** `completa y detallada del domicilio fiscal` | `Para los comprobantes "01", "03", "07" y "08", la longitud será:`<br>**`an..200`**<br><br>`Para los comprobantes "20" y "40", la longitud será:`<br>**`an..100`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
***`urbanizacion`*** | **_`Urbanización,`_**`del domicilio fiscal` | `Para los comprobantes "01", "03", "07" y "08", la longitud será:`<br>**`an..25`**<br><br>`Para los comprobantes "20" y "40", la longitud será:`<br>**`an..30`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
***`codPais`*** | **_`Código de país,`_**`del domicilio fiscal` | **`n2`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`

###  Tabla de campos "{ receptor }"

`Campo` | `Descripción` | `Longitud / Formato` | `Factura y Boleta` | `Nota de Crédito y Nota de Débito` | `Retención y Percepción`
:- | :- | :- | :- | :- | :-
***`tipoDocumento`*** | **_`Tipo de documento de indentidad`_** <br><br> `Consultar catálogo nro. 06 (Códigos de Tipo de Documento de Identidad) - Anexo 8 SUNAT` <br><br> `Se deberá emplear el código `**`6 - Registro Único de Contribuyente (RUC)`** | **`n1`** | `[X] HBLTD [X] OBGTR` | `[X] HBLTD` <br> `[X] OBGTR` | `[X] HBLTD` <br> `[X] OBGTR`
***`numeroDocumento`*** | **_`Número de documento de identidad`_** <br><br> `Número de Registro Único de Contribuyente (RUC)` | **`n..15`** | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR`
***`razonSocial`*** | **_`Razón social,`_**`denominación o apellidos y nombres` | **`an..1500`** | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR`
***`nombreComercial`*** | **_`Nombre comercial`_** | **`an..1500`** | `[ ] HBLTD`<br>`[ ] OBGTR` | `[ ] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
***`codUbigeo`*** | **_`Código de UBIGEO,`_**`del domicilio fiscal` <br><br> `Consultar catálogo nro. 13 (Códigos de Ubicación Geográfica) - Anexo 8 SUNAT` | **`n6`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
***`departamento`*** | **_`Departamento,`_**`del domicilio fiscal` | **`an..30`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
***`provincia`*** | **_`Provincia,`_**`del domicilio fiscal` | **`an..30`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
***`distrito`*** | **_`Distrito,`_**`del domicilio fiscal` | **`an..30`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
***`direccion`*** | **_`Dirección,`_** `completa y detallada del domicilio fiscal` | `Para los comprobantes "01", "03", "07" y "08", la longitud será:`<br>**`an..200`**<br><br>`Para los comprobantes "20" y "40", la longitud será:`<br>**`an..100`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
***`urbanizacion`*** | **_`Urbanización,`_**`del domicilio fiscal` | `Para los comprobantes "01", "03", "07" y "08", la longitud será:`<br>**`an..25`**<br><br>`Para los comprobantes "20" y "40", la longitud será:`<br>**`an..30`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
***`codPais`*** | **_`Código de país,`_**`del domicilio fiscal` | **`n2`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`

###  Tabla de campos "{ tributo }"

`Campo` | `Descripción` | `Longitud / Formato` | `Habilitado` | `Obligatorio` 
:- | :- | :- | :- | :-
***`imptTotal`*** | **_`Monto total de tributos`_**<br><br>`Se deberá consignar la sumatoria de los montos de los siguientes`**_`Tipos de Tributos:`_**<br><br>**`1000`**_`- Impuestos General a las Ventas (IGV)`_<br>**`1016`**_`- Impuesto a la Venta Arroz Pilado (IVAP)`_<br>**`2000`**_`- Impuesto Selectivo al Consumo (ISC)`_<br>**`7152`**_`- Impuesto al Consumo de las Bolsas de Plástico (ICBPER)`_<br>**`9999`**_`- Otros Tributos`_ | **`n(12,2)`** | `01, FA`<br>`03, BV`<br>`07, NC`<br>`03, ND` | `01, FA`<br>`03, BV`<br>`07, NC`<br>`03, ND`
**_`impuestos`_** | *`[{ codigo, base, importe }]`* | - | `01, FA`<br>`03, BV`<br>`07, NC`<br>`03, ND` | `01, FA`<br>`03, BV`<br>`07, NC`<br>`03, ND`
**_`[{impuestos}].codigo`_** | _**`Código de impuesto`**_<br><br>`Consultar catálogo nro. 05 (Códigos de Tipos de Tributos y Otros Conceptos) - Anexo 8 SUNAT` | **`n4`** | `01, FA`<br>`03, BV`<br>`07, NC`<br>`03, ND` | `01, FA`<br>`03, BV`<br>`07, NC`<br>`03, ND`
**_`[{impuestos}].base`_** | _**`Total valor de venta`**_<br><br>`Si el`_**`Código de Tributo`**_`es`_**`"7152" - ICBPER,`**_`se deberá consignar`_**`0.00`**_ | **`n(12,2)`** | `01, FA`<br>`03, BV`<br>`07, NC`<br>`03, ND` | `01, FA`<br>`03, BV`<br>`07, NC`<br>`03, ND`
**_`[{impuestos}].importe`_** | _**`Importe del impuesto`**_ | **`n(12,2)`** |`01, FA`<br>`03, BV`<br>`07, NC`<br>`03, ND` | `01, FA`<br>`03, BV`<br>`07, NC`<br>`03, ND`

###  Tabla de campos "[{ detalle }]"

`Campo` | `Descripción` | `Longitud / Formato` | `Habilitado / Obligatorio FA y BV` | `Habilitado / Obligatorio NC y ND`
:- | :- | :- | :- | :- 
***`codInterno`*** | **_`Código de producto,`_**`de acuerdo al tipo de codificación interna que se utilice` | **`an..30`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
***`codUnspsc`*** | **_`Código de producto SUNAT,`_**`de acuerdo al estandar internacional de la ONU denominado:`**`United Nations Standard Products and Services Code - UNSPSC`** | **`n..8`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
***`tipoGtin`*** | **_`Tipo de estructura GTIN`_** | **`an..14`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
***`codGtin`*** | **_`Código de producto GTIN,`_**`para identificar los productos comerciales` | **`an..14`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
***`descripcion`*** | **_`Descripción detallada,`_**`del servicio prestado, bien vendido o cedico en uso, indicando las características` | **`an..500`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
***`codMedida`*** | **_`Unidad de medida,`_**`por ítem`<br><br>`Consultar catálogo nro. 03 (Código de Tipo de Unidad de Medida Comercial) - Anexo 8 SUNAT` | **`an..3`** | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR`
***`cantidad`*** | **_`Cantidad de unidades,`_**`por ítem` | **`n(12,10)`** | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR`
***`tipoPrecio`*** | **_`Tipo de precio unitario,`_**`por ítem`<br><br>`Consultar catálogo nro. 16 (Código de Tipo de Precio de Venta Unitario) - Anexo 8 SUNAT`<br><br>`Utilizar los códigos, teniendo en cuenta lo siguiente:`<br>**`"01" -> Precio Unitario,`** _`para operaciones onerosas`_<br>**`"02" -> Valor Referencial Unitario,`** _`para operaciones no onerosas (gratuitas)`_ | **`n2`** | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR`
***`imptPrecio`*** | **_`Precio de venta unitario`_**<br><br>`Cuando el valor consignado en el campo`**`tipoPrecio`**`sea`**`"01":`**<br>`Corresponde al precio unitario facturado del bien vendido o servicio prestado. Este importe incluye los tributos (IGV, ISC y otros) y la deducción de descuentos por ítem`<br><br>`Cuando el valor consignado en el campo`**`tipoPrecio`**`sea`**`"02":`**<br>`Cuando la transferencia de bienes o servicios se efectúe gratuitamente (operaciones no onerosas), se consignará el importe del `**`valor de venta unitario`**`que hubiera correspondido en operaciones onerosas. En su defecto se aplicará el valor de mercado` | **`n(12,10)`** | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR`
***`imptValor`*** | **_`Valor de venta unitario`_**<br><br>`Corresponde al valor o monto unitario del bien vendido, cedido o servicio prestado. Este importe NO incluye los tributos (IGV, ISC y otros) ni los cargos globales`<br><br>`Cuando el valor consignado en el campo`**`tipoPrecio`**`sea`**`"02",`**`se deberá consignar`**`0.00`** | **`n(12,10)`** | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR`
***`imptVenta`*** | **_`Valor de venta`_**<br><br>`Corresponde al producto de la`**`cantidad`**`por el`**`valor de venta unitario`**`y la deducción de los descuento aplicados a dicho ítem (de existir). Este importe no incluye los tributos (IGV, ISC y otros), los descuentos o cargos globales` | **`n(12,2)`** | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR`
**_`tributo`_** | *`{ imptTotal, impuestos }`* | - | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR`
**_`{tributo}.imptTotal`_** | _**`Monto total de tributos del ítem`**_<br><br>`Es el resultado de sumar los tipos de afectación relacionados a los siguientes tributos:`<br><br>`IGV (1000) + IVAP (1016) + ISC (2000) + ICBPER (7152) + OTROS (9999)` | **`n(12,2)`** | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR`
**_`{tributo}.impuestos`_** | *`[{ base, tasa, importe, tipoAfectacionIgv, tipoAfectacionIsc, tipoAfectacionOtros, tipoAfectacionIcbper }]`* | **`n(12,2)`** | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR`
**_`[{impuestos}].tipoAfectacionIgv`_** | _**`Tipo de afectación  IGV,`**`por ítem`_<br><br>`Consultar catálogo nro. 07 (Código de Tipos de Afectación del IGV) - Anexo 8 SUNAT`<br><br>`Si este campo es utilizado, deberá omitir los campos:`**<br>`tipoAfectacionIsc`<br>`tipoAfectacionOtros`<br>`tipoAfectacionIcbper`** | **`n2`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
**_`[{impuestos}].tipoAfectacionIsc`_** | _**`Tipo de afectación ISC,`**_`por ítem`<br><br>`Consultar catálogo nro. 08 (Código de Tipos de Sistema de Cálculo del ISC) - Anexo 8 SUNAT`<br><br>`Si este campo es utilizado, deberá omitir los campos:`**<br>`tipoAfectacionIgv`<br>`tipoAfectacionOtros`<br>`tipoAfectacionIcbper`** | **`n2`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
**_`[{impuestos}].tipoAfectacionOtros`_** | _**`Tipo de afectación Otros,`**_`por ítem`<br><br>`Se deberá consignar`**`"00",`**`el cual será el único valor permitido`<br><br>`Si este campo es utilizado, deberá omitir los campos:`**<br>`tipoAfectacionIgv`<br>`tipoAfectacionIsc`<br>`tipoAfectacionIcbper`** | **`n2`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
**_`[{impuestos}].tipoAfectacionIcbper`_** | _**`Tipo de afectación ICBPER,`**_`por ítem`<br><br>`Se deberá consignar`**`"00",`**`el cual será el único valor permitido`<br><br>`Si este campo es utilizado, deberá omitir los campos:`**<br>`tipoAfectacionIgv`<br>`tipoAfectacionIsc`<br>`tipoAfectacionOtros`** | **`n2`** | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
**_`[{impuestos}].base`_** | _**`Monto base del impuesto`**_<br><br>`Si se utiliza el campo`**`tipoAfectacionIcbper,`**`se deberá consignar la`_**`cantidad de bolsas de plástico`**_`adquiridas por el consumidor del bien o servicio` | **`n(12,2)`** | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR`
**_`[{impuestos}].tasa`_** | _**`Tasa del impuesto`**_<br><br>`Si se utiliza el campo`**`tipoAfectacionIcbper,`**`se deberá consignar uno de los siguientes valores:`<br>_**`Año 2019 -> 0.10`<br>`Año 2020 -> 0.20`<br>`Año 2021 -> 0.30`<br>`Año 2022 -> 0.40`<br>`Años sigs. -> 0.50`**_ | **`n(3,5)`** | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR`
**_`[{impuestos}].importe`_** | _**`Monto del impuesto`**_ | **`n(12,2)`** | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR`
**_`conceptos`_** | *`[{ codigo, valor }]`* | - | `[X] HBLTD`<br>`[ ] OBGTR` | `[X] HBLTD`<br>`[ ] OBGTR`
**_`[{conceptos}].codigo`_** | _**`Código del concepto tributario por item`**_<br><br>`Consultar catálogo nro. 55 (Códigos de Identificación del Concepto Tributario) - Anexo 8 SUNAT` | **`n4`** | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR`
**_`[{conceptos}].valor`_** | _**`Valor del conceptor tributario`**_ | - | `[X] HBLTD`<br>`[X] OBGTR` | `[X] HBLTD`<br>`[X] OBGTR`
**_`codDescuento`_** | **_`Código de descuento`_**<br><br>`Consultar catálogo nro. 53 (Códigos de Cargos o Descuentos) - Anexo 8 SUNAT`<br><br>`Los únicos valores permitidos son los siguientes:`<br>**`"00" -> Descuentos que afectan la base imponible del IGV/IVAP`**<br>**`"01" -> Descuentos que NO afectan la base imponible del IGV/IVAP`** | - | `[X] HBLTD`<br>`[ ] OBGTR` | `[ ] HBLTD`<br>`[ ] OBGTR`
**_`tasaDescuento`_** | **_`Factor de descuento`_**<br><br>`Se deberá consignar un valor comprendido entre 1% y 100%` | - | `[X] HBLTD`<br>`[ ] OBGTR` | `[ ] HBLTD`<br>`[ ] OBGTR`
**_`baseDescuento`_** | **_`Monto base del descuento`_** | - | `[X] HBLTD`<br>`[ ] OBGTR` | `[ ] HBLTD`<br>`[ ] OBGTR`
**_`mntDescuento`_** | **_`Monto de descuento`_** | - | `[X] HBLTD`<br>`[ ] OBGTR` | `[ ] HBLTD`<br>`[ ] OBGTR`
**_`codCargo`_** | **_`Código de cargo`_**<br><br>`Consultar catálogo nro. 53 (Códigos de Cargos o Descuentos) - Anexo 8 SUNAT`<br><br>`Los únicos valores permitidos son los siguientes:`<br>**`"47" -> Cargos que afectan la base imponible del IGV/IVAP`**<br>**`"48" -> Cargos que NO afectan la base imponible del IGV/IVAP`** | - | `[X] HBLTD`<br>`[ ] OBGTR` | `[ ] HBLTD`<br>`[ ] OBGTR`
**_`tasaCargo`_** | **_`Factor de cargo`_**<br><br>`Se deberá consignar un valor comprendido entre 1% y 100%` | - | `[X] HBLTD`<br>`[ ] OBGTR` | `[ ] HBLTD`<br>`[ ] OBGTR`
**_`baseCargo`_** | **_`Monto base del cargo`_** | - | `[X] HBLTD`<br>`[ ] OBGTR` | `[ ] HBLTD`<br>`[ ] OBGTR`
**_`mntCargo`_** | **_`Monto de cargo`_** | - | `[X] HBLTD`<br>`[ ] OBGTR` | `[ ] HBLTD`<br>`[ ] OBGTR`

###  Tabla de campos "[{ anticipos }]"

`Campo` | `Descripción` | `Longitud / Formato` | `Habilitado / Obligatorio Factura y Boleta`
:- | :- | :- | :- 
**_`tipoComprobante`_** | **_`Tipo de comprobante que se realizó el anticipo`_**<br><br>`Consultar catálogo nro. 12 (Código de Documentos Relacionados Tributarios) - Anexo 8 SUNAT`<br><br>`Los únicos valores permitidos son los siguientes:`<br>**`"02" -> Factura,`** _`emitida por anticipos`_<br>**`"03" -> Boleta,`** _`emitida por anticipos`_ | `String(2)`<br><br>`n2` | `[X] HBLTD`<br>`[X] OBGTR`
**_`serieComprobante`_** | _**`Serie del comprobante que se realizó el anticipo`**_ | `String(4)`<br><br>`an4` | `[X] HBLTD`<br>`[X] OBGTR`
**_`numeroComprobante`_** | _**`Número del comprobante que se realizó el anticipo`**_ | `Integer`<br><br>`n..8` | `[X] HBLTD`<br>`[X] OBGTR`
**_`fechaPago`_** | _**`Fecha de pago del anticipo`**_ | `Date()`<br><br>`YYYY-MM-DD` | `[X] HBLTD`<br>`[X] OBGTR` 
**_`monto`_** | _**`Importe del anticipo`**_ | `Decimal(14,2)`<br><br>`n(12,2)` | `[X] HBLTD`<br>`[X] OBGTR` 

###  Tabla de campos "[{ anexos }]"

`Campo` | `Descripción` | `Longitud / Formato` | `Habilitado / Obligatorio Factura y Boleta`
:- | :- | :- | :-
***`tipoGuia`*** | **_`Tipo de guía relacionada`_**<br><br>`Si este campo es utilizado, deberá omitir el campo:`**`tipoOtro`**<br><br>`Consultar catálogo nro. 01 (Código de Tipo de Documento) - Anexo 8 SUNAT`<br><br>`Los únicos valores permitidos son los siguientes:`<br>**`"09" -> Guía de remisión remitente`**<br>**`"31" -> Guía de remisión transportista`** | `String(2)`<br><br>`n2` | `[X] HBLTD`<br>`[ ] OBGTR`
***`tipoOtro`*** | **_`Tipo de documento relacionado`_**<br><br>`Si este campo es utilizado, deberá omitir el campo:`**`tipoGuia`**<br><br>`Consultar catálogo nro. 12 (Código de Documentos Relacionados Tributarios) - Anexo 8 SUNAT`<br><br>`Los únicos valores permitidos son los siguientes:`<br>**`"01" -> Factura - Corregir RUC`**<br>**`"04" -> Ticket de salida - ENAPU`**<br>**`"05" -> Código SCOP`**<br>**`"06" -> Factura electrónica remitente`**<br>**`"07" -> Guía de remisión remitente`**<br>**`"99" -> Otros`** | `String(2)`<br><br>`n2` | `[X] HBLTD`<br>`[ ] OBGTR`
**_`serieComprobante`_** | _**`Serie del comprobante`**_ | `String(4)`<br><br>`an4` | `[X] HBLTD`<br>`[X] OBGTR`
**_`numeroComprobante`_** | _**`Número del comprobante`**_ | `Integer`<br><br>`n..8` | `[X] HBLTD`<br>`[X] OBGTR`

###  Tabla de campos "[{ referencias }]"

`Campo` | `Descripción` | `Longitud / Formato` | `Habilitado / Obligatorio Notas`
:- | :- | :- | :-
***`tipoComprobante`*** | **_`Tipo de comprobante que modifica`_**<br><br>`Consultar catálogo nro. 01 (Código de Tipo de Documento) - Anexo 8 SUNAT` | `String(2)`<br><br>`n2` | `[X] HBLTD`<br>`[X] OBGTR`
**_`serieComprobante`_** | _**`Serie del comprobante que modifica`**_ | `String(4)`<br><br>`an4` | `[X] HBLTD`<br>`[X] OBGTR`
**_`numeroComprobante`_** | _**`Número del comprobante que modifica`**_ | `Integer` <br><br>`n..8` | `[X] HBLTD`<br>`[X] OBGTR`

###  Tabla de campos "{ descuento }"

`Campo` | `Descripción` | `Longitud / Formato` | `Habilitado / Obligatorio Factura y Boleta`
:- | :- | :- | :-
***`codigo`*** | **_`Código de motivo de descuento`_**<br><br>`Consultar catálogo nro. 53 (Códigos de Cargos o Descuentos) - Anexo 8 SUNAT`<br><br>`Los únicos valores permitidos son los siguientes:`<br>**`"02" -> Descuentos globales que afectan la base imponible del IGV/IVAP`**<br>**`"03" -> Descuentos globales que NO afectan la base imponible del IGV/IVAP`**<br>**`"04" -> Descuentos globales por anticipos gravados que afectan la base imponible del IGV/IVAP`**<br>**`"05" -> Descuentos globales por anticipos exonerados`**<br>**`"06" -> Descuentos globales por anticipos inafectos`** | `n2` | `[X] HBLTD`<br>`[X] OBGTR`
**_`tasa`_** | _**`Factor de descuento`**_<br><br>`Se deberá consignar un valor comprendido entre 1% y 100%` | `n(3,5)` | `[X] HBLTD`<br>`[X] OBGTR`
**_`base`_** | _**`Monto base del descuento`**_<br><br>`Monto sobre el cual se aplica la tasa de descuento` | `n(12,2)` | `[X] HBLTD`<br>`[X] OBGTR`
**_`monto`_** | _**`Monto del descuento`**_ | `n(12,2)` | `[X] HBLTD`<br>`[X] OBGTR`

###  Tabla de campos "{ cargo }"

`Campo` | `Descripción` | `Longitud / Formato` | `Habilitado / Obligatorio Factura y Boleta`
:- | :- | :- | :-
***`codigo`*** | **_`Código de motivo de cargo`_**<br><br>`Consultar catálogo nro. 53 (Códigos de Cargos o Descuentos) - Anexo 8 SUNAT`<br><br>`Los únicos valores permitidos son los siguientes:`<br>**`"49" -> Cargos globales que afectan la base imponible del IGV/IVAP`**<br>**`"50" -> Cargos globales que NO afectan la base imponible del IGV/IVAP`** | `n2` | `[X] HBLTD`<br>`[X] OBGTR`
**_`tasa`_** | _**`Factor de cargo`**_<br><br>`Se deberá consignar un valor comprendido entre 1% y 100%` | `n(3,5)` | `[X] HBLTD`<br>`[X] OBGTR`
**_`base`_** | _**`Monto base del cargo`**_<br><br>`Monto sobre el cual se aplica la tasa de cargo` | `n(12,2)` | `[X] HBLTD`<br>`[X] OBGTR`
**_`monto`_** | _**`Monto del cargo`**_ | `n(12,2)` | `[X] HBLTD`<br>`[X] OBGTR`

###  ~~Tabla de campos "{ percepcion }"~~

`Campo` | `Descripción` | `Longitud / Formato` | `Percepción`
:- | :- | :- | :-
**_`tipoRegimen`_** | **_`Código del régimen de percepción`_**<br><br>`Consultar catálogo nro. 22 (Código de Régimen de Percepciones) - Anexo 8 SUNAT` | `n2` | `[X] HBLTD`<br>`[X] OBGTR`
~~**_`tasa`_**~~ | ~~_**`Tasa de percepción`**_<br><br>`El valor consignado deberá estar relacionado al campo`**`tipoRegimen,`**`teniendo en cuenta lo siguiente:`<br>**`"01" -> 2%`**<br>**`"02" -> 1%`**<br>**`"03" -> 0.5%`**<br><br>`Si este campo no es enviado, se consignará el valor en función a lo detallado líneas arriba`~~ | `n(1,2)` | `[X] HBLTD`<br>`[ ] OBGTR`
**_`observacion`_** | **_`Observaciones`_** | `an..250` | `[X] HBLTD`<br>`[ ] OBGTR`
**_`mntPercibido`_** | _**`Importe total percibido`**_ | `n(12,2)` | `[X] HBLTD`<br>`[X] OBGTR`
~~**_`codMonedaPercepcion`_**~~ | ~~**_`Moneda del importe total percibido`_**<br><br>`El único valor permitido es el siguiente:`<br>**`"PEN" -> Sol`**<br><br>`Si este campo no es enviado, se consignará el valor en función a lo detallado líneas arriba`~~ | `n3` | `[X] HBLTD`<br>`[ ] OBGTR`
**_`mntPagado`_** | _**`Importe total pagado`**_ | `n(12,2)` | `[X] HBLTD`<br>`[X] OBGTR`
~~**_`codMonedaPago`_**~~ | ~~**_`Moneda del importe total pagado`_**<br><br>`El único valor permitido es el siguiente:`<br>**`"PEN" -> Sol`**<br><br>`Si este campo no es enviado, se consignará el valor en función a lo detallado líneas arriba`~~ | `n3` | `[X] HBLTD`<br>`[ ] OBGTR`

###  ~~Tabla de campos "{ retencion }"~~

`Campo` | `Descripción` | `Longitud / Formato` | `Retención`
:- | :- | :- | :-
**_`tipoRegimen`_** | **_`Código del régimen de retención`_**<br><br>`Consultar catálogo nro. 23 (Código de Régimen de Retenciones) - Anexo 8 SUNAT` | `n2` | `[X] HBLTD`<br>`[X] OBGTR`
~~**_`tasa`_**~~ | ~~_**`Tasa de retención`**_<br><br>`El valor consignado deberá estar relacionado al campo`**`tipoRegimen,`**`teniendo en cuenta lo siguiente:`<br>**`"01" -> 3%`**<br>**`"02" -> 6%`**<br><br>`Si este campo no es enviado, se consignará el valor en función a lo detallado líneas arriba`~~ | `n(1,2)` | `[X] HBLTD`<br>`[ ] OBGTR`
**_`observacion`_** | **_`Observaciones`_** | `an..250` | `[X] HBLTD`<br>`[ ] OBGTR`
**_`mntRetenido`_** | _**`Importe total retenido`**_ | `n(12,2)` | `[X] HBLTD`<br>`[X] OBGTR`
~~**_`codMonedaRetencion`_**~~ | ~~**_`Moneda del importe total retenido`_**<br><br>`El único valor permitido es el siguiente:`<br>**`"PEN" -> Sol`**<br><br>`Si este campo no es enviado, se consignará el valor en función a lo detallado líneas arriba`~~ | `n3` | `[X] HBLTD`<br>`[ ] OBGTR`
**_`mntPagado`_** | _**`Importe total pagado`**_ | `n(12,2)` | `[X] HBLTD`<br>`[X] OBGTR`
~~**_`codMonedaPago`_**~~ | ~~**_`Moneda del importe total pagado`_**<br><br>`El único valor permitido es el siguiente:`<br>**`"PEN" -> Sol`**<br><br>`Si este campo no es enviado, se consignará el valor en función a lo detallado líneas arriba`~~ | `n3` | `[X] HBLTD`<br>`[ ] OBGTR`

###  Tabla de campos "{ cabecera }"

`Campo` | `Descripción` | `Longitud / Formato` | `Habilitado` | `Obligatorio`
:- | :- | :- | :- | :-
**_`tipoComprobante`_** | **_`Tipo de documento`_**<br><br>`Consultar catálogo nro. 01 (Código de Tipo de Documento) - Anexo 8 SUNAT` | **`n2`** | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND`<br>`20, RET`<br>`40, PER` | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND`<br>`20, RET`<br>`40, PER`
**_`serieComprobante`_** | **_`Serie`_** | **`an2`** | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND`<br>`20, RET`<br>`40, PER` | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND`<br>`20, RET`<br>`40, PER`
**_`numeroComprobante`_** | **_`Número correlativo `_** | **`n..8`** | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND`<br>`20, RET`<br>`40, PER` | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND`<br>`20, RET`<br>`40, PER`
**_`fechaEmision`_** | **_`Fecha de emisión`_** | **`YYYY-MMM-DD`** | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND`<br>`20, RET`<br>`40, PER` | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND`<br>`20, RET`<br>`40, PER`
**_`horaEmision`_** | **_`Hora de emisión`_** | **`hh:mm:ss`** | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND`<br>`20, RET`<br>`40, PER` | `Ninguno`
**_`fechaVencimiento`_** | **_`Fecha de vencimiento`_** | **`YYYY-MM-DD`** | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND` | `Ninguno`
**_`codMoneda`_** | **_`Código del tipo de moneda`_**<br><br>`Si el valor del campo`**`tipoComprobante`**`es`**`"20"`**` - Retención o`**`"40"`**` - Percepción, se deberá consignar`**`"PEN"`**` - Soles` | **`a3`** | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND`<br>`20, RET`<br>`40, PER` | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND`<br>`20, RET`<br>`40, PER`
**_`observacion`_** | **_`Observaciones`_** | **`an..250`** | `20, RET`<br>`40, PER` | `Ninguno`
**_`sustento`_** | **_`Motivo o sustento`_** | **`an..500`** | `07, NC`<br>`08, ND` | `Ninguno`
**_`tipoNota`_** | **_`Código del tipo de nota de (crédito o débito)`_** | **`n2`** | `07, NC`<br>`08, ND` | `07, NC`<br>`08, ND`
**_`tipoOperacion`_** | **_`Tipo de operación`_** | **`n2`** | `01, FA`<br>`03, BV` | `01, FA`<br>`03, BV`
**_`tipoPercepcion`_** | **_`Código de régimen de percepción`_**<br><br>`Consultar catálogo nro. 22 (Código de Régimen de Percepciones) - Anexo 8 SUNAT` | **`n2`** | `40, PER` | `40, PER`
**_`tasaPercepcion`_** | **_`Porcentaje de percepción`_**<br><br>`El valor consignado deberá estar relacionado al campo`**`tipoPercepcion,`**`teniendo en cuenta lo siguiente:`<br>**`"01" -> 2%`**<br>**`"02" -> 1%`**<br>**`"03" -> 0.5%`**<br><br>`Si este campo NO es enviado, se consignará el valor en función a lo detallado líneas arriba` | **`n(1,2)`** | `40, PER` | `40, PER`
**_`imptTotalPercibido`_** | **_`Importe total percibido`_**<br><br>`Este valor debe ser igual a la suma de los importes percibidos por cada comprobante relacionado.`<br><br>`Deberá ser consignado en moneda nacional, es decir, PEN (Soles).` | **`n(12,2)`** | `20, RET` | `20, RET`
**_`imptTotalCobrado`_** | **_`Importe total cobrado`_**<br><br>`Este valor debe ser igual a la suma de los montos totales cobrados por cada comprobante relacionado.`<br><br>`Deberá ser consignado en moneda nacional, es decir, PEN (Soles).` | **`n(12,2)`** | `20, RET` | `20, RET`
~~**_`codMonedaCobro`_**~~ | ~~**_`Moneda del importe total cobrado`_**<br><br>`El único valor permitido es el siguiente:`<br>**`"PEN" -> Sol`**<br><br>`Si este campo NO es enviado, se consignará el valor en función a lo detallado líneas arriba`~~ | ~~**`a3`**~~ | ~~`20, RET`~~ | ~~`20, RET`~~
**_`tipoRetencion`_** | **_`Código de régimen de retención`_**<br><br>`Consultar catálogo nro. 23 (Código de Régimen de Retenciones) - Anexo 8 SUNAT` | **`n2`** | `20, RET` | `20, RET`
**_`tasaRetencion`_** | **_`Porcentaje de retenión`_**<br><br>`El valor consignado deberá estar relacionado al campo`**`tipoRetencion,`**`teniendo en cuenta lo siguiente:`<br>**`"01" -> 3%`**<br>**`"02" -> 6%`**<br><br>`Si este campo NO es enviado, se consignará el valor en función a lo detallado líneas arriba` | **`n(1,2)`** | `20, RET` | `20, RET`
**_`imptTotalRetenido`_** | **_`Importe total retenido`_** | **`n(12,2)`** | `20, RET` | `20, RET`
**_`imptTotalPagado`_** | **_`Importe total pagado`_** | **`n(12,2)`** | `20, RET` | `20, RET`
~~**_`codMonedaPago`_**~~ | ~~**_`Moneda del importe total pagado`_**<br><br>`El único valor permitido es el siguiente:`<br>**`"PEN" -> Sol`**<br><br>`Si este campo NO es enviado, se consignará el valor en función a lo detallado líneas arriba`~~ | ~~**`a3`**~~ | ~~`20, RET`~~ | ~~`20, RET`~~
**_`imptTotalValor`_** | **_`Total valor de venta (bruto)`_**<br><br>`Es el resultado de la suma y/o resta (según corresponda) de los siguientes puntos:`<br><br>`Valor de Venta por Item - Monto de Descuentos Globales ("02" - Que afectan la base imponible del IGV/IVAP) + Montos de Cargos Globales ("49" - Que afectan la base imponible del IGV/IVAP)` | **`n(12,2)`** | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND` | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND`
**_`imptTotalPrecio`_** | **_`Total precio de venta (subtotal)`_** | **`n(12,2)`** | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND` | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND`
**_`imptTotalVenta`_** | **_`Importe total de la venta (total)`_**<br><br>`Es el resultado de la suma y/o resta (según corresponda) de los siguientes puntos:`<br><br>`Total Precio Venta + Sumatoria Otros Cargos (que no afectan la base imponible del IGV) - Sumatoria Otros Descuentos (que no afectan a la base imponible del IGV) - Total Anticipos + Monto Redondeo Importe Total` | **`n(12,2)`** | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND` | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND`
**_`imptRedondeo`_** | **_`Monto de redondeo del importe total`_** | **`n(12,2)`** | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND`<br>`20, RET`<br>`40, PER` | `Ninguno`
**_`imptTotalDescuento`_** | **_`Sumatoria otros descuentos,`_**`que no afectan la base imponible` | **`n(12,2)`** | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND` | `Ninguno`
**_`imptTotalCargo`_** | **_`Sumatoria otros cargos,`_**`que no afectan la base imponible` | **`n(12,2)`** | `01, FA`<br>`03, BV`<br>`07, NC`<br>`08, ND` | `Ninguno`

###  Tabla de campos "[{ retenciones }]"

`Campo` | `Descripción` | `Longitud / Formato` | `Habilitado` | `Obligatorio`
:- | :- | :- | :- | :-
**_`tipoComprobante`_** | **_`Tipo de comprobante relacionado`_**<br><br>`Consultar catálogo nro. 01 (Código de Tipo de Documento) - Anexo 8 SUNAT` | `n2` | `20, RET` | `20, RET`
**_`serieComprobante`_** | _**`Serie del comprobante relacionado`**_ | `an4` | `20, RET` | `20, RET`
**_`numeroComprobante`_** | **_`Número del comprobante relacionado`_** | `n..8` | `20, RET` | `20, RET`
**_`fechaEmision`_** | _**`Importe total retenido`**_ | `YYYY-MM-DD`  | `20, RET` | `20, RET`
**_`imptTotalVenta`_** | **_`Importe total del documento relacionado`_** | `n(12,2)` | `20, RET` | `20, RET`
**_`codMoneda`_** | _**`Tipo de moneda del documento relacionado`**_ | `a3` | `20, RET` | `20, RET`
**_`fechaPago`_** | **_`Fecha de pago`_** | `YYYY-MM-DD` | `20, RET` | `20, RET`
**_`numeroPago`_** | **_`Número de pago`_** | `n..9` | `20, RET` | `20, RET`
**_`imptPago`_** | **_`Importe del pago sin retención`_** | `n(12,2)` | `20, RET` | `20, RET`
**_`codMonedaPago`_** | **_`Moneda del importe del pago sin retención`_** | `a3` | `20, RET` | `20, RET`
**_`imptRetenido`_** | **_`Importe retenido`_** | `n(12,2)` | `20, RET` | `20, RET`
**_`fechaRetencion`_** | **_`Fecha de retención`_** | `YYYY-MM-DD` | `20, RET` | `20, RET`
**_`imptNetoPagar`_** | **_`Importe total a pagar (neto)`_** | `n(12,2)` | `20, RET` | `20, RET`
**_`codMonedaOrigen`_** | **_`Moneda de origen para el tipo de cambio`_** | `a3` | `20, RET` | `Ninguno `
**_`codMonedaDestino`_** | **_`Moneda de destino para el tipo de cambio`_** | `a3` | `20, RET` | `Ninguno`
**_`tasaCambio`_** | **_`Factor aplicado a la moneda de origen`_** | `n(4,6)` | `20, RET` | `Ninguno`
**_`fechaCambio`_** | **_`Fecha de tipo de cambio`_** | `YYYY-MM-DD` | `20, RET` | `Ninguno`


###  Tabla de campos "[{ percepciones }]"

`Campo` | `Descripción` | `Longitud / Formato` | `Habilitado` | `Obligatorio`
:- | :- | :- | :- | :-
**_`tipoComprobante`_** | **_`Tipo de comprobante relacionado`_**<br><br>`Consultar catálogo nro. 01 (Código de Tipo de Documento) - Anexo 8 SUNAT` | `n2` | `40, PER` | `40, PER`
**_`serieComprobante`_** | _**`Serie del comprobante relacionado`**_ | `an4` | `40, PER` | `40, PER`
**_`numeroComprobante`_** | **_`Número del comprobante relacionado`_** | `n..8` | `40, PER` | `40, PER`
**_`fechaEmision`_** | _**`Importe total retenido`**_ | `YYYY-MM-DD`  | `40, PER` | `40, PER`
**_`imptTotalVenta`_** | **_`Importe total del documento relacionado`_** | `n(12,2)` | `40, PER` | `40, PER`
**_`codMoneda`_** | _**`Tipo de moneda del documento relacionado`**_ | `a3` | `40, PER` | `40, PER`
**_`fechaCobro`_** | **_`Fecha de cobro`_** | `YYYY-MM-DD` | `40, PER` | `40, PER`
**_`numeroCobro`_** | **_`Número de cobro`_** | `n..9` | `40, PER` | `40, PER`
**_`imptCobro`_** | **_`Importe del cobro sin percepción`_** | `n(12,2)` | `40, PER` | `40, PER`
**_`codMonedaCobro`_** | **_`Moneda del importe del cobro sin percepción`_** | `a3` | `40, PER` | `40, PER`
**_`imptPercibido`_** | **_`Importe percibido`_** | `n(12,2)` | `40, PER` | `40, PER`
**_`fechaPercepcion`_** | **_`Fecha de percepción`_** | `YYYY-MM-DD` | `40, PER` | `40, PER`
**_`imptNetoCobrar`_** | **_`Importe total a cobrar (neto)`_** | `n(12,2)` | `40, PER` | `40, PER`
**_`codMonedaOrigen`_** | **_`Moneda de origen para el tipo de cambio`_** | `a3` | `40, PER` | `Ninguno `
**_`codMonedaDestino`_** | **_`Moneda de destino para el tipo de cambio`_** | `a3` | `40, PER` | `Ninguno`
**_`tasaCambio`_** | **_`Tipo de cambio,`_**`factor aplicado a la moneda de origen para calcular la moneda de destino` | `n(4,6)` | `40, PER` | `Ninguno`
**_`fechaCambio`_** | **_`Fecha de tipo de cambio`_** | `YYYY-MM-DD` | `40, PER` | `Ninguno`
