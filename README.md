# 21 Blackjack game

| Live version at https://blackjack.tovar.dev

## Stack

Next.js | React.js | Typescript | Jest | SCSS | Postgresql

## Requirements

- A functional Postgresql database with a table called `Games`

## Setup

Create a .env file with the following information:

```
POSTGRES_URL="postgres://<db_user>:<password>@<db_host>:5432/Games"
POSTGRES_PRISMA_URL="postgres://<db_user>:<password>@<db_host>:5432/Games?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://<db_user>:<password>@<db_host>:5432/Games"
POSTGRES_USER="<db_user>"
POSTGRES_HOST="<db_host>"
POSTGRES_PASSWORD="<password>"
POSTGRES_DATABASE="Games"
# More info at: https://vercel.com/docs/storage/vercel-postgres/quickstart#
```

Install dependencies:

```
npm install
```

### Running the game:

```
# Create production build
npm build
```

```
# Serve production build output
npm start
```

```
# Dev server + Jest --watch --coverage
npm run dev
```

```
# Next.js Dev server alone
npm run dev:next
```

```
# Jest --watch --coverage
npm run dev:coverage
```

### Folder structure breakdown

- `./__tests__` Tests folder
- `./src`
  - `./src/app` Next.js code, it includes `page`, `layout`, and `api` endpoints
  - `./src/game` Game logic server side controllers, services, models and library for client side data pulling.
  - `./src/scss` Global styles, variables, mixins, etc
  - `./src/ui` React client side class components
  - `./src/utils` Constants, ~global utilities~
