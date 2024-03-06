export default function IconButton({ children, onButtonClick }) {
  return (
    <button
      className="font-customFont font-medium bg-white text-xl py-2 px-2 rounded-full text-[#2c3e50] mx-[0.4rem]"
      onClick={onButtonClick}
    >
      {children}
    </button>
  );
}
