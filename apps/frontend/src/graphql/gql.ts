/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    query getGame($gameId : ID!){\n      game(id: $gameId){\n        id,\n        difficulty,\n        board{\n          row,\n          column,\n          value,\n          isValid,\n          isEditable\n        }\n      }\n    }\n": typeof types.GetGameDocument,
    "\n    mutation updateCellValue($gameId : ID!, $row: Int!, $column: Int!, $newValue: Int){\n        updateCellValue(gameId: $gameId, row:$row, column: $column, value: $newValue)\n    }\n": typeof types.UpdateCellValueDocument,
    "\nsubscription onCellValueUpdated($gameId: ID!){\n  onCellValueUpdated(gameId: $gameId){\n    row,\n    column,\n    value\n  }\n}\n": typeof types.OnCellValueUpdatedDocument,
    "\n    mutation createNewGame{\n      createNewGame {\n        id\n      }\n    }\n": typeof types.CreateNewGameDocument,
};
const documents: Documents = {
    "\n    query getGame($gameId : ID!){\n      game(id: $gameId){\n        id,\n        difficulty,\n        board{\n          row,\n          column,\n          value,\n          isValid,\n          isEditable\n        }\n      }\n    }\n": types.GetGameDocument,
    "\n    mutation updateCellValue($gameId : ID!, $row: Int!, $column: Int!, $newValue: Int){\n        updateCellValue(gameId: $gameId, row:$row, column: $column, value: $newValue)\n    }\n": types.UpdateCellValueDocument,
    "\nsubscription onCellValueUpdated($gameId: ID!){\n  onCellValueUpdated(gameId: $gameId){\n    row,\n    column,\n    value\n  }\n}\n": types.OnCellValueUpdatedDocument,
    "\n    mutation createNewGame{\n      createNewGame {\n        id\n      }\n    }\n": types.CreateNewGameDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query getGame($gameId : ID!){\n      game(id: $gameId){\n        id,\n        difficulty,\n        board{\n          row,\n          column,\n          value,\n          isValid,\n          isEditable\n        }\n      }\n    }\n"): (typeof documents)["\n    query getGame($gameId : ID!){\n      game(id: $gameId){\n        id,\n        difficulty,\n        board{\n          row,\n          column,\n          value,\n          isValid,\n          isEditable\n        }\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updateCellValue($gameId : ID!, $row: Int!, $column: Int!, $newValue: Int){\n        updateCellValue(gameId: $gameId, row:$row, column: $column, value: $newValue)\n    }\n"): (typeof documents)["\n    mutation updateCellValue($gameId : ID!, $row: Int!, $column: Int!, $newValue: Int){\n        updateCellValue(gameId: $gameId, row:$row, column: $column, value: $newValue)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nsubscription onCellValueUpdated($gameId: ID!){\n  onCellValueUpdated(gameId: $gameId){\n    row,\n    column,\n    value\n  }\n}\n"): (typeof documents)["\nsubscription onCellValueUpdated($gameId: ID!){\n  onCellValueUpdated(gameId: $gameId){\n    row,\n    column,\n    value\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createNewGame{\n      createNewGame {\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation createNewGame{\n      createNewGame {\n        id\n      }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;