---
title: SvelteKit and Cloudflare D1
description: How to build and deploy a SvelteKit application with Cloudflare D1 and TypeSQL
---

## SvelteKit and Cloudflare D1

This guide will provide a step-by-step process for building and deploying a SvelteKit application with Cloudflare D1 and TypeSQL.

1. Setting up a new project

   ```sh
   npm create cloudflare@latest -- my-svelte-app --framework=svelte
   ```

   See: https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-site/

   Install wrangler and TypeSQL as dev dependencies:

   ```sh
   npm install --save-dev wrangler typesql-cli
   ```

   Create the typesql.json config file:

   ```sh
   npx typesql init
   ```

   Change the `typesql.json`:

   ```json
   // typesql.json
   {
     "databaseUri": "./mydb.db",
     "sqlDir": "./src/server/sql",
     "client": "d1",
     "includeCrudTables": []
   }
   ```

   After you have installed the project dependencies, start the application:

   ```sh
   npm run dev
   ```

2. Create the d1 Database

   ```sh
   npx wrangler d1 create my-d1-database
   ```

   Paste the result in the wrangle.toml file:

   ```
   [[d1_databases]]
   binding = "DB"
   database_name = "my-d1-database"
   database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
   ```

3. Update `src/app.d.ts` to expand the Platform interface to the below:

```ts
// src/app.d.ts
declare global {
  namespace App {
    interface Platform {
      env: {
        DB: D1Database;
      };
      cf: CfProperties;
      ctx: ExecutionContext;
    }
  }
}
```

4. Create a migration:

```sh
npx wrangler d1 migrations create my-d1-database create-initial-schema
```

5. Create the database schema:

PS: If you are using VSCode and want to have autocompletion for SQL, install the [TypeSQL Language Server](https://marketplace.visualstudio.com/manage/publishers/wsporto/extensions/typesql-language-server/hub?_a=acquisition) extension.

```sql
// migrations/0001_create-initial-schema.sql
CREATE TABLE users(
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL
);

CREATE TABLE posts(
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    user_id INTEGER NOT NULL,

    FOREIGN KEY(user_id) REFERENCES users(id)
);
```

6. Apply the migrations locally:

```sh
npx wrangler d1 migrations apply my-d1-database --local
```

7. Change the `databaseUri` in the `typesql.json`:

```json
// typesql.json
{
  "databaseUri": "./.wrangler/state/v3/d1/miniflare-D1DatabaseObject/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.sqlite",
  "sqlDir": "./src/server/sql",
  "client": "d1",
  "includeCrudTables": []
}
```

8. Write your queries:

```sql
// src/server/sql/select-user-posts.sql
SELECT
    *
FROM posts
WHERE user_id = :user_id
```

9. Generate the code with TypeSQL:

```sh
npx typesql compile -w
```

10. Show the data:

```ts
// src/routes/+page.server.ts
export const load: PageServerLoad = async ({ platform }) => {
  const posts = await selectUserPosts(platform!.env.DB, {
    user_id: 1,
  });
  return {
    posts,
  };
};
```

```html
// src/routes/+page.svelte
<script lang="ts">
  import type { PageData } from "./$types";
  let { posts }: PageData = $props();
</script>
<h1>Posts</h1>
<ul>
  {#each posts as post}
  <li>{post.title}</li>
  {/each}
</ul>
```

11. Deploy:

```sh
bunx wrangler d1 migrations apply my-d1-database --remote
npm run deploy
```
