import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NavBar from "@/components/navBar";
import Background from "@/components/background";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
    return null;
  }

  return (
    <>
      <NavBar />
      <Background />
    </>
  );
}
