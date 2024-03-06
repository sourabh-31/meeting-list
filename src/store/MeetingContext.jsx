import { createContext, useContext, useState } from "react";

// Create a context
const MeetingContext = createContext();

export const MeetingProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [dateBoxSelected, setDateBoxSelected] = useState(false);
  return (
    <MeetingContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        inputValue,
        setInputValue,
        dateBoxSelected,
        setDateBoxSelected,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeetingContext = () => {
  return useContext(MeetingContext);
};
