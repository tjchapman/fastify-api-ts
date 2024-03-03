# To build:
```
yarn build
```

# To run:
```
yarn dev
```

# To run the postgres server in docker (-d is optional for detached):
```
docker compose up -d
```

# For implementing changes to prisma schema:
```
npx prisma migrate dev --name init
```

# Postgres liked my actual username for the .env url (see below issue):
https://github.com/remix-run/blues-stack/issues/49 
```
postgresql://tom:password@localhost:5432/postgres?schema=public
```