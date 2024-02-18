import Link from "next/link";

const ButtonStyle04 = (props) => {
  const { link, title, palette } = props;

  return (
    <Link
      href={link}
      target={`_blank`}
      className={`p-1 m-1 px-5 min-w-max rounded-lg shadow-[5px_6px_0px_rgba(0,0,0,1)] border-2 border-black hover:translate-x-1 hover:-translate-y-1 text-base sm:text-lg transition-all duration-100`}
      style={{
        backgroundColor: palette.buttonMain,
        color: palette.buttonText,
      }}
    >
      {title}
    </Link>
  );
};

export default ButtonStyle04;
