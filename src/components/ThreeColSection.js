import Link from "next/link";
import { TbDeviceImac } from "react-icons/tb";
import { PiMagnifyingGlass } from "react-icons/pi";
import { FaShareAlt } from "react-icons/fa";

const ThreeColSection = ({
  heading,
  firstImage,
  secondImage,
  thirdImage,
  callToAction,
}) => {
  return (
    <section className="relative mt-20 mb-20 md:mb-52 px-5 md:px-14 flex flex-col w-full max-w-windowed overflow-hidden">
      <h2 className="mb-6 md:mb-12 leading-tight font-bold text-primary-dark dark:text-primary-light">
        {heading || "First level two heading"}
      </h2>

      <article className="flex flex-col sm:flex-row gap-10 md:gap-0 justify-between w-full max-w-windowed">
        <div className={`flex-grow flex flex-col items-center gap-2`}>
          <TbDeviceImac size={60} />
          <h3 className={`text-2xl md:text-3xl font-bold`}>Build Once</h3>
        </div>
        <div className={`flex-grow flex flex-col items-center gap-2`}>
          <FaShareAlt size={60} />
          <h3 className={`text-2xl md:text-3xl font-bold`}>Share Everywhere</h3>
        </div>
        <div className={`flex-grow flex flex-col items-center gap-2`}>
          <PiMagnifyingGlass size={60} />
          <h3 className={`text-2xl md:text-3xl font-bold`}>Custim</h3>
        </div>
      </article>
    </section>
  );
};

export default ThreeColSection;
