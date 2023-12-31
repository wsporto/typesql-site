---
title: Nested query result
description: Show how to get nested query result using TypeSQL.
---

TypeSQL also has support for nested queries results.

When you create your queries, by default, TypeSQL will generate a tabular result type, even if your queries include JOINs relations. For example, consider the query below in the file `select-user-posts.sql`:

```sql
// select-user-posts.sql
SELECT
    id as user_id,
    name as user_name,
    posts.id as post_id,
    title as post_title,
    body as post_body
FROM users
INNER JOIN posts on posts.user_id = users.id
```

For this query, TypeSQL by default will generate a type result like this:

```ts
// main.ts
const result = await selectUserPosts(conn);

//result type
const result: {
  user_id: number;
  user_name: string;
  post_id: number;
  post_title: string;
  post_body: string;
}[];
```

If you want to generate a nested query result, you must annotate the query with `@nested` in a SQL comment.
For example:

```sql
// select-user-posts.sql
-- @nested
SELECT
  *
FROM users
INNER JOIN posts on posts.user_id = users.id
```

Now TypeSQL will generate a nested type that will be returned when you run `selectUserPostsNested(conn)`:

```ts
// main.ts
const result = await selectUserPostsNested(conn);

//result type
const result: {
  id: number;
  name: string;
  posts: {
    id: number;
    title: string;
    body: string;
  }[];
}[];
```

## Relationship Patterns

### One To One

Below is an example where one _Customer_ is associated with one _Address_.

```sql
// schema.sql
CREATE TABLE customers(
    id SERIAL,
    full_name VARCHAR(255) NOT NULL,
    address_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY `pk_id`(`id`),
    CONSTRAINT `fk_customers_addresses`
        FOREIGN KEY (`address_id`)
        REFERENCES `addresses` (`id`)
);

CREATE TABLE addresses(
    id SERIAL,
    address VARCHAR(255) NOT NULL,
    zip_code VARCHAR(16) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state CHAR(2) NOT NULL,
    PRIMARY KEY `pk_id`(`id`)
);
```

```sql
// select-customer-with-address.sql
-- @nested
SELECT *
FROM customers c
INNER JOIN addresses as address ON address.id = c.address_id
WHERE c.id = :customer_id
```

Use the generated function:

```ts
// main.ts
const result = await selectCustomerWithAddressNested(conn, { customer_id: 1 });

/* result type
{
  id: number,
  full_name: string,
  address_id: number,
  address: {
    id: number,
    address: string,
    zip_code: string,
    city: string,
    state: string
  }
}
/*
```

## Nested result limitations

When you use nested queries you must project the `primary key` of each relation in the query. If you have a query like this `SELECT ... FROM users LEFT JOIN posts LEFT JOIN comments` you must project the primary of the tables: `users`, `posts` and `comments`.

For example, the query below can't be annotated with ` @nested` because it doesn't project the primary key of the `posts` table (posts.id).

```sql
-- This query can't be annotated with @nested
SELECT
    id,
    name,
    title,
    body
FROM users
INNER JOIN posts on posts.user_id = users.id
```
