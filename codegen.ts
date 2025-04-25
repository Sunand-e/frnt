
import type { CodegenConfig } from '@graphql-codegen/cli';
const { loadEnvConfig } = require('@next/env')
loadEnvConfig(process.cwd())

const schemaUrl = process.env.API_BASE + process.env.API_URL;

const config: CodegenConfig = {
  overwrite: true,
  verbose: true,
  schema: [
    {
      [schemaUrl]: {
        headers: {
          Cookie: `jwt_header_payload=${process.env.JWT_HEADER_PAYLOAD}; jwt_signature=${process.env.JWT_SIGNATURE}`,
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
