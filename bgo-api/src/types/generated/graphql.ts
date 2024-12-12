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
  id: Scalars['ID']['output'];
  imagePath?: Maybe<Scalars['String']['output']>;
  playedTimestamp?: Maybe<Scalars['String']['output']>;
};

export type EventDeleteResult = DeletionResult | Event;

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
