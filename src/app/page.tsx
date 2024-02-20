import { getServerAuthSession } from "~/server/auth";
import { Auth } from "./_components/auth";

import { SignOut } from "./_components/signout";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    return <Auth />;
  }

  return (
    <>
      <SignOut session={session} />
      <Link href={`/task`}>Task</Link>
    </>
  );
}
