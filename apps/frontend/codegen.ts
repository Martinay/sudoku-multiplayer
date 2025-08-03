import type { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: '../backend/src/schema/schema.generated.graphqls',
  documents: ['src/**/*.{ts,tsx}'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/graphql/': {        
      preset: 'client'
    }
  }
}
 
export default config