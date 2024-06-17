import { makeMigration } from 'convex-helpers/server/migrations';
import { internalMutation } from './_generated/server';

const migration = makeMigration(internalMutation, {
  migrationTable: 'migrations'
});

// TODO - fix this
// export const status = internalQuery(async (ctx) => {
//   return await getStatus(ctx, {
//     migrationTable: 'migrations',
//     limit: 10
//   });
// });

/**
 * @description //? In this file, or in another one if you have many migrations
 */
// export const simpleMigration = migration({
//   table: 'users',
//   migrateOne: async (_, user) => ({
//     name: user.name + ' MEng.'
//   })
// });

/**
 * @description //? Example of using `mutationCtx` to access `ctx.table`
 */
// export const migrationUsingCtxTable = migration({
//   table: 'users',
//   migrateOne: async (baseCtx, doc) => {
//     const ctx = await mutationCtx(baseCtx);
//     const user = await ctx.table('users').getX(doc._id);
//     const numMessages = (await user.edge('messages')).length;
//     if (numMessages > 10) {
//       await user.patch({ name: user.name + ' Pro' });
//     }
//   },
//   batchSize: 10
// });

// move user name data to user nickname field in user table
// export const step1 = migration({
//   table: 'users',
//   migrateOne: async (baseCtx, doc) => {
//     const ctx = await mutationCtx(baseCtx);
//     const user = await ctx.table('users').getX(doc._id);
//     const nickName = user.name;
//     await user.patch({ nickName });
//   },
//   batchSize: 10
// });

//  to delete  field you must unset the field then you can manually delete the field from the schema
// export const step2 = migration({
//   table: 'users',
//   migrateOne: async (baseCtx, doc) => {
//     const ctx = await mutationCtx(baseCtx);
//     const user = await ctx.table('users').getX(doc._id);
//     await user.patch({ name: undefined });
//   },
//   batchSize: 10
// });
