import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Datescroll from "@/components/Calendar";
import RecordingComponent from "@/components/textbox";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
    return null;
  }

  return (
    <div className="w-full h-screen bg-black text-white overflow-y-hidden">
      
      <Datescroll />
      Welcome {session.user.name}
      <RecordingComponent />
    </div>
  );
}
