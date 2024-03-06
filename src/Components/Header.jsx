function Header({ calendarDatesLength }) {
  return (
    <div className="flex items-center justify-between mt-12">
      <div>
        <p className="font-bold flex items-center gap-2">
          <span className="text-4xl">🗓️</span>
          <span className="text-3xl ">The Meeting Calendar</span>
        </p>
      </div>

      <p className="text-lg font-bold mr-2">
        🚀 {calendarDatesLength} meetings found
      </p>
    </div>
  );
}

export default Header;
