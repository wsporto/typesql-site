---
title: Dynamic queries
description: Build queries dynamically
---

When you add the annotation `-- @dynamicQuery` in the SQL, the generated function will have parameters to pass **where conditions** and **select columns** dynamically. TypeSQL will build the final SQL based on the query parameters and will include only the necessary JOINS, CTEs and SELECT columns.

See the SQL below:

```sql
-- @dynamicQuery
SELECT
    *
FROM Products
```

### Select columns

Now you can choose which columns you want to select:

```ts
const products = await selectProducts(conn, {
  select: {
    CategoryID: true,
    ProductName: true,
    UnitPrice: true,
  },
});
```

If you run without the select parameter, it will return all the columns:

```ts
const products = await selectProducts(conn);
```

### Add filters dynamically

You can also add filter dynamically:

```ts
const productNameLike = "Coffee";
const products = await selectProducts(conn, {
  select: {
    ProductID: true,
    ProductName: true,
    UnitPrice: true,
  },
  where: [["ProductName", "LIKE", productNameLike]],
});
```

TypeSQL will build the SQL dynamically. For this query the built SQL will be:

```sql
SELECT
    p.ProductID,
    p.ProductName,
    p.UnitPrice
FROM Products p
WHERE 1 = 1
AND p.ProductName LIKE concat('%', ?, '%')
```

You can choose any column to filter in a type-safe way:

![Choosing the dynamic filter](./dynamic-query01.png)

### EXISTS and NOT EXISTS operators

You also can easily add **EXISTS** and **NOT EXISTS** operators as a dynamic filter with TypeSQL. For this you should use the EXISTS (or NOT EXISTS) opereator in the SELECT clause, as the example below:

```sql {5-6}
//search-people.sql
SELECT
  p.first_name,
  p.last_name,
  EXISTS (SELECT 1 FROM pets WHERE owner_id = p.id and specie='cat') as hasCat,
  EXISTS (SELECT 1 FROM pets WHERE owner_id = p.id and specie='dog') as hasDog
FROM people p
```

You can run this query and see the result:

| first_name | last_name | hasCat | hasDog |
| ---------- | --------- | ------ | ------ |
| person1    | lastname1 | 1      | 1      |
| person2    | lastname2 | 0      | 1      |
| person3    | lastname3 | 0      | 0      |
| person4    | lastname4 | 0      | 0      |

Now you can add the filters dynamically when you call the `searchPeople` function:

```ts
//main.ts
const result = await searchPeople(conn, {
  where: [["hasDog", "=", 1]],
});
```

Result:

| first_name | last_name | hasCat | hasDog |
| ---------- | --------- | ------ | ------ |
| person1    | lastname1 | 1      | 1      |
| person2    | lastname2 | 0      | 1      |

You can choose only the desired column to be shown adding the select parameter:

```ts {3-6}
//main.ts
const result = await searchPeople(conn, {
  select: {
    first_name: true,
    last_name: true,
  },
  where: [["hasDog", "=", 1]],
});
```

Result:
| first_name | last_name |
| ---------- | --------- |
| person1 | lastname1 |
| person2 | lastname2 |
