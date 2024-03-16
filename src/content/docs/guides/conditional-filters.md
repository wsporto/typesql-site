---
title: Conditional queries
description: Write conditional queries in SQL
---

Sometimes you might to add where conditions dynamically (base on the user input). This can be achieved in different ways with TypeSQL.

## Conditional filters in SQL

This can be done using the `IS NULL` condition.
Here is an example of a query with optional `age` and `name` filters:

```sql
SELECT * FROM users
WHERE (:name IS NULL OR name like concat('%', nameContains, '%'))
  AND (:minimumAge IS NULL OR age >= :minimumAge)
```

Then you can run the query passing only the filters you want: For example, code below will only filter by name:

```ts
const users = await selectUsers(conn, {
  nameContains: "john",
});
```

Or filter only by age:

```ts
const usersAbove18 = await selectUsers(conn, {
  minimumAge: 18,
});
```

## Conditional filters in SQL for list

It also works with the `IN` operator, but you can't use `:param is NOT NULL` when `:param` is a list.
Instead you can do as following:

```sql
SELECT
    ProductID,
    ProductName,
    UnitPrice
FROM Products
WHERE (:filterByCategory OR CategoryID IN (:categoryIn))
```

And you can run the query like this:

```ts
const products = await selectProducts(conn, {
  filterByCategory: true,
  categoriesIn: [1, 2, 3],
});
```

Or if you don't want to filter by category:

```ts
const products = await selectProducts(conn, {
  filterByCategory: false,
  categoriesIn: [],
});
```

More complicated dynamic queries can be done similarly. But If you need something more dynamic (choose columns to be SELECTed or need conditional JOINs or CTE) you can use the [dynamic queries](/guides/dynamic-queries) feature.
