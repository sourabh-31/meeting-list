// MonthSelectorContext.js
import { createContext, useState, useContext, useEffect } from "react";

const MonthSelectorContext = createContext();

export const MonthSelectorProvider = ({ children }) => {
  const [currentMonth, setCurrentMonth] = useState("");
  const [date, setDate] = useState(new Date());

  const updateMonth = (newMonth = null) => {
    const monthName = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    setCurrentMonth(`${monthName} ${year}`);

    if (newMonth) setCurrentMonth(newMonth);
  };

  const goToPreviousMonth = () => {
    const previousMonth = new Date(date.getFullYear(), date.getMonth() - 1);
    setDate(previousMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1);
    setDate(nextMonth);
  };

  useEffect(() => {
    updateMonth();
  }, [date]);

  return (
    <MonthSelectorContext.Provider
      value={{
        currentMonth,
        goToPreviousMonth,
        goToNextMonth,
        updateMonth,
      }}
    >
      {children}
    </MonthSelectorContext.Provider>
  );
};

export const useMonthSelector = () => useContext(MonthSelectorContext);
