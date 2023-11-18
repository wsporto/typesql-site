---
title: Custom queries
description: Write custom queries with raw SQL.
---

If you want to generate a custom query, write the query using raw sql in the folder specified on the typesql.config file.

## Example:

Having the following query in `select-products.sql` file.

```sql
SELECT
  id,
  product_name,
  list_price
FROM products
WHERE discontinued = 0
  AND list_price BETWEEN :minPrice AND :maxPrice
```

TypeSQL will generate the types and function in the file select-products.ts. Then you can import the generate code and execute as following:

```ts
const products = await selectProducts(conn, {
  minPrice: 10,
  maxPrice: 20,
});

/* resultType
{
   id: number,
   product_name: string,
   list_price: number
}[]
*/
```
