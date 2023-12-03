---
title: Demo project
description: Create a demo project using TypeSQL
---

This tutorial show how to quickly create a playground for the database used on the MySQL Tutorial [site](https://www.mysqltutorial.org/).

1. Start the mysql classicmodels database as a docker service:

```shell
docker run -d --name classicmodels -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password wsporto/classicmodels-mysql:8.0
```

The image contains the [sample database](https://www.mysqltutorial.org/mysql-sample-database.aspx) from the mysqltutorial.

Or if you want to create an empty mysql database, run:

```shell
docker run -d --name mysql8 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=mydb mysql:8.0
```

2. Download the configured repository using degit:

```shell
npx degit github:wsporto/typesql-demo my-new-project
```

3. Go to project folder and install the dependencies:

```sh
cd ./my-new-project
```

```sh
npm i
```

4. Run TypeSQL on watch mode:

```sh
npx typesql compile -w
```

5. Write the queries in the `./src/sqls` folder:

```sql
// ./src/sqls/select-products.sql
SELECT
    productCode,
    productName
FROM products
ORDER BY productName
LIMIT 5
```

6. Write the code using the generated functions:

```ts
// src/main.ts
const conn = await createConnection({
  host: "localhost",
  database: "classicmodels",
  user: "root",
  password: "password",
});

const products = await selectProducts(conn);
```

7. Execute the queries:

```sh
npm run dev
```

Result:

| (index) | productCode | productName                           |
| ------- | ----------- | ------------------------------------- |
| 0       | 'S24_2011'  | '18th century schooner'               |
| 1       | 'S18_3136'  | '18th Century Vintage Horse Carriage' |
| 2       | 'S24_2841'  | '1900s Vintage Bi-Plane'              |
| 3       | 'S24_4278'  | '1900s Vintage Tri-Plane'             |
| 4       | 'S18_3140'  | '1903 Ford Model A'                   |
