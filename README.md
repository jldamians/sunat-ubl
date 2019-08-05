

# SUNAT - UBL 2.1

## Nomenclatura

Tipo de campo   | Descripción
:-------------- | :----------
`a`               | `Caracter alfabético`
`n`               | `Caracter numérico`
`an`              | `Caracter alfanumérico`

Longitud de campo | Descripción
:---------------- | :----------
`a3`                | `3 caracteres alfabéticos` ***(longitud fija)***
`n3`                | `3 caracteres numéricos` ***(longitud fija)***
`an3`               | `3 caracteres alfanuméricos` ***(longitud fija)***
`a..3`              | `hasta 3 caracteres alfabéticos` ***(longitud variable)***
`n..3`              | `hasta 3 caracteres numéricos` ***(longitud variable)***
`an..3`             | `hasta 3 caracteres alfanuméricos` ***(longitud variable)***

Formato de campo  | Descripción
:---------------- | :----------------
`n(10,2)`           | `hasta 2 enteros + punto decimal + hasta 2 decimales`
`F###`              | `inicia con la letra F seguida de 3 números`
`YYYY-MM-DD`        | `YYYY=año, MM=mes y DD=día`

###  Tabla de campos "emisor"

Campo | Descripción | Tipo y longitud | Formato | Habilitado / Obligatorio Factura | Habilitado / Obligatorio Boleta | Habilitado / Obligatorio Notas
:---- | :---------- | :-------------- | :------ | :------------------------------- | :------------------------------ | :-----------------------------
***`tipoDocumento`*** | **_`Tipo de documento de indentidad`_** <br><br> `Consultar catálogo nro. 06 (Códigos de Tipo de Documento de Identidad) - Anexo 8 SUNAT` <br><br> `Se deberá emplear el código `**`6 - Registro Único de Contribuyente (RUC)`** | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
***`numeroDocumento`*** | **_`Número de documento de identidad`_** <br><br> `Número de Registro Único de Contribuyente (RUC)` | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
***`nombre`*** | **_`Apellidos y nombres,`_**`denominación o razón social` | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
***`nombreComercial`*** | **_`Nombre comercial`_** | - | - | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio`
***`codUbigeo`*** | **_`Código de UBIGEO,`_**`del domicilio fiscal` <br><br> `Consultar catálogo nro. 13 (Códigos de Ubicación Geográfica) - Anexo 8 SUNAT` | - | - | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio`
***`departamento`*** | **_`Departamento,`_**`del domicilio fiscal` | - | - | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio`
***`provincia`*** | **_`Provincia,`_**`del domicilio fiscal` | - | - | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio`
***`distrito`*** | **_`Distrito,`_**`del domicilio fiscal` | - | - | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio`
***`codLocal`*** | **_`Código del estableciminto anexo,`_**`donde se está realizando la venta de bienes` <br><br> `En caso de no poder determinar el lugar de la venta, informar` **`"0000"`** | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
***`direccion`*** | **_`Dirección,`_** `completa y detallada del domicilio fiscal` | - | - | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio`
***`urbanizacion`*** | **_`Urbanización,`_**`del domicilio fiscal` | - | - | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio`
***`codPais`*** | **_`Código de país,`_**`del domicilio fiscal` | - | - | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio`

###  Tabla de campos "receptor"

