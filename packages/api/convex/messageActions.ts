
import { api } from '@repo/api/core';
import { v } from 'convex/values';
import { action } from "./_generated/server";
import CryptoJS from 'crypto-js';

export const encrypt = action({
  args: { author: v.string(), body: v.string(), secret: v.string() },
  handler: async (ctx, args) => {
  
    if (!args.secret) {
      throw new Error('Secret for encryption is not defined');
    }
  
    const cipherText = CryptoJS.AES.encrypt(args.body, args.secret).toString();
  
   
   const res: any = await ctx.runMutation(api.messages.createMessage, { author: args.author, body: cipherText})

   console.log({cipherText})
  console.log({res})

   if(res) {
      return res
   } else {
      return 'failed'
   }

  
  },
});





