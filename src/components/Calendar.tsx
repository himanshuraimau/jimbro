"use client"
import React, { useState } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';

const Calendar = ({ selectedDate, onDateClick }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="flex justify-between items-center mb-2">
        <button 
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={() => setCurrentWeek(addDays(currentWeek, -7))}
        >
          Prev
        </button>
        <span className="text-xl">{format(currentWeek, dateFormat)}</span>
        <button 
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={() => setCurrentWeek(addDays(currentWeek, 7))}
        >
          Next
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEEE";
    const startDate = startOfWeek(currentWeek);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="w-1/7 text-center" key={i}>
          <span className="text-sm">{format(addDays(startDate, i), dateFormat)}</span>
        </div>
      );
    }

    return <div className="flex">{days}</div>;
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentWeek);
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = addDays(startDate, i);
      const formattedDate = format(day, "d");
      const cloneDay = day;

      days.push(
        <div 
          className="w-1/7 p-2 text-center border cursor-pointer"
          key={day}
          onClick={() => onDateClick(cloneDay)}
          style={{ borderColor: isSameDay(day, selectedDate) ? 'blue' : 'gray' }}
        >
          <span className="text-xs">{formattedDate}</span>
        </div>
      );
    }

    return <div className="flex">{days}</div>;
  };

  return (
    <div>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
