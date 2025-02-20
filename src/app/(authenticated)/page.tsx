import { getSession } from "next-auth/react";
import { authConfig } from "~/server/auth/config";
import { redirect } from "next/navigation";
import getServerSession from "next-auth";
import { auth } from "~/server/auth";

export default async function HomePage() {
  const session = await auth();
  console.log('session', session);

  if (!session) {
    return redirect("/signin");
  }


  return <div>Authenticated Yay</div>;
}
