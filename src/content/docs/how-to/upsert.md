---
title: INSERT If Row Does Not Exist (UPSERT)
description: How to INSERT If Row Does Not Exist (UPSERT) in TypeSQL
---

MySQL provides some useful statements when it is necessary to UPDATE or INSERT (if the row does not exist) - know as UPSERT operation. The excelent article below explain the different methods:

<a href="https://www.atlassian.com/data/admin/how-to-insert-if-row-does-not-exist-upsert-in-mysql" target="_blank">How to INSERT If Row Does Not Exist (UPSERT) in MySQL</a>

## Using INSERT ... ON DUPLICATE KEY UPDATE

Below is an example of how to update a book or insert (if it does not exist).

File `insert-book.sql`:

```sql
INSERT INTO books
    (title, isbn, year_published)
VALUES
    (:title, :isbn, :year_published)
ON DUPLICATE KEY UPDATE
    title = :title,
    isbn = :isbn,
    year_published = :year_published
```

You can use the generated function:

```ts
const insertedBook = await upsertBook(conn, {
  title: "Book title",
  isbn: "123-123",
  year_published: new Date(2023, 1, 1),
});
```
