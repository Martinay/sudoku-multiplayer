import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number; }
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


export type MutationupdateCellAnnotationsArgs = {
  annotations: SudokuCellAnnotationsInput;
  column: Scalars['Int']['input'];
  gameId: Scalars['ID']['input'];
  row: Scalars['Int']['input'];
};


export type MutationupdateCellValueArgs = {
  column: Scalars['Int']['input'];
  gameId: Scalars['ID']['input'];
  row: Scalars['Int']['input'];
  value?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  game?: Maybe<SudokuGame>;
};


export type QuerygameArgs = {
  id: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onCellAnnotationsUpdated?: Maybe<CellAnnotationsUpdateData>;
  onCellValueUpdated?: Maybe<CellValueUpdateData>;
};


export type SubscriptiononCellAnnotationsUpdatedArgs = {
  gameId: Scalars['ID']['input'];
};


export type SubscriptiononCellValueUpdatedArgs = {
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  CellAnnotationsUpdateData: ResolverTypeWrapper<CellAnnotationsUpdateData>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  CellValueUpdateData: ResolverTypeWrapper<CellValueUpdateData>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  SudokuCell: ResolverTypeWrapper<SudokuCell>;
  SudokuCellAnnotations: ResolverTypeWrapper<SudokuCellAnnotations>;
  SudokuCellAnnotationsInput: SudokuCellAnnotationsInput;
  SudokuGame: ResolverTypeWrapper<SudokuGame>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  CellAnnotationsUpdateData: CellAnnotationsUpdateData;
  Int: Scalars['Int']['output'];
  CellValueUpdateData: CellValueUpdateData;
  Boolean: Scalars['Boolean']['output'];
  Mutation: {};
  ID: Scalars['ID']['output'];
  Query: {};
  Subscription: {};
  SudokuCell: SudokuCell;
  SudokuCellAnnotations: SudokuCellAnnotations;
  SudokuCellAnnotationsInput: SudokuCellAnnotationsInput;
  SudokuGame: SudokuGame;
  String: Scalars['String']['output'];
};

export type CellAnnotationsUpdateDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['CellAnnotationsUpdateData'] = ResolversParentTypes['CellAnnotationsUpdateData']> = {
  annotations?: Resolver<Maybe<ResolversTypes['SudokuCellAnnotations']>, ParentType, ContextType>;
  column?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  row?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CellValueUpdateDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['CellValueUpdateData'] = ResolversParentTypes['CellValueUpdateData']> = {
  column?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isValid?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  row?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createNewGame?: Resolver<ResolversTypes['SudokuGame'], ParentType, ContextType>;
  updateCellAnnotations?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationupdateCellAnnotationsArgs, 'annotations' | 'column' | 'gameId' | 'row'>>;
  updateCellValue?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationupdateCellValueArgs, 'column' | 'gameId' | 'row'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  game?: Resolver<Maybe<ResolversTypes['SudokuGame']>, ParentType, ContextType, RequireFields<QuerygameArgs, 'id'>>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  onCellAnnotationsUpdated?: SubscriptionResolver<Maybe<ResolversTypes['CellAnnotationsUpdateData']>, "onCellAnnotationsUpdated", ParentType, ContextType, RequireFields<SubscriptiononCellAnnotationsUpdatedArgs, 'gameId'>>;
  onCellValueUpdated?: SubscriptionResolver<Maybe<ResolversTypes['CellValueUpdateData']>, "onCellValueUpdated", ParentType, ContextType, RequireFields<SubscriptiononCellValueUpdatedArgs, 'gameId'>>;
};

export type SudokuCellResolvers<ContextType = any, ParentType extends ResolversParentTypes['SudokuCell'] = ResolversParentTypes['SudokuCell']> = {
  annotations?: Resolver<Maybe<ResolversTypes['SudokuCellAnnotations']>, ParentType, ContextType>;
  column?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isEditable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isValid?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  row?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  solution?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SudokuCellAnnotationsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SudokuCellAnnotations'] = ResolversParentTypes['SudokuCellAnnotations']> = {
  matrix?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SudokuGameResolvers<ContextType = any, ParentType extends ResolversParentTypes['SudokuGame'] = ResolversParentTypes['SudokuGame']> = {
  board?: Resolver<Array<Maybe<ResolversTypes['SudokuCell']>>, ParentType, ContextType>;
  difficulty?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CellAnnotationsUpdateData?: CellAnnotationsUpdateDataResolvers<ContextType>;
  CellValueUpdateData?: CellValueUpdateDataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  SudokuCell?: SudokuCellResolvers<ContextType>;
  SudokuCellAnnotations?: SudokuCellAnnotationsResolvers<ContextType>;
  SudokuGame?: SudokuGameResolvers<ContextType>;
};

