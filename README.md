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

###  Tabla de campos "emisor"

Campo | Descripción | Tipo y longitud | Formato | Habilitado / Obligatorio Factura | Habilitado / Obligatorio Boleta | Habilitado / Obligatorio Notas
:- | :- | :- | :- | :- | :- | :-
***`tipoDocumento`*** | **_`Tipo de documento de indentidad`_** <br><br> `Consultar catálogo nro. 06 (Códigos de Tipo de Documento de Identidad) - Anexo 8 SUNAT` <br><br> `Se deberá emplear el código `**`6 - Registro Único de Contribuyente (RUC)`** | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
***`numeroDocumento`*** | **_`Número de documento de identidad`_** <br><br> `Número de Registro Único de Contribuyente (RUC)` | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
***`nombre`*** | **_`Apellidos y nombres,`_**`denominación o razón social` | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
***`nombreComercial`*** | **_`Nombre comercial`_** | - | - | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio`
***`codUbigeo`*** | **_`Código de UBIGEO,`_**`del domicilio fiscal` <br><br> `Consultar catálogo nro. 13 (Códigos de Ubicación Geográfica) - Anexo 8 SUNAT` | - | - | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio`
***`departamento`*** | **_`Departamento,`_**`del domicilio fiscal` | - | - | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio`
***`provincia`*** | **_`Provincia,`_**`del domicilio fiscal` | - | - | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio`
***`distrito`*** | **_`Distrito,`_**`del domicilio fiscal` | - | - | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio`
***`codLocal`*** | **_`Código del estableciminto anexo,`_**`donde se está realizando la venta de bienes` <br><br> `En caso de no poder determinar el lugar de la venta, informar` **`"0000"`** | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
***`direccion`*** | **_`Dirección,`_** `completa y detallada del domicilio fiscal` | - | - | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio`
***`urbanizacion`*** | **_`Urbanización,`_**`del domicilio fiscal` | - | - | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio`
***`codPais`*** | **_`Código de país,`_**`del domicilio fiscal` | - | - | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio`

###  Tabla de campos "receptor"

Campo | Descripción | Tipo y longitud | Formato | Habilitado / Obligatorio Factura | Habilitado / Obligatorio Boleta | Habilitado / Obligatorio Notas
:- | :- | :- | :- | :- | :- | :-
***`tipoDocumento`*** | **_`Tipo de documento de indentidad`_** <br><br> `Consultar catálogo nro. 06 (Códigos de Tipo de Documento de Identidad) - Anexo 8 SUNAT` <br><br> `Se deberá emplear el código `**`6 - Registro Único de Contribuyente (RUC)`** | - | - | `[X] Habilitado [X] Obligatorio` | `[X] Habilitado` <br> `[X] Obligatorio` | `[X] Habilitado` <br> `[X] Obligatorio`
***`numeroDocumento`*** | **_`Número de documento de identidad`_** <br><br> `Número de Registro Único de Contribuyente (RUC)` | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
***`nombre`*** | **_`Apellidos y nombres,`_**`denominación o razón social` | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
***`codUbigeo`*** | **_`Código de UBIGEO`_** <br><br> `Consultar catálogo nro. 13 (Códigos de Ubicación Geográfica) - Anexo 8 SUNAT` | - | - | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio`
***`departamento`*** | **_`Departamento`_** | - | - | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio`
***`provincia`*** | **_`Provincia`_** | - | - | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio`
***`distrito`*** | **_`Distrito`_** | - | - | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio`
***`direccion`*** | **_`Dirección,`_** `completa y detallada` | - | - | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio`
***`urbanizacion`*** | **_`Urbanización`_** | - | - | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio`
***`codPais`*** | **_`Código de país`_** | - | - | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio`

###  Tabla de campos "tributo"

Campo | Descripción | Tipo y longitud | Formato | Habilitado / Obligatorio Factura | Habilitado / Obligatorio Boleta | Habilitado / Obligatorio Notas
:- | :- | :- | :- | :- | :- | :-
***`mntTotal`*** | **_`Monto total de tributos`_**<br><br>`Se deberá consignar la sumatoria de los montos de los siguientes`**_`Tipos de Tributos:`_**<br><br>`Consultar catálogo nro. 05 (Códigos de Tipos de Tributos y Otros Conceptos) - Anexo 8 SUNAT`<br><br>**`1000`**_`- Impuestos General a las Ventas (IGV)`_<br>**`1016`**_`- Impuesto a la Venta Arroz Pilado (IVAP)`_<br>**`2000`**_`- Impuesto Selectivo al Consumo (ISC)`_<br>**`7152`**_`- Impuesto al Consumo de las Bolsas de Plástico (ICBPER)`_<br>**`9999`**_`- Otros Tributos`_ | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
**_`conceptos`_** | *`[{ codigo, base, monto }]`* | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
**_`[{conceptos}].codigo`_** | _**`Código de tributo`**_<br><br>`Consultar catálogo nro. 05 (Códigos de Tipos de Tributos y Otros Conceptos) - Anexo 8 SUNAT` | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
**_`[{conceptos}].base`_** | _**`Total valor de venta`**_<br><br>`Si el`_**`Código de Tributo`**_`es`_**`"7152" - ICBPER,`**_`se deberá consignar`_**`0.00`**_ | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
**_`[{conceptos}].monto`_** | _**`Importe del tributo`**_ | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`

