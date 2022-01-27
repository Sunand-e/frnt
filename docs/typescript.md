# Typescript types

## Download schema from server

```bash
npx apollo service:download --endpoint=http://127.0.0.1/graphql graphql-schema.json --header="Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMjAyOWJkNjMtZjFlZi1mODRmLWY2NGYtZmM2ZWRhODNhZTVmIiwicnNrIjoiNWQifQ.CepICi0497fgxaNfo9kp5ZQ8DmaHOqUgKGYx29VozJo"
```

Or, if not working:

```bash
npx apollo service:download --endpoint=http://127.0.0.1/graphql graphql-schema.json --header=\"Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMjAyOWJkNjMtZjFlZi1mODRmLWY2NGYtZmM2ZWRhODNhZTVmIiwicnNrIjoiNWQifQ.CepICi0497fgxaNfo9kp5ZQ8DmaHOqUgKGYx29VozJo\"
```

## Generate graphql types

```bash
npx apollo codegen:generate --localSchemaFile=graphql-schema.json,schema.graphql --target=typescript --tagName=gql
```