Campo | Descripción | Tipo y longitud | Formato | Habilitado / Obligatorio Factura | Habilitado / Obligatorio Boleta | Habilitado / Obligatorio Notas
:---- | :---------- | :-------------- | :------ | :------------------------------- | :------------------------------ | :-----------------------------
***`tipoDocumento`*** | **_`Tipo de documento de indentidad`_** <br><br> `Consultar catálogo nro. 06 (Códigos de Tipo de Documento de Identidad) - Anexo 8 SUNAT` <br><br> `Se deberá emplear el código `**`6 - Registro Único de Contribuyente (RUC)`** | - | - | `[x] Habilitado [x] Obligatorio` | `[x] Habilitado` <br> `[x] Obligatorio` | `[x] Habilitado` <br> `[x] Obligatorio`
***`numeroDocumento`*** | **_`Número de documento de identidad`_** <br><br> `Número de Registro Único de Contribuyente (RUC)` | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
***`nombre`*** | **_`Apellidos y nombres,`_**`denominación o razón social` | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
***`codUbigeo`*** | **_`Código de UBIGEO`_** <br><br> `Consultar catálogo nro. 13 (Códigos de Ubicación Geográfica) - Anexo 8 SUNAT` | - | - | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio`
***`departamento`*** | **_`Departamento`_** | - | - | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio`
***`provincia`*** | **_`Provincia`_** | - | - | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio`
***`distrito`*** | **_`Distrito`_** | - | - | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio`
***`direccion`*** | **_`Dirección,`_** `completa y detallada` | - | - | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio`
***`urbanizacion`*** | **_`Urbanización`_** | - | - | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio`
***`codPais`*** | **_`Código de país`_** | - | - | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio`

###  Tabla de campos "tributo"

Campo | Descripción | Tipo y longitud | Formato | Habilitado / Obligatorio Factura | Habilitado / Obligatorio Boleta | Habilitado / Obligatorio Notas
:- | :- | :- | :- | :- | :- | :-
***`mntTotal`*** | **_`Monto total de tributos`_**<br><br>`Se deberá consignar la sumatoria de los montos de los siguientes`**_`Tipos de Tributos:`_**<br><br>`Consultar catálogo nro. 05 (Códigos de Tipos de Tributos y Otros Conceptos) - Anexo 8 SUNAT`<br><br>**`1000`**_`- Impuestos General a las Ventas (IGV)`_<br>**`1016`**_`- Impuesto a la Venta Arroz Pilado (IVAP)`_<br>**`2000`**_`- Impuesto Selectivo al Consumo (ISC)`_<br>**`7152`**_`- Impuesto al Consumo de las Bolsas de Plástico (ICBPER)`_<br>**`9999`**_`- Otros Tributos`_ | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
**_`conceptos`_** | - | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
**_`_.codigo`_** | _**`Código de tributo`**_<br><br>`Consultar catálogo nro. 05 (Códigos de Tipos de Tributos y Otros Conceptos) - Anexo 8 SUNAT` | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
**_`_.base`_** | _**`Total valor de venta`**_<br><br>`Si el`_**`Código de Tributo`**_`es`_**`"7152" - ICBPER,`**_`se deberá consignar`_**`0.00`**_ | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
**_`_.monto`_** | _**`Importe del tributo`**_ | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`

###  Tabla de campos "detalle"

Campo | Descripción | Tipo y longitud | Formato | Habilitado / Obligatorio Factura | Habilitado / Obligatorio Boleta | Habilitado / Obligatorio Notas
:- | :- | :- | :- | :- | :- | :-
***`codMedida`*** | **_`Unidad de medida,`_**`por ítem`<br><br>`Consultar catálogo nro. 03 (Código de Tipo de Unidad de Medida Comercial) - Anexo 8 SUNAT` | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
***`cantidad`*** | **_`Cantidad de unidades,`_**`por ítem` | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
***`tipoPrecioUnitario`*** | **_`Tipo de precio unitario,`_**`por ítem`<br><br>`Consultar catálogo nro. 16 (Código de Tipo de Precio de Venta Unitario) - Anexo 8 SUNAT` | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
***`imptPrecioUnitario`*** | **_`Precio de venta unitario,`_**`por ítem` | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
***`imptValorUnitario`*** | **_`Valor unitario,`_**`por ítem` | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
***`imptValorTotal`*** | **_`Valor de venta,`_**`por ítem` | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
**_`tributo`_** | - | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
**_`_.mntTotal`_** | _**`Código de tributo`**_<br><br>`Consultar catálogo nro. 05 (Códigos de Tipos de Tributos y Otros Conceptos) - Anexo 8 SUNAT` | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
**_`_.conceptos`_** | - | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
**_`__.base`_** | _**`Monto base`**_<br><br>`Si el`_**`Código de Tributo`**_`es`_**`"7152" - ICBPER,`**_`se deberá consignar la`_**`cantidad de bolsas de plástico`**_`adquiridas por el consumidor del bien o servicio` | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
**_`__.tasa`_** | _**`Tasa del tributo`**_<br><br>`Si el`_**`Código de Tributo`**_`es`**`"7152" - ICBPER,`**`se deberá tener en cuenta lo siguiente:`<br>_**`Año 2019 -> 0.10`<br>`Año 2020 -> 0.20`<br>`Año 2021 -> 0.30`<br>`Año 2022 -> 0.40`<br>`Años sigs. -> 0.50`**_ | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
**_`__.monto`_** | _**`Monto del tributo`**_ | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
**_`__.tipoAfectacionIgv`_** | _**`Tipo de afectación  IGV,`**`por ítem`_<br><br>`Consultar catálogo nro. 07 (Código de Tipos de Afectación del IGV) - Anexo 8 SUNAT`<br><br>`Si el`_**`Código de Tributo`**_`es`**`"7152" - ICBPER,`**`se deberá`**`OMITIR ESTE CAMPO`** | - | - | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio` | `[x] Habilitado`<br>`[x] Obligatorio`
**_`__.tipoSistemaIsc`_** | _**`Tipo de sistema ISC,`**_`por ítem`<br><br>`Consultar catálogo nro. 08 (Código de Tipos de Sistema de Cálculo del ISC) - Anexo 8 SUNAT`<br><br>`Si el`_**`Código de Tributo`**_`es`**`"7152" - ICBPER,`**`se deberá`**`OMITIR ESTE CAMPO`** | - | - | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio` | `[x] Habilitado`<br>`[ ] Obligatorio`
