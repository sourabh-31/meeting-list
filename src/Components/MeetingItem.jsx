function MeetingItem({ children, label }) {
  return (
    <p className="mt-3">
      <span className="text-xl font-bold text-[#595959]">{label}</span>
      <span className="font-medium ml-3 text-[#666666]">{children}</span>
    </p>
  );
}

export default MeetingItem;
