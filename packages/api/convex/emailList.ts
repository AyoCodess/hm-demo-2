import { ConvexError, v } from 'convex/values';
import { mutation, query } from './functions.';

export const addEmailToList = mutation({
  args: { email: v.string(), type: v.string(), message: v.string() },
  handler: async (ctx, { email, type, message }) => {
    const doesEmailExist = await ctx.db
      .query('emailList')
      .withIndex('byEmail', (q) => q.eq('email', email))
      .collect();

    if (doesEmailExist.length > 0) {
      throw new ConvexError({
        isSuccess: false,
        message: 'Email already exists'
      });
    }

    const response = await ctx.db.insert('emailList', { email, type, message });
    if (response) {
      return {
        isSuccess: true,
        message: 'Added email to list'
      };
    }

    throw new ConvexError(
      'Something went wrong, contact support. Error code: 101'
    );
  }
});

// get all emails

export const getEmailList = query({
  args: {},
  handler: async (ctx) => {
    const emailList = await ctx.db.query('emailList').collect();
    return emailList;
  }
});
