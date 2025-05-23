const fetch = require('node-fetch');
const fs = require('fs');

class GenerateGraphQLPossibleTypes {
  apply(compiler) {
    compiler.hooks.afterPlugins.tap('Generate GraphQL Possible Types', () => {

      fetch(process.env.API_BASE + process.env.API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({
          variables: {},
          query: `
            {
              __schema {
                types {
                  kind
                  name
                  possibleTypes {
                    name
                  }
                }
              }
            }
          `,
        }),
      }).then(result => result.json())
        .then(result => {
          console.log(result)
          const possibleTypes = {};
          result.data.__schema?.types.forEach(supertype => {
            if (supertype.possibleTypes) {
              possibleTypes[supertype.name] =
                supertype.possibleTypes.map(subtype => subtype.name);
            }
          });
      
          fs.writeFile('./graphql/possibleTypes.json', JSON.stringify(possibleTypes), err => {
            if (err) {
              console.error('Error writing possibleTypes.json', err);
            } else {
              console.log('Fragment types successfully extracted!');
            }
          });
        }).catch((error) => {
          console.log(error)
        });
    });
  }
}

module.exports = GenerateGraphQLPossibleTypes;