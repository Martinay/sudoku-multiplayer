/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CellAnnotationsUpdateData = {
  __typename?: 'CellAnnotationsUpdateData';
  annotations?: Maybe<SudokuCellAnnotations>;
  column: Scalars['Int']['output'];
  row: Scalars['Int']['output'];
};

export type CellValueUpdateData = {
  __typename?: 'CellValueUpdateData';
  column: Scalars['Int']['output'];
  isValid?: Maybe<Scalars['Boolean']['output']>;
  row: Scalars['Int']['output'];
  value?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewGame: SudokuGame;
  updateCellAnnotations?: Maybe<Scalars['Boolean']['output']>;
  updateCellValue?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationUpdateCellAnnotationsArgs = {
  annotations: SudokuCellAnnotationsInput;
  column: Scalars['Int']['input'];
  gameId: Scalars['ID']['input'];
  row: Scalars['Int']['input'];
};


export type MutationUpdateCellValueArgs = {
  column: Scalars['Int']['input'];
  gameId: Scalars['ID']['input'];
  row: Scalars['Int']['input'];
  value?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  game?: Maybe<SudokuGame>;
};


export type QueryGameArgs = {
  id: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onCellAnnotationsUpdated?: Maybe<CellAnnotationsUpdateData>;
  onCellValueUpdated?: Maybe<CellValueUpdateData>;
};


export type SubscriptionOnCellAnnotationsUpdatedArgs = {
  gameId: Scalars['ID']['input'];
};


export type SubscriptionOnCellValueUpdatedArgs = {
  gameId: Scalars['ID']['input'];
};

export type SudokuCell = {
  __typename?: 'SudokuCell';
  annotations?: Maybe<SudokuCellAnnotations>;
  column: Scalars['Int']['output'];
  isEditable: Scalars['Boolean']['output'];
  isValid?: Maybe<Scalars['Boolean']['output']>;
  row: Scalars['Int']['output'];
  solution: Scalars['Int']['output'];
  value?: Maybe<Scalars['Int']['output']>;
};

export type SudokuCellAnnotations = {
  __typename?: 'SudokuCellAnnotations';
  matrix: Array<Scalars['Int']['output']>;
};

export type SudokuCellAnnotationsInput = {
  matrix: Array<Scalars['Int']['input']>;
};

export type SudokuGame = {
  __typename?: 'SudokuGame';
  board: Array<Maybe<SudokuCell>>;
  difficulty: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type GetGameQueryVariables = Exact<{
  gameId: Scalars['ID']['input'];
}>;


export type GetGameQuery = { __typename?: 'Query', game?: { __typename?: 'SudokuGame', id: string, difficulty: string, board: Array<{ __typename?: 'SudokuCell', row: number, column: number, value?: number | null, isValid?: boolean | null, isEditable: boolean, annotations?: { __typename?: 'SudokuCellAnnotations', matrix: Array<number> } | null } | null> } | null };

export type UpdateCellValueMutationVariables = Exact<{
  gameId: Scalars['ID']['input'];
  row: Scalars['Int']['input'];
  column: Scalars['Int']['input'];
  newValue?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateCellValueMutation = { __typename?: 'Mutation', updateCellValue?: boolean | null };

export type UpdateCellAnnotationsMutationVariables = Exact<{
  gameId: Scalars['ID']['input'];
  row: Scalars['Int']['input'];
  column: Scalars['Int']['input'];
  annotations: SudokuCellAnnotationsInput;
}>;


export type UpdateCellAnnotationsMutation = { __typename?: 'Mutation', updateCellAnnotations?: boolean | null };

export type OnCellValueUpdatedSubscriptionVariables = Exact<{
  gameId: Scalars['ID']['input'];
}>;


export type OnCellValueUpdatedSubscription = { __typename?: 'Subscription', onCellValueUpdated?: { __typename?: 'CellValueUpdateData', row: number, column: number, value?: number | null, isValid?: boolean | null } | null };

export type OnCellAnnotationsUpdatedSubscriptionVariables = Exact<{
  gameId: Scalars['ID']['input'];
}>;


export type OnCellAnnotationsUpdatedSubscription = { __typename?: 'Subscription', onCellAnnotationsUpdated?: { __typename?: 'CellAnnotationsUpdateData', row: number, column: number, annotations?: { __typename?: 'SudokuCellAnnotations', matrix: Array<number> } | null } | null };

export type CreateNewGameMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateNewGameMutation = { __typename?: 'Mutation', createNewGame: { __typename?: 'SudokuGame', id: string } };


export const GetGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"game"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"board"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"row"}},{"kind":"Field","name":{"kind":"Name","value":"column"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"isValid"}},{"kind":"Field","name":{"kind":"Name","value":"isEditable"}},{"kind":"Field","name":{"kind":"Name","value":"annotations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"matrix"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetGameQuery, GetGameQueryVariables>;
export const UpdateCellValueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCellValue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"row"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"column"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newValue"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCellValue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"row"},"value":{"kind":"Variable","name":{"kind":"Name","value":"row"}}},{"kind":"Argument","name":{"kind":"Name","value":"column"},"value":{"kind":"Variable","name":{"kind":"Name","value":"column"}}},{"kind":"Argument","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newValue"}}}]}]}}]} as unknown as DocumentNode<UpdateCellValueMutation, UpdateCellValueMutationVariables>;
export const UpdateCellAnnotationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateCellAnnotations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"row"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"column"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"annotations"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SudokuCellAnnotationsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCellAnnotations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}},{"kind":"Argument","name":{"kind":"Name","value":"row"},"value":{"kind":"Variable","name":{"kind":"Name","value":"row"}}},{"kind":"Argument","name":{"kind":"Name","value":"column"},"value":{"kind":"Variable","name":{"kind":"Name","value":"column"}}},{"kind":"Argument","name":{"kind":"Name","value":"annotations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"annotations"}}}]}]}}]} as unknown as DocumentNode<UpdateCellAnnotationsMutation, UpdateCellAnnotationsMutationVariables>;
export const OnCellValueUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"onCellValueUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onCellValueUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"row"}},{"kind":"Field","name":{"kind":"Name","value":"column"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"isValid"}}]}}]}}]} as unknown as DocumentNode<OnCellValueUpdatedSubscription, OnCellValueUpdatedSubscriptionVariables>;
export const OnCellAnnotationsUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"onCellAnnotationsUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onCellAnnotationsUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"row"}},{"kind":"Field","name":{"kind":"Name","value":"column"}},{"kind":"Field","name":{"kind":"Name","value":"annotations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"matrix"}}]}}]}}]}}]} as unknown as DocumentNode<OnCellAnnotationsUpdatedSubscription, OnCellAnnotationsUpdatedSubscriptionVariables>;
export const CreateNewGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createNewGame"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNewGame"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateNewGameMutation, CreateNewGameMutationVariables>;