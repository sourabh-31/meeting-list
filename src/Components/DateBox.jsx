import dayjs from "dayjs";
import { useMeetingContext } from "../store/MeetingContext";

function DateBox({ date, selectedDate, index, searchQuery, handleDateClick }) {
  const { dateBoxSelected } = useMeetingContext();
  //for cleaning and formatting the date string
  function formatDate(dateString) {
    const cleanedDateString = dateString.replace(/(\d+)(st|nd|rd|th)/, "$1");
    const formattedDate = dayjs(cleanedDateString, "D MMM YYYY").format(
      "DD MMM YYYY"
    );
    return formattedDate;
  }

  return (
    <div
      key={date}
      className={`p-2 border-[1px] border-[#ffe8cc] cursor-pointer text-center text-base font-medium  ${
        selectedDate === date ? "hover:bg-[#ffa94d]" : "hover:bg-[#fff4e6]"
      }
       ${
         selectedDate === date && !dateBoxSelected && "bg-[#ffa94d]  text-white"
       } ${
        index === parseInt(searchQuery) &&
        dateBoxSelected &&
        "bg-[#ffa94d] text-white"
      }`}
      onClick={() => handleDateClick(index, date)}
    >
      {formatDate(date)}
    </div>
  );
}

export default DateBox;
