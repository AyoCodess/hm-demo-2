import { v } from 'convex/values';
import { mutation, query } from './functions.';

export const createMessage = mutation({
  args: { author: v.string(), body: v.string() },
  handler: async (ctx, { author, body }) => {
    const response = await ctx.db.insert('messages', { author, body });

    if (!response) {
      return 'failed';
    }

    return 'success 1';
  }
});

export const getMessages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('messages').collect();
  }
});
