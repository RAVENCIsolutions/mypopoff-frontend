import { FaAngleRight } from "react-icons/fa";

const NextButton = (props) => {
  return (
    <button
      className="px-8 py-2 md:self-end flex items-center justify-center gap-2 hover:gap-4 border-2 border-action bg-transparent hover:bg-action w-full sm:w-auto sm:rounded-full text-action hover:text-primary-light font-bold transition-all duration-300"
      {...props}
    >
      Next
      <FaAngleRight className="-mt-0.5 hidden md:block" />
    </button>
  );
};

export default NextButton;
