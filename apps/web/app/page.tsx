"use client";
import { Button } from "@workspace/ui/components/button";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";
import { SignInButton, UserButton } from "@clerk/nextjs";
export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);
  return (
    <>
      <Authenticated>
        <div className="flex flex-col items-center justify-center min-h-svh">
          <p>Apps/web</p>
          <UserButton />
          <div className="max-w-sm w-full mx-auto">
            {JSON.stringify(users, null, 2)}
          </div>
          <Button onClick={() => addUser()}>Add</Button>
        </div>
      </Authenticated>
      <Unauthenticated>
        <div className="flex flex-col gap-2 items-start">
          <p>You must be signed in!</p>

          <SignInButton>Sign In</SignInButton>
        </div>
      </Unauthenticated>
    </>
  );
}
