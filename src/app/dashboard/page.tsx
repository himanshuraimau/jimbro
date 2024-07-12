import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navdash from "@/components/navdash";
import Datescroll from "@/components/datescroll";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
    return null;
  }

  return (
    <div className="w-screen h-screen bg-black text-white">
      <Navdash />
      <Datescroll />
      Welcome {session.user.name}
    </div>
  );
}
