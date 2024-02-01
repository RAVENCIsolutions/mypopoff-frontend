import { FaAngleLeft } from "react-icons/fa";

const PrevButton = (props) => {
  return (
    <button
      className="px-8 pt-2 pb-2 flex items-center justify-center gap-2 hover:gap-4 border-2 border-primary-dark/40 hover:border-action bg-transparent hover:bg-action w-full md:w-auto md:rounded-full text-primary-dark/40 hover:text-primary-light font-bold transition-all duration-300"
      {...props}
    >
      <FaAngleLeft className="-mt-0.5 hidden md:block" />
      Go Back
    </button>
  );
};

export default PrevButton;
