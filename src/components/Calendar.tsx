"use client";
import React, { useState, useEffect } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';

interface CalendarProps {
  initialDate?: Date;
  onDateClick: (date: Date) => void;
}

interface DateSubmissions {
  [key: string]: string;
}

const Calendar: React.FC<CalendarProps> = ({ initialDate = new Date(), onDateClick }) => {
  const [currentWeek, setCurrentWeek] = useState<Date>(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [selectedDateInput, setSelectedDateInput] = useState<string>('');
  const [dateSubmissions, setDateSubmissions] = useState<DateSubmissions>({});

  useEffect(() => {
    onDateClick(selectedDate);
  }, [selectedDate, onDateClick]);

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="flex justify-between items-center mt-10 mb-6 py-2 w-full">
        <button 
          className="text-xl px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition"
          onClick={() => setCurrentWeek(addDays(currentWeek, -7))}
        >
          Prev
        </button>
        <span className="text-2xl font-bold text-white">{format(currentWeek, dateFormat)}</span>
        <button 
          className="text-xl px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition"
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
          <span className="text-sm font-medium text-gray-300">{format(addDays(startDate, i), dateFormat)}</span>
        </div>
      );
    }

    return <div className="flex mb-4">{days}</div>;
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentWeek);
    const days: JSX.Element[] = [];

    for (let i = 0; i < 7; i++) {
      const day = addDays(startDate, i);
      const formattedDate = format(day, "d");
      const dateKey = format(day, "yyyy-MM-dd");

      days.push(
        <div 
          className={`flex-1 p-4 text-center border cursor-pointer rounded-lg m-1 transition ${
            isSameDay(day, selectedDate) ? 'bg-blue-700 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          key={day.toISOString()}
          onClick={() => {
            setSelectedDate(day);
            onDateClick(day);
            setSelectedDateInput(dateSubmissions[dateKey] || '');
          }}
        >
          <span className="block text-lg font-semibold">{formattedDate}</span>
          {dateSubmissions[dateKey] && (
            <div className="mt-2">
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">Note</span>
            </div>
          )}
        </div>
      );
    }

    return <div className="grid grid-cols-7 gap-4">{days}</div>;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDateInput(e.target.value);
  };

  const handleSubmit = () => {
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    setDateSubmissions(prev => ({
      ...prev,
      [dateKey]: selectedDateInput
    }));
    setSelectedDateInput('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black rounded-lg shadow-md">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <div className="mt-6 flex flex-col items-center">
        <label htmlFor="selectedDateInput" className="block mb-2 text-lg font-medium text-white">
          Selected Date: {format(selectedDate, "MMMM d, yyyy")}
        </label>
        <input
          id="selectedDateInput"
          type="text"
          value={selectedDateInput}
          onChange={handleInputChange}
          placeholder="Enter notes for this date"
          className="w-1/2 p-2 border rounded-lg text-white bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-4 transition"
        >
          Submit
        </button>
        {dateSubmissions[format(selectedDate, "yyyy-MM-dd")] && (
          <div className="mt-6 p-4 bg-gray-800 text-white rounded-lg shadow-inner">
            <h3 className="font-bold">Submitted Text for {format(selectedDate, "MMMM d, yyyy")}:</h3>
            <p>{dateSubmissions[format(selectedDate, "yyyy-MM-dd")]}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
