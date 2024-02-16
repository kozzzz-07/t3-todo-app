"use client";

import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export const SignOut = ({ session }: { session: Session }) => {
  return (
    <>
      <ArrowLeftStartOnRectangleIcon
        className="h-6 w-6 cursor-pointer text-blue-600"
        onClick={() => signOut()}
      />
      <p className="my-3 text-xl text-blue-600">{session?.user?.name}</p>
    </>
  );
};
