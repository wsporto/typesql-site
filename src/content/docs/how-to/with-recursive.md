---
title: WITH RECURSIVE
description: How to write queries with WITH RECURSIVE
---

If you want to generate a sequence of numbers up to the specified number.

File: `generate-sequence.sql`:

```sql
WITH RECURSIVE seq (sequence) AS
(
    SELECT 1
    UNION ALL
    SELECT sequence + 1 FROM seq WHERE sequence < :max
)
SELECT * FROM seq
```

```ts
const sequence = generateSequence(conn, { max: 5 });
console.table(sequence);
```

Result:

| sequence |
| -------- |
| 1        |
| 2        |
| 3        |
| 4        |
| 5        |
