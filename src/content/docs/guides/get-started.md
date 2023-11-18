---
title: Get started
description: Get started using TypesSQL.
---

1. `npm install --save-dev typesql-cli`

2. Add the typesql.json configuration file in project root folder. You can generate an template with cli command `npx typesql init`.

```json
{
  "databaseUri": "mysql://root:password@localhost/mydb",
  "sqlDir": "./sqls",
  "target": "node"
}
```

3. Write your queries in the folder specified in the configuration file. You can also use the cli to scaffold the queries.

```
sqls\
    select-products.sql
    insert-product.sql
    update-product.sql
```

4. Then run `typesql compile --watch` to start typesql in watch mode. After that you will have one Typescript file for each query file.

```
sqls\
    select-products.sql
    select-products.ts
    insert-product.sql
    insert-product.ts
    update-product.sql
    update-product.ts
```

5. Now you can import and use the generated code.

```ts
const products = await selectProducts(...

const updateResult = await updateProduct(...
```
