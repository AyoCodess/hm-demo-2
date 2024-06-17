/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.12.1.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference
} from 'convex/server';
import type * as clerkBackend from '../clerkBackend.js';
import type * as emailList from '../emailList.js';
import type * as functions from '../functions..js';
import type * as messageActions from '../messageActions.js';
import type * as messages from '../messages.js';
import type * as migrations from '../migrations.js';
import type * as relationships from '../relationships.js';
import type * as types from '../types.js';
import type * as users from '../users.js';

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  clerkBackend: typeof clerkBackend;
  emailList: typeof emailList;
  functions: typeof functions;
  messageActions: typeof messageActions;
  messages: typeof messages;
  migrations: typeof migrations;
  relationships: typeof relationships;
  types: typeof types;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, 'public'>
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, 'internal'>
>;
