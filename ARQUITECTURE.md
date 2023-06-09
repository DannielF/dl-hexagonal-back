## Arquitecture structure

### Stack:

    + NestJS
    + TypeORM
    + GraphQL
    + Postgres
    + Podman
    + Auth0
    + Swagger

The project is structured in this way:

```shell

src
  |- core
  |  |- application
  |  |    |- services
  |  |- domain
  |  |    |- entities
  |  |    |- ports
  |  |    |  |- inbound
  |  |    |  |- outbound
  |  |    |- services
  |  |- shared
  |      |- dto
  |      |- error
  |- infrastructure
    |- adapters
    |- authz
    |    |- strategies
    |- config
    |- graphql
    |    |- wallet
    |- http-server
    |    |- controller
    |    |- exception-filters
    |- postgres
    |    |- entities
    |- shared
        |- models
```
