"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Calendar from "@/components/Calendar";
import { useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
    
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-y-auto">
      <Calendar initialDate={selectedDate} onDateClick={handleDateClick} />
    </div>
  );
}