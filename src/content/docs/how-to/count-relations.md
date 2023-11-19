---
title: Count relations
description: How to count relations using TypeSQL
---

Sometimes you may want to return a count of relations (for example, a user's post count). To accomplish this, you can do as the example below.

Having the query below in the file `select-users-with-post-count.sql`:

```sql
SELECT
	u.name,
	count(p.id) as postCount
FROM users u
LEFT JOIN posts p on p.fk_user = u.id
GROUP BY u.id
ORDER BY count(p.id) desc
```

TypeSQL will gererate the function `selectUsersWithPostCount`:

```ts
const usersWithPostCount = await selectUsersWithPostCount(conn);
console.table(usersWithPostCount);
```

Result:

| (index) | name  | postCount |
| ------- | ----- | --------- |
| 0       | user2 | 3         |
| 1       | user1 | 2         |
| 2       | user3 | 1         |
| 3       | user4 | 0         |