###  Tabla de campos "detalle"

Campo | Descripción | Tipo y longitud | Formato | Habilitado / Obligatorio Factura | Habilitado / Obligatorio Boleta | Habilitado / Obligatorio Notas
:- | :- | :- | :- | :- | :- | :-
***`codMedida`*** | **_`Unidad de medida,`_**`por ítem`<br><br>`Consultar catálogo nro. 03 (Código de Tipo de Unidad de Medida Comercial) - Anexo 8 SUNAT` | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
***`cantidad`*** | **_`Cantidad de unidades,`_**`por ítem` | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
***`tipoPrecioUnitario`*** | **_`Tipo de precio unitario,`_**`por ítem`<br><br>`Consultar catálogo nro. 16 (Código de Tipo de Precio de Venta Unitario) - Anexo 8 SUNAT` | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
***`imptPrecioUnitario`*** | **_`Precio de venta unitario,`_**`por ítem` | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
***`imptValorUnitario`*** | **_`Valor unitario,`_**`por ítem` | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
***`imptValorTotal`*** | **_`Valor de venta,`_**`por ítem` | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
**_`tributo`_** | *`{ mntTotal, conceptos }`* | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
**_`{tributo}.mntTotal`_** | _**`Monto total de tributos,`**_`por ítem` | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
**_`{tributo}.conceptos`_** | *`[{ base, tasa, monto, tipoAfectacionIgv, tipoAfectacionIsc, tipoAfectacionOtros, tipoAfectacionIcbper }]`* | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
**_`[{conceptos}].tipoAfectacionIgv`_** | _**`Tipo de afectación  IGV,`**`por ítem`_<br><br>`Consultar catálogo nro. 07 (Código de Tipos de Afectación del IGV) - Anexo 8 SUNAT`<br><br>`Si este campo es utilizado, deberá omitir los campos:`**<br>`tipoAfectacionIsc`<br>`tipoAfectacionOtros`<br>`tipoAfectacionIcbper`** | - | - | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio`
**_`[{conceptos}].tipoAfectacionIsc`_** | _**`Tipo de afectación ISC,`**_`por ítem`<br><br>`Consultar catálogo nro. 08 (Código de Tipos de Sistema de Cálculo del ISC) - Anexo 8 SUNAT`<br><br>`Si este campo es utilizado, deberá omitir los campos:`**<br>`tipoAfectacionIgv`<br>`tipoAfectacionOtros`<br>`tipoAfectacionIcbper`** | - | - | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio`
**_`[{conceptos}].tipoAfectacionOtros`_** | _**`Tipo de afectación Otros,`**_`por ítem`<br><br>`Se deberá consignar`**`"00",`**`el cual será el único valor permitido`<br><br>`Si este campo es utilizado, deberá omitir los campos:`**<br>`tipoAfectacionIgv`<br>`tipoAfectacionIsc`<br>`tipoAfectacionIcbper`** | - | - | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio`
**_`[{conceptos}].tipoAfectacionIcbper`_** | _**`Tipo de afectación ICBPER,`**_`por ítem`<br><br>`Se deberá consignar`**`"00",`**`el cual será el único valor permitido`<br><br>`Si este campo es utilizado, deberá omitir los campos:`**<br>`tipoAfectacionIgv`<br>`tipoAfectacionIsc`<br>`tipoAfectacionOtros`** | - | - | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio` | `[X] Habilitado`<br>`[ ] Obligatorio`
**_`[{conceptos}].base`_** | _**`Monto base`**_<br><br>`Si se utiliza el campo`**`tipoAfectacionIcbper,`**`se deberá consignar la`_**`cantidad de bolsas de plástico`**_`adquiridas por el consumidor del bien o servicio` | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
**_`[{conceptos}].tasa`_** | _**`Tasa del tributo`**_<br><br>`Si se utiliza el campo`**`tipoAfectacionIcbper,`**`se deberá consignar uno de los siguientes valores:`<br>_**`Año 2019 -> 0.10`<br>`Año 2020 -> 0.20`<br>`Año 2021 -> 0.30`<br>`Año 2022 -> 0.40`<br>`Años sigs. -> 0.50`**_ | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
**_`[{conceptos}].monto`_** | _**`Monto del tributo`**_ | - | - | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio` | `[X] Habilitado`<br>`[X] Obligatorio`
