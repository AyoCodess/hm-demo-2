import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { Id, api, useConvexAuth, useMutation } from '@repo/api/core';

export function useStoreUserEffect() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();
  // has stored the user.
  const [userId, setUserId] = useState<Id<'users'> | null>(null);
  const storeUser = useMutation(api.users.store);
  const test = useMutation(api.relationships.test);

  // Call the `storeUser` mutation function to store
  // the current user in the `users` table and return the `Id` value.
  useEffect(() => {
    async function fetchTest() {
      const res = await test();
      console.log('test:', JSON.stringify(res, null, 2));
    }

    fetchTest();

    // If the user is not logged in don't do anything
    if (!isAuthenticated) {
      return;
    }
    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    async function createUser() {
      const id = await storeUser();
      setUserId(id);
    }
    createUser();
    return () => setUserId(null);
    // Make sure the effect reruns if the user logs in with
    // a different identity
  }, [isAuthenticated, storeUser, user?.id]);
  // Combine the local state with the state from context
  return {
    isLoading: isLoading || (isAuthenticated && userId === null),
    isAuthenticated: isAuthenticated && userId !== null
  };
}
