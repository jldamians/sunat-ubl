
# New Document# SUNAT - UBL 2.1

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

###- Tabla de campos "emisor"

Campo | Descripción | Tipo y longitud | Formato | Habilitado / Obligatorio Factura | Habilitado / Obligatorio Boleta | Habilitado / Obligatorio Notas
:---- | :---------- | :-------------- | :------ | :------ | :----- | :----
***`tipoDocumento`*** | Tipo de documento de indentidad | - | - | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio
***`numeroDocumento`*** | Número de documento de identidad | - | - | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio
***`nombre`*** | Razón social o denominación | - | - | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio
***`nombreComercial`*** | Nombre comercial | - | - | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio
***`codUbigeo`*** | Código de ubigeo (dirección fiscal) | - | - | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio
***`departamento`*** | Departamento (dirección fiscal) | - | - | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio
***`provincia`*** | Provincia (dirección fiscal) | - | - | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio
***`distrito`*** | Distrito (dirección fiscal) | - | - | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio
***`codLocal`*** | Código del estableciminto anexo | - | - | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio
***`direccion`*** | Dirección completa (dirección fiscal) | - | - | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio
***`urbanizacion`*** | Urbanización (dirección fiscal) | - | - | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio
***`codPais`*** | Código de país (dirección fiscal) | - | - | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio | [x] Habilitado [x] Obligatorio

