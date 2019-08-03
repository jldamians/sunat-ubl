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
:---- | :---------- | :-------------- | :------ | :------ | :----- | :----
***`tipoDocumento`*** | **_`Tipo de documento de indentidad`_** <br><br> `Consultar catálogo nro. 06 (Códigos de Tipo de Documento de Identidad) - Anexo 8 SUNAT` <br><br> `Se deberá emplear el código `**`6 - Registro Único de Contribuyente (RUC)`** | - | - | `[x] Habilitado [x] Obligatorio` | `[x] Habilitado` <br> `[x] Obligatorio` | `[x] Habilitado` <br> `[x] Obligatorio`
***`numeroDocumento`*** | **_`Número de documento de identidad`_** <br><br> `Número de Registro Único de Contribuyente (RUC)` | - | - | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio
***`nombre`*** | **_`Apellidos y nombres,`_**`denominación o razón social` | - | - | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio
***`nombreComercial`*** | **_`Nombre comercial`_** | - | - | [x] Habilitado [ ] Obligatorio | [x] Habilitado [ ] Obligatorio | [x] Habilitado [ ] Obligatorio
***`codUbigeo`*** | **_`Código de UBIGEO,`_**`del domicilio fiscal` <br><br> `Consultar catálogo nro. 13 (Códigos de Ubicación Geográfica) - Anexo 8 SUNAT` | - | - | [x] Habilitado [ ] Obligatorio | [x] Habilitado [ ] Obligatorio | [x] Habilitado [ ] Obligatorio
***`departamento`*** | **_`Departamento,`_**`del domicilio fiscal` | - | - | [x] Habilitado [ ] Obligatorio | [x] Habilitado [ ] Obligatorio | [x] Habilitado [ ] Obligatorio
***`provincia`*** | **_`Provincia,`_**`del domicilio fiscal` | - | - | [x] Habilitado [ ] Obligatorio | [x] Habilitado [ ] Obligatorio | [x] Habilitado [ ] Obligatorio
***`distrito`*** | **_`Distrito,`_**`del domicilio fiscal` | - | - | [x] Habilitado [ ] Obligatorio | [x] Habilitado [ ] Obligatorio | [x] Habilitado [ ] Obligatorio
***`codLocal`*** | **_`Código del estableciminto anexo,`_**`donde se está realizando la venta de bienes` <br><br> `En caso de no poder determinar el lugar de la venta, informar` **`"0000"`** | - | - | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio
***`direccion`*** | **_`Dirección,`_** `completa y detallada del domicilio fiscal` | - | - | [x] Habilitado [ ] Obligatorio | [x] Habilitado [ ] Obligatorio | [x] Habilitado [ ] Obligatorio
***`urbanizacion`*** | **_`Urbanización,`_**`del domicilio fiscal` | - | - | [x] Habilitado [ ] Obligatorio | [x] Habilitado [ ] Obligatorio | [x] Habilitado [ ] Obligatorio
***`codPais`*** | **_`Código de país,`_**`del domicilio fiscal` | - | - | [x] Habilitado [ ] Obligatorio | [x] Habilitado [ ] Obligatorio | [x] Habilitado [ ] Obligatorio
