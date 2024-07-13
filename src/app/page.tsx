"use client"

import React, { useState } from 'react';
import { format } from 'date-fns';
import NavBar from "@/components/navBar";
import Background from "@/components/background";
import Calendar from "@/components/Calendar";
import ServerComponent from '@/components/ServerComponent';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <ServerComponent />
      <Background />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Calendar</h1>
        <Calendar selectedDate={selectedDate} onDateClick={handleDateClick} />
        <p className="mt-4">Selected Date: {format(selectedDate, 'MMMM d, yyyy')}</p>
      </div>
    </>
  );
}