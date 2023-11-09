export const onBoardingButtons = [
  {
    layoutID: "button-01",
    layoutTitle: "Solid Rounded",
    layoutImage: "/images/onboarding/button-01.png",
    colours: {
      buttonOutline: "border-transparent",
      buttonMain: "bg-action",
      buttonHover: "hover:bg-action/90",
      buttonText: "text-primary-light",
      buttonHoverText: "text-primary-light",
    },
    block: (label, palette, index) => (
      <button
        key={`button-${index}`}
        className={`p-1 m-2 px-5 min-w-fit rounded-full ${palette.buttonMain} ${palette.buttonHover} ${palette.buttonText} hover:${palette.buttonHoverText} hover:shadow-[3px_3px_5px_rgba(0,0,0,0.25)] transition-all duration-300`}
      >
        {label}
      </button>
    ),
  },
  {
    layoutID: "button-02",
    layoutTitle: "Solid Squared",
    layoutImage: "/images/onboarding/button-02.png",
    colours: {
      buttonOutline: "border-transparent",
      buttonMain: "bg-action",
      buttonHover: "hover:bg-action/90",
      buttonText: "text-primary-light",
      buttonHoverText: "text-primary-light",
    },
    block: (label, palette, index) => (
      <button
        key={`button-${index}`}
        className={`p-1 m-2 px-5 min-w-max ${palette.buttonMain} ${palette.buttonHover} ${palette.buttonText} hover:${palette.buttonHoverText} hover:shadow-[3px_3px_5px_rgba(0,0,0,0.25)] transition-all duration-300`}
      >
        {label}
      </button>
    ),
  },
  {
    layoutID: "button-03",
    layoutTitle: "Solid Slanted",
    layoutImage: "/images/onboarding/button-03.png",
    colours: {
      buttonOutline: "border-transparent",
      buttonMain: "bg-action",
      buttonHover: "group-hover:bg-action/90",
      buttonText: "text-primary-light",
      buttonHoverText: "text-primary-light",
    },
    block: (label, palette, index) => (
      <button
        key={`button-${index}`}
        className="group relative m-2 px-5 w-4/6 min-w-max h-8 hover:scale-105 transition-all duration-100"
      >
        <div
          className={`absolute left-0 top-0 w-full h-full ${palette.buttonMain} ${palette.buttonHover} -skew-x-[20deg]`}
        ></div>
        <p
          className={`absolute left-0 top-0 flex items-center justify-center w-full h-full ${palette.buttonText} ${palette.buttonHoverText} text-base`}
        >
          {label}
        </p>
      </button>
    ),
  },
  {
    layoutID: "button-04",
    layoutTitle: "Neobrutalist",
    layoutImage: "/images/onboarding/button-04.png",
    colours: {
      buttonMain: "bg-action",
      buttonHover: "hover:bg-action",
      buttonText: "text-black",
    },
    block: (label, palette, index) => (
      <button
        key={`button-${index}`}
        className={`p-1 m-2.5 px-5 min-w-max rounded-lg ${palette.buttonMain} ${palette.buttonHover} shadow-[5px_6px_0px_rgba(0,0,0,1)] ${palette.buttonText} border-2 border-black hover:translate-x-1 hover:-translate-y-1 transition-all duration-100`}
      >
        {label}
      </button>
    ),
  },
  {
    layoutID: "button-05",
    layoutTitle: "The Grid",
    layoutImage: "/images/onboarding/button-05.png",
    colours: {
      buttonOutline: "border-action",
      buttonMain: "bg-action",
      buttonText: "text-action",
      buttonHoverText: "text-primary-light",
    },
    block: (label, palette, index) => (
      <button
        key={`button-${index}`}
        className={`group relative p-2 pl-6 hover:pl-9 w-full flex border-t-2 ${palette.buttonOutline} ${palette.buttonHover} last-of-type:border-b-2 ${palette.buttonText} hover:${palette.buttonHoverText} transition-all duration-500 z-10`}
      >
        <div
          className={`absolute left-0 top-0 w-0 group-hover:w-full h-full ${palette.buttonMain} transition-all duration-300 -z-10`}
        ></div>
        {label}
      </button>
    ),
  },
  {
    layoutID: "button-06",
    layoutTitle: "Outline Rounded",
    layoutImage: "/images/onboarding/button-06.png",
    colours: {
      buttonOutline: "border-action",
      buttonMain: "bg-transparent",
      buttonHover: "hover:bg-action",
      buttonText: "text-action",
      buttonHoverText: "hover:text-primary-light",
    },
    block: (label, palette, index) => (
      <button
        key={`button-${index}`}
        className={`p-1 m-2 px-5 min-w-max rounded-full border-2 ${palette.buttonOutline} ${palette.buttonMain} ${palette.buttonHover} ${palette.buttonText} ${palette.buttonHoverText} transition-all duration-300`}
      >
        {label}
      </button>
    ),
  },
  {
    layoutID: "button-07",
    layoutTitle: "Outline Squared",
    layoutImage: "/images/onboarding/button-07.png",
    colours: {
      buttonOutline: "border-action",
      buttonMain: "bg-transparent",
      buttonHover: "hover:bg-action",
      buttonText: "text-action",
      buttonHoverText: "hover:text-primary-light",
    },
    block: (label, palette, index) => (
      <button
        key={`button-${index}`}
        className={`p-1 m-2 px-5 min-w-max border-2 ${palette.buttonOutline} ${palette.buttonMain} ${palette.buttonHover} ${palette.buttonText} ${palette.buttonHoverText} transition-all duration-300`}
      >
        {label}
      </button>
    ),
  },
  {
    layoutID: "button-08",
    layoutTitle: "Outline Slanted",
    layoutImage: "/images/onboarding/button-08.png",
    colours: {
      buttonOutline: "border-action",
      buttonMain: "bg-transparent",
      buttonHover: "group-hover:bg-action",
      buttonText: "text-action",
      buttonHoverText: "group-hover:text-primary-light",
    },
    block: (label, palette, index) => (
      <button
        key={`button-${index}`}
        className="group relative m-2 px-5 w-4/6 min-w-max h-8 hover:scale-105 transition-all duration-100"
      >
        <div
          className={`absolute left-0 top-0 w-full h-full border-2 ${palette.buttonOutline} ${palette.buttonMain} ${palette.buttonHover} -skew-x-[20deg] transition-all duration-100`}
        ></div>
        <p
          className={`absolute left-0 top-0 flex items-center justify-center w-full h-full ${palette.buttonText} ${palette.buttonHoverText} text-base z-10`}
        >
          {label}
        </p>
      </button>
    ),
  },
  {
    layoutID: "button-09",
    layoutTitle: "Elegant List",
    layoutImage: "/images/onboarding/button-09.png",
    colours: {
      buttonOutline: "border-action",
      buttonMain: "bg-transparent",
      buttonHover: "group-hover:bg-action",
      buttonText: "text-action",
    },
    block: (label, palette, index) => (
      <button
        key={`button-${index}`}
        className={`group p-0.5 m-2 ml-6 hover:ml-8 inline-flex self-start items-center gap-2 ${palette.buttonText} transition-all duration-[0.35s]`}
      >
        <div
          className={`block px-[0.15rem] py-[0.15rem] border-[2px] ${palette.buttonOutline} ${palette.buttonMain} ${palette.buttonHover}`}
        ></div>
        {label}
      </button>
    ),
  },
  {
    layoutID: "button-10",
    layoutTitle: "Underlined",
    layoutImage: "/images/onboarding/button-10.png",
    colours: {
      buttonMain: "bg-action",
      buttonText: "text-action",
    },
    block: (label, palette, index) => (
      <button
        key={`button-${index}`}
        className={`group relative pt-0.5 m-2 ml-6 hover:ml-8 inline-flex self-start flex ${palette.buttonText} transition-all duration-[0.35s]`}
      >
        <div
          className={`absolute pt-0.5 w-0 group-hover:w-full bottom-0 ${palette.buttonMain} z-10 transition-all duration-300`}
        ></div>
        {label}
      </button>
    ),
  },
];
