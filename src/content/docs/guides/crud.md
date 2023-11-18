---
title: Automatic CRUD generation
description: Show hot wo generate CRUD operations for the specified tables.
---

Typesql can automatically generate CRUD operations for the tables you want.
You can specify the tables you want to generate CRUD operations on the config file `typesql.json` with the attribute **includeCrudTables**.

```json
{
  "databaseUri": "mysql://root:password@localhost/mydb",
  "sqlDir": "./src/sqls",
  "target": "node",
  "includeCrudTables": ["*"]
}
```

If you use [*], TypeSQL will generate CRUD operations for all the tables on your schema.

## CRUD Operations

Suppose you have the table books as defined below:

```sql
CREATE TABLE books(
    id SERIAL,
    title VARCHAR(255) NOT NULL,
    isbn char(50) NOT NULL,
    PRIMARY KEY `pk_id`(`id`)
)
```

If you define the configuration "includeCrudTables": ["*"], TypeSQL will generate the following functions `insertIntoBooks(...)`, `selectFromBooks(...)`, `updateBooks(...)` and `deleteFromBooks(...)`.

See an example of how to call the generated functions:

```ts
const insertedBook = await insertIntoBooks(conn, {
  title: "my book title",
  isbn: "123-123-123",
});

const book = await selectFromBooks(conn, { id: 1 });

await updateBooks(conn, { id: 1 });

await deleteFromBooks(conn, { id: 1 });
```
