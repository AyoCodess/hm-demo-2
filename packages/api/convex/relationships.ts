import { mutation } from './functions.';
// import { mutation, query } from './_generated/server';

export const test = mutation({
  args: {},
  handler: async (ctx) => {
    return '500';
  }
});
