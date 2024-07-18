import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatePicker.css";

const MyDatePicker = ({ value, onChange }) => {
  return (
    <div className="date-picker-container">
      <DatePicker selected={value} onChange={onChange} inline />
    </div>
  );
};

export default MyDatePicker;
