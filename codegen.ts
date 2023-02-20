
import type { CodegenConfig } from '@graphql-codegen/cli';
const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      'http://127.0.0.1/graphql': {
        headers: {
          Authorization: `Bearer: ${process.env.RAILS_AUTH_TOKEN}`,
        },
      },
    },
    "schema.graphql"
  ],
  documents: [
    "pages/**/*.tsx", "pages/**/*.ts",
    "components/**/*.tsx", "components/**/*.ts",
    "graphql/**/*.tsx", "graphql/**/*.ts",
    "hooks/**/*.tsx", "hooks/**/*.ts"
  ],
  debug: true,
  generates: {
    "./graphql/generated/index.ts": {
      plugins: [
        {
          typescript: {},
        },
        {
          "typescript-operations": {},
        },
        {
          "typed-document-node": {},
        },
      ],
    }
  }
};

export default config;
