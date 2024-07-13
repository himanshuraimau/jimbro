"use client"
import React, { useState } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';

interface CalendarProps {
  selectedDate: Date;
  onDateClick: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateClick }) => {
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="flex justify-between items-center mt-20 mb-4 py-2 w-full">
        <button 
          className="text-xl px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
          onClick={() => setCurrentWeek(addDays(currentWeek, -7))}
        >
          Prev
        </button>
        <span className="text-4xl">{format(currentWeek, dateFormat)}</span>
        <button 
          className="text-xl px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
          onClick={() => setCurrentWeek(addDays(currentWeek, 7))}
        >
          Next
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days: JSX.Element[] = [];
    const dateFormat = "EEEE";
    const startDate = startOfWeek(currentWeek);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="flex-1 text-center py-2" key={i}>
          <span className="text-sm">{format(addDays(startDate, i), dateFormat)}</span>
        </div>
      );
    }

    return <div className="flex mb-2">{days}</div>;
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentWeek);
    const days: JSX.Element[] = [];

    for (let i = 0; i < 7; i++) {
      const day = addDays(startDate, i);
      const formattedDate = format(day, "d");

      days.push(
        <div 
          className="flex-1 p-2 py-6 text-center border cursor-pointer m-1"
          key={day.toISOString()}
          onClick={() => onDateClick(day)}
          style={{ borderColor: isSameDay(day, selectedDate) ? 'blue' : 'gray' }}
        >
          <span className="text-xs">{formattedDate}</span>
        </div>
      );
    }

    return <div className="flex gap-4">{days}</div>;
  };

  return (
    <div className="p-4">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;