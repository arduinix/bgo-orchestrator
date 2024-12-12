import { GraphQLResolveInfo } from 'graphql';
import { MyContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateEventInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  eventDate?: InputMaybe<Scalars['String']['input']>;
  eventLocation?: InputMaybe<Scalars['String']['input']>;
  eventName: Scalars['String']['input'];
  imagePath?: InputMaybe<Scalars['String']['input']>;
};

export type DeleteEventInput = {
  id: Scalars['ID']['input'];
};

export type DeletionResult = {
  __typename?: 'DeletionResult';
  deletedTimestamp: Scalars['String']['output'];
};

export type Event = {
  __typename?: 'Event';
  createdTimestamp?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  eventDate?: Maybe<Scalars['String']['output']>;
  eventLocation?: Maybe<Scalars['String']['output']>;
  eventName: Scalars['String']['output'];
  eventOwner?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imagePath?: Maybe<Scalars['String']['output']>;
  playedTimestamp?: Maybe<Scalars['String']['output']>;
};

export type EventDeleteResult = DeletionResult | Event;

export type ListEventsInput = {
  eventCreatedTimestampLower?: InputMaybe<Scalars['String']['input']>;
  eventCreatedTimestampUpper?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
  showEventsOwnedByOthers?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent?: Maybe<Event>;
  deleteEvent?: Maybe<EventDeleteResult>;
  updateEvent?: Maybe<Event>;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationDeleteEventArgs = {
  input: DeleteEventInput;
};


export type MutationUpdateEventArgs = {
  input: UpdateEventInput;
};

export type Query = {
  __typename?: 'Query';
  createEvent?: Maybe<Event>;
  getMessage?: Maybe<Message>;
  listEvents?: Maybe<Array<Maybe<Event>>>;
  readEvent?: Maybe<Event>;
};


export type QueryCreateEventArgs = {
  input: CreateEventInput;
};


export type QueryListEventsArgs = {
  input: ListEventsInput;
};


export type QueryReadEventArgs = {
  input: ReadEventInput;
};

export type ReadEventInput = {
  id: Scalars['ID']['input'];
};

export type UpdateEventInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  eventDate?: InputMaybe<Scalars['String']['input']>;
  eventLocation?: InputMaybe<Scalars['String']['input']>;
  eventName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  imagePath?: InputMaybe<Scalars['String']['input']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

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

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = ResolversObject<{
  EventDeleteResult: ( DeletionResult ) | ( Event );
}>;


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateEventInput: CreateEventInput;
  DeleteEventInput: DeleteEventInput;
  DeletionResult: ResolverTypeWrapper<DeletionResult>;
  Event: ResolverTypeWrapper<Event>;
  EventDeleteResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['EventDeleteResult']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  ListEventsInput: ListEventsInput;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ReadEventInput: ReadEventInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateEventInput: UpdateEventInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  CreateEventInput: CreateEventInput;
  DeleteEventInput: DeleteEventInput;
  DeletionResult: DeletionResult;
  Event: Event;
  EventDeleteResult: ResolversUnionTypes<ResolversParentTypes>['EventDeleteResult'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  ListEventsInput: ListEventsInput;
  Message: Message;
  Mutation: {};
  Query: {};
  ReadEventInput: ReadEventInput;
  String: Scalars['String']['output'];
  UpdateEventInput: UpdateEventInput;
}>;

export type DeletionResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['DeletionResult'] = ResolversParentTypes['DeletionResult']> = ResolversObject<{
  deletedTimestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = ResolversObject<{
  createdTimestamp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  eventDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  eventLocation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  eventName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  eventOwner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imagePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  playedTimestamp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventDeleteResultResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['EventDeleteResult'] = ResolversParentTypes['EventDeleteResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'DeletionResult' | 'Event', ParentType, ContextType>;
}>;

export type MessageResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationCreateEventArgs, 'input'>>;
  deleteEvent?: Resolver<Maybe<ResolversTypes['EventDeleteResult']>, ParentType, ContextType, RequireFields<MutationDeleteEventArgs, 'input'>>;
  updateEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<MutationUpdateEventArgs, 'input'>>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  createEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryCreateEventArgs, 'input'>>;
  getMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>;
  listEvents?: Resolver<Maybe<Array<Maybe<ResolversTypes['Event']>>>, ParentType, ContextType, RequireFields<QueryListEventsArgs, 'input'>>;
  readEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryReadEventArgs, 'input'>>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  DeletionResult?: DeletionResultResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  EventDeleteResult?: EventDeleteResultResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

