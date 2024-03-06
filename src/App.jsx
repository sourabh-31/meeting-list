// App.jsx

import React, { useEffect, useState } from "react";
import MeetingCard from "./Components/MeetingCard";
import SearchBar from "./Components/SearchBar";
import { useMeetingContext } from "./store/MeetingContext";
import Header from "./Components/Header";
import DateBox from "./Components/DateBox";
import dayjs from "dayjs";
import MonthDisplay from "./Components/MonthDisplay";
import { useMonthSelector } from "./store/MonthSelectorContext";

const App = ({ data }) => {
  const { searchQuery, setDateBoxSelected } = useMeetingContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const { currentMonth } = useMonthSelector();

  //for cleaning and formatting the date string
  function formatDate(dateString) {
    const cleanedDateString = dateString.replace(/(\d+)(st|nd|rd|th)/, "$1");
    const formattedDate = dayjs(cleanedDateString, "D MMM YYYY").format(
      "DD MMM YYYY"
    );
    return formattedDate;
  }

  function formatMonthYear(dateString) {
    const cleanedDateString = dateString.replace(/(\d+)(st|nd|rd|th)/, "$1");
    const formattedDate = dayjs(cleanedDateString, "D MMM YYYY").format(
      "MMMM YYYY"
    );
    return formattedDate;
  }

  const filteredData = data
    .slice(1)
    .filter((row) => row["MeetingDate"] !== "")
    .map((row, index) => ({ ...row, id: index }));

  const handleDateClick = (meeting, date) => {
    setSelectedDate(date);
    setSelectedMeeting(meeting);
    setDateBoxSelected(false);
  };

  const calendarDatesLength = filteredData.length;

  const newEvents = filteredData.map((meeting, index) => {
    return {
      id: index,
      agenda: `${meeting ? meeting["Agenda items"] : ""}`,
      title: `Minutes by ${meeting ? meeting.MinutesBy : "Unknown"}`,
      present: `${meeting ? meeting.Present : "Unknown"}`,
      keyDiscussionPoints: `${
        meeting ? meeting["Key discussion points"] : "Unknown"
      }`,
      eventDate: `${meeting ? meeting.MeetingDate : ""}`,
    };
  });

  return (
    <div className="px-[16rem]">
      <Header calendarDatesLength={calendarDatesLength} />
      <SearchBar newEvents={newEvents} />
      <div className="mt-12">
        <MonthDisplay />
        <div className="grid grid-cols-7 gap-4 mt-8">
          {filteredData
            .filter((data) => {
              const month = formatMonthYear(data.MeetingDate);
              return month === currentMonth;
            })
            .map((data, index) => (
              <DateBox
                key={index}
                date={data.MeetingDate}
                selectedDate={selectedDate}
                index={data.id}
                searchQuery={searchQuery}
                handleDateClick={handleDateClick}
              />
            ))}
        </div>
      </div>
      {/* Selected Date Events */}
      <div className="col-span-7">
        {selectedDate && (
          <>
            <p className="text-2xl font-semibold mt-16 text-center uppercase">
              {formatDate(selectedDate)} - Meetings
            </p>

            <MeetingCard meeting={filteredData[selectedMeeting]} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
