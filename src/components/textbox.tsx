"use client"
import React, { useState } from 'react';

const RecordingComponent = () => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
    // Add your start recording logic here
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Add your stop recording logic here
  };

  return (
    <div className="flex flex-col items-center mt-20 h-screen">
        <h2 className='text-5xl mb-8'>Log Your Workouts</h2>
      <textarea
        className="mb-4 p-2 border rounded-lg w-1/3 h-48 text-black"
        placeholder="Enter text here..."
      />
      <div className="flex space-x-4 rounded-lg">
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={startRecording}
          disabled={isRecording}
        >
          Start Recording
        </button>
        <button 
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={stopRecording}
          disabled={!isRecording}
        >
          Stop Recording
        </button>
      </div>
    </div>
  );
};

export default RecordingComponent;
