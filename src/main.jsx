import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MeetingProvider } from "./store/MeetingContext";
import { MonthSelectorProvider } from "./store/MonthSelectorContext.jsx";
const Main = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://script.googleusercontent.com/macros/echo?user_content_key=mUswzny4CCq8umUa2Fg5Oe3n4n6wGMt-Wg8ZHcUNB35-wAo7diNZpa3wHY1_ZzvrJ8xbfzRvPNU_lD-HpZr3QbXyAYZPNgJlm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnL70oDaCQuU830bON0r2OhePX0aCtea2PsOTBLI5nVkj71Jau4K7P59A2HKO_zQdfW8FjW8a1C5UhW6nZreshKr4XDhLM_RWsw&lib=MOxyBEmsGT1bYQ7eBUSaPrYqWGBNmREQ3"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.StrictMode>
      <MonthSelectorProvider>
        <MeetingProvider>
          <App data={data} />
        </MeetingProvider>
      </MonthSelectorProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
