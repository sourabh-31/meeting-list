import { useEffect, useState } from "react";
import { BiUser, BiUserCheck, BiChat } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { PiTextAUnderlineBold } from "react-icons/pi";
import IconButton from "./IconButton";
import { useMeetingContext } from "../store/MeetingContext";
import { useMonthSelector } from "../store/MonthSelectorContext";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SearchBar({ newEvents }) {
  const {
    searchQuery,
    setSearchQuery,
    inputValue,
    setInputValue,
    setDateBoxSelected,
  } = useMeetingContext();

  const { updateMonth } = useMonthSelector();
  const [dropVisible, setDropVisible] = useState(false);
  const [dropType, setDropType] = useState("agenda");
  const [filteredEvents, setFilteredEvents] = useState(newEvents);
  const [date, setDate] = useState(new Date());

  //for clicking on the search bar
  function handleInputFocus() {
    setDropVisible(true);
  }

  function closeDropMenu() {
    setDropVisible(false);
  }

  //runs when the value is selected from the search suggestion
  function handleInputChange(data) {
    setInputValue(data);
  }

  function formatMonthYear(dateString) {
    const cleanedDateString = dateString.replace(/(\d+)(st|nd|rd|th)/, "$1");
    const formattedDate = dayjs(cleanedDateString, "D MMM YYYY").format(
      "MMMM YYYY"
    );
    return formattedDate;
  }

  //for handling the items clicked in the suggestion list
  function handleListClick(item) {
    if (dropType === "agenda") setInputValue(item.agenda);
    else if (dropType === "minutesBy") setInputValue(item.title);
    else if (dropType === "presentPeople") setInputValue(item.present);
    else setInputValue(item.keyDiscussionPoints);
    setSearchQuery(item.id);
    updateMonth(formatMonthYear(item.eventDate));
    setDateBoxSelected(true);
  }

  //for removing the suggestions box when a item is clicked
  useEffect(
    function () {
      if (searchQuery) {
        setDropVisible(false);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    // Filter events based on input value and drop type
    const filtered = newEvents.filter((item) => {
      const searchString = inputValue.toLowerCase();
      let fieldToSearch = "";
      switch (dropType) {
        case "agenda":
          fieldToSearch = item.agenda.toLowerCase();
          break;
        case "minutesBy":
          fieldToSearch = item.title.toLowerCase();
          break;
        case "presentPeople":
          fieldToSearch = item.present.toLowerCase();
          break;
        case "discussionPoints":
          fieldToSearch = item.keyDiscussionPoints.toLowerCase();
          break;
      }
      return fieldToSearch.includes(searchString);
    });

    setFilteredEvents(filtered);
  }, [newEvents, inputValue, dropType]);

  function getMonthNumber(monthName) {
    const months = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    return months[monthName];
  }

  function formatDate(dateString) {
    const cleanedDateString = dateString.replace(/(\d+)(st|nd|rd|th)/, "$1");
    const formattedDate = dayjs(cleanedDateString, "D MMM YYYY").format(
      "DD MMM YYYY"
    );
    const [day, monthName, year] = formattedDate.split(" ");
    return new Date(year, getMonthNumber(monthName), day);
  }

  const highlightDates = newEvents.map((item) => formatDate(item.eventDate));
  return (
    <>
      <div className="flex items-center mt-8 justify-between bg-[#fff4e6] p-6">
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          onMonthChange={(date) => {
            const monthYearString = date.toLocaleString("default", {
              month: "long",
              year: "numeric",
            });
            updateMonth(monthYearString);
          }}
          selected={date}
          dateFormat="dd/MM/yyyy"
          className="border-[1px] border-[#ffe8cc] py-3 px-5 outline-none"
          highlightDates={highlightDates}
        />

        <div className="w-[50%] relative">
          <input
            placeholder={`search by ${dropType}`}
            className="w-full border-[1px] border-[#ffe8cc] py-3 px-5 outline-none"
            onFocus={handleInputFocus}
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
          />

          {/* suggestions box for search bar */}
          {dropVisible && (
            <div className="bg-white w-full absolute top-16 z-10 pb-1 border-[1px] border-[#ffe8cc]">
              <ul className="max-h-[25rem] overflow-auto whitespace-normal break-words text-left">
                <li className="flex justify-end border-b-[1px] border-gray-200 py-4">
                  <button
                    className="mr-4 bg-[#ffa94d] rounded-full p-1"
                    onClick={closeDropMenu}
                  >
                    <RxCross2 size={20} className="text-white" />
                  </button>
                </li>
                {filteredEvents.map((item, i) => (
                  <li
                    className="px-3 py-4 border-b-[1px] border-gray-200 hover:bg-gray-200 cursor-pointer text-base font-medium"
                    key={i}
                    onClick={() => handleListClick(item)}
                  >
                    <span className="text-xs mr-2">🟢</span>
                    {dropType === "agenda"
                      ? item.agenda
                      : dropType === "minutesBy"
                      ? item.title
                      : dropType === "presentPeople"
                      ? item.present
                      : dropType === "discussionPoints"
                      ? item.keyDiscussionPoints
                      : item.agenda}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Icon Tray */}
        <div className="bg-[#ffa94d] py-2 px-1">
          <IconButton onButtonClick={() => setDropType("agenda")}>
            <PiTextAUnderlineBold size={16} />
          </IconButton>

          <IconButton onButtonClick={() => setDropType("minutesBy")}>
            <BiUser size={16} />
          </IconButton>

          <IconButton onButtonClick={() => setDropType("presentPeople")}>
            <BiUserCheck size={16} />
          </IconButton>
          <IconButton onButtonClick={() => setDropType("discussionPoints")}>
            <BiChat size={16} />
          </IconButton>
        </div>
      </div>
    </>
  );
}
