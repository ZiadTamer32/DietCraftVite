/* eslint-disable react/prop-types */
import Calendar from "react-calendar";
import formatDateToYYYYMMDD from "./DateFormat";
import "react-calendar/dist/Calendar.css";
import "./CalendarStyles.css"; // Custom styles

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  const onChange = (newDate) => {
    // If the clicked date is the same as the currently selected date, deselect it (set to null)
    if (formatDateToYYYYMMDD(newDate) === selectedDate) {
      setSelectedDate(null);
    } else {
      setSelectedDate(formatDateToYYYYMMDD(newDate));
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={onChange}
        value={selectedDate ? new Date(selectedDate) : null}
        className="custom-calendar"
      />
    </div>
  );
};

export default DatePicker;
