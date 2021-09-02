# Typescript types

## Download schema from server

```bash
npx apollo service:download --endpoint=http://127.0.0.1/graphql graphql-schema.json --header="Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMjAyOWJkNjMtZjFlZi1mODRmLWY2NGYtZmM2ZWRhODNhZTVmIn0.kwy19uf1C8qrhTIh1hr7j9SPOiLjZYia2FmMe0lv6iU"
```

## Generate graphql types

```bash
npx apollo codegen:generate --localSchemaFile=graphql-schema.json,schema.graphql --target=typescript --tagName=gql
```

