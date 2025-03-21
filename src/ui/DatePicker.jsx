/* eslint-disable react/prop-types */
import { useState } from "react";
import Calendar from "react-datepicker";
import formatDateToYYYYMMDD from "./DateFormat";
import "react-datepicker/dist/react-datepicker.css";

function DatePicker({ selectedDate, onChange }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateChange = (date) => {
    onChange(formatDateToYYYYMMDD(date)); // Pass the selected date to the parent component
    setIsCalendarOpen(false); // Close the calendar after selecting a date
  };

  return (
    <div className="relative w-full">
      {/* Input Field */}
      <input
        type="text"
        readOnly
        value={
          selectedDate ? formatDateToYYYYMMDD(selectedDate) : "Pick a date"
        }
        onClick={() => setIsCalendarOpen((prev) => !prev)}
        className="w-full p-3 pl-10 text-lg transition-colors duration-200 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
        aria-label="Select a date"
      />

      {/* Calendar Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-6 h-6 text-gray-500 left-3 top-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>

      {/* Calendar Popup */}
      {isCalendarOpen && (
        <div className="absolute z-50 lg:mt-[1rem] lg:top-0">
          <Calendar
            selected={selectedDate}
            onChange={handleDateChange}
            inline
          />
        </div>
      )}
    </div>
  );
}

export default DatePicker;
