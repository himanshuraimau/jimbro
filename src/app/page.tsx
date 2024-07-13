"use client"
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import NavBar from "@/components/navBar";
import Background from "@/components/background";
import Calendar from "@/components/Calendar";
import { useState } from 'react';
import { format } from 'date-fns';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
    return null;
  }

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateClick = (date:any) => {
    setSelectedDate(date)
  };

  return (
    <>
      <Background />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Calendar</h1>
        <Calendar selectedDate={selectedDate} onDateClick={handleDateClick} />
        <p className="mt-4">Selected Date: {format(selectedDate, 'MMMM d, yyyy')}</p>
      </div>
    </>
  );
}
