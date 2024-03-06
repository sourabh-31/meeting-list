import { useMonthSelector } from "../store/MonthSelectorContext";

function MonthDisplay() {
  const { currentMonth, goToPreviousMonth, goToNextMonth } = useMonthSelector();

  return (
    <div className="flex justify-between items-center">
      <button className="bg-[#ffe8cc] px-4 py-2" onClick={goToPreviousMonth}>
        ← Previous
      </button>
      <p className="text-2xl font-semibold">{currentMonth}</p>
      <button className="bg-[#ffe8cc] px-4 py-2" onClick={goToNextMonth}>
        Next →
      </button>
    </div>
  );
}

export default MonthDisplay;
