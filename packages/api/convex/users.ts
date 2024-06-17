// import { mutation } from './functions';
import { mutation, query } from './_generated/server';
import dayjs from 'dayjs';

/**
 * Insert or update the user in a Convex table then return the document's ID.
 *
 * The `UserIdentity.tokenIdentifier` string is a stable and unique value we use
 * to look up identities.
 *
 * Keep in mind that `UserIdentity` has a number of optional fields, the
 * presence of which depends on the identity provider chosen. It's up to the
 * application developer to determine which ones are available and to decide
 * which of those need to be persisted. For Clerk the fields are determined
 * by the JWT token's Claims config.
 */
export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Called storeUser without authentication present');
    }

    //* Check if we've already stored this identity before.

    const user = await ctx.db
      .query('users')
      .withIndex('byToken', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .unique();

    //* do the checks you need if the user exists
    if (user !== null) {
      //* If we've seen this identity before but the name has changed, patch the value.
      if (user.nickName !== identity.name) {
        await ctx.db.patch(user._id, { nickName: identity.name });
      }

      //* If we've seen this identity before but the email has changed, patch the value.
      if (user.email !== identity.email) {
        await ctx.db.patch(user._id, { email: identity.email });
      }

      //* add timestamp to updatedAt field UTC time
      await ctx.db.patch(user._id, {
        updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
      });

      ///* check for duplicated users due to clerk accounts being deleted.
      const duplicateUsers = await ctx.db
        .query('users')
        .withIndex('byEmail', (q) => q.eq('email', identity.email ?? 'not set'))
        .collect();

      if (duplicateUsers.length > 1) {
        //* Sort the duplicate users by creation date in descending order
        duplicateUsers.sort((a, b) => b._creationTime - a._creationTime);

        //* tag the older user as DELETED
        for (let i = 1; i < duplicateUsers.length; i++) {
          const user = duplicateUsers[i];
          if (user !== undefined) {
            await ctx.db.patch(user._id, { isDeleted: true });
          }
        }
      }

      return user._id;
    }

    // If it's a new identity, create a new `User`.
    return await ctx.db.insert('users', {
      relationshipId: identity.tokenIdentifier.slice(-28),
      nickName: identity.name!,
      role: 'standard',
      tokenIdentifier: identity.tokenIdentifier,
      email: identity.email ?? 'not set',
      isDeleted: false
    });
  }
});
