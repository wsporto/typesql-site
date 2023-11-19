---
title: IN/NOT IN
description: How to write queries with IN/NOT IN operator
---

Having the following query in `select-products-in-categories.sql`:

```sql
SELECT
    ProductID,
    ProductName,
    UnitPrice
FROM Products
WHERE Discontinued = false
    AND CategoryID IN (:categories)
```

You can use the generated API as below:

```ts
const products = await selectProductsInCategories(client, {
  categories: [10, 11, 12],
});
```

You can also use the `NOT IN` operator:

```sql
SELECT
    ProductID,
    ProductName,
    UnitPrice
FROM Products
WHERE Discontinued = false
    AND CategoryID NOT IN (98, 99, ?)
```

**NOTE:** The IN Clause as shown will not work with the deno_mysql driver. See issue [#70](https://github.com/manyuanrong/deno_mysql/issues/70) in the deno_mysql repository.
