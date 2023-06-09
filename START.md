## How to start the project:

1. Clone this repository
2. Install dependencies
3. Install podman [https://podman.io/docs/installation]
4. Create an auth0 account [https://auth0.com/]
5. Create a new API in auth0
6. Create a new SPA in auth0
7. and so on.

### commands

```bash
    #podman
    docker-compose --env-file ./environments/.env.dev up -d
    docker-compose down
    # typeOrm
     npm run migration:generate .path/to/migration/migrationName
    npm run migration:run
    # project
    npm start:dev
    npm start:debug

```
