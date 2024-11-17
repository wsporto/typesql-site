---
title: TypeSQL with Deno
description: How to use TypeSQL with Deno
---

## How to use TypeSQL with Deno

This guide will provide a step-by-step process for using TypeSQL with Deno.

1. Setting Up a New Project

```sh
deno init deno-typesql
cd deno-typesql
```

2. Add `npm:@lisbql/client` as a Dependency:
```sh
deno add npm:@libsql/client
```

3. Add a Task to Run TypeSQL

Since TypeSQL is used only during development, you don’t need to add it as a dependency. Instead, you can add a script to run it. You'll also need to specify the necessary permissions for Deno to execute the typesql-cli.
Permissions required:
- `--allow-read (-R)`: Permission to read the `node_module` folder.
- `--allow-env (-E):` Permission to read the enviroment variable (required by some libraries).
- `--allow-ffi:` Permission for the libsql dependency.
- `--allow-write:` Permission to write the generated code in the folder `./src/sql`.

```json
{
  "tasks": {
    "dev": "deno run --watch main.ts",
    "typesql": "deno run -RE --allow-write=./src/sql --allow-ffi npm:typesql-cli"
  }
}
```

4. Create the `typesql.json` Configuration File

```sh
deno run typesql init
```
Deno will prompt for permission to write the `typesql.json` configuration file.

5. Modify the `typesql.json` and create the `./src/sql` folder where your SQL queries will reside:

```json
{
    "databaseUri": "mydb.db",
    "sqlDir": "./src/sql",
    "client": "libsql",
    "includeCrudTables": [],
    "moduleExtension": "ts"
}
```

6. Write your queries

```sql
// src/sql/my-query.sql
SELECT 1 + 1 as result
```

7. Generate the code with TypeSQL:

```sh
deno run typesql compile -w
```
This will generate TypeScript client code for your queries in the specified folder (e.g., ./src/sql).

8. Import the generated functions:

Now you can import and run your queries from the generated TypeScript code. For example, in your src/main.ts file:

```ts
// src/main.ts
import { createClient } from "@libsql/client/node";
import { myQuery } from "./sql/my-query.ts";

const client = createClient({
  url: 'file:mydb.db'
})

const result = await myQuery(client);
console.log("result=", result);
```

9. Run

Finally, you can run with the following command:

```sh
deno -E --allow-ffi ./src/main.ts
```
