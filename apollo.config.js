module.exports = {
  client: {
    service: {
      name: 'learning-platform-frontend',
      localSchemaFile: './graphql-schema.json'
    },
    includes: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
      './graphql/**/*.{js,jsx,ts,tsx}',
      // './schema.graphql'
    ]
  }
};
