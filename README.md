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
