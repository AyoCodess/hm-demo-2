import { createClerkClient } from '@clerk/clerk-sdk-node';
import { action } from './_generated/server';
import handleApiErrors from '../utils/handlesApiErrors';

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_API_SECRET_KEY
});

export const AdminGetUserList = action({
  args: {},
  handler: async (ctx, args) => {
    try {
      const res = await clerkClient.users.getUserList();
      const data = res.data.map((user) => {
        return {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          firstName: user.firstName
        };
      });
      return data;
    } catch (err) {
      handleApiErrors({
        err: err,
        location: 'AdminGetUserList'
      });
    }
  }
});
