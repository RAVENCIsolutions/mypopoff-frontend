import {
  PiAirplaneTilt,
  PiBarbell,
  PiBriefcase,
  PiDevices,
  PiGraduationCap,
  PiGuitar,
  PiHandHeart,
  PiMaskHappy,
  PiNewspaperClipping,
  PiPaintBrushHousehold,
  PiPlusSquare,
  PiShoppingCart,
  PiSword,
} from "react-icons/pi";

const categories = [
  {
    name: "Business and Corporate",
    icon: (index, selected) => (
      <PiBriefcase color={selected ? "#f7f5f3" : "#202224"} />
    ),
  },
  {
    name: "Creative",
    icon: (index, selected) => (
      <PiPaintBrushHousehold color={selected ? "#f7f5f3" : "#202224"} />
    ),
  },
  {
    name: "eCommmerce and Retail",
    icon: (index, selected) => (
      <PiShoppingCart color={selected ? "#f7f5f3" : "#202224"} />
    ),
  },
  {
    name: "Education",
    icon: (index, selected) => (
      <PiGraduationCap
        className={selected ? "text-white" : "text-primary-dark"}
      />
    ),
  },
  {
    name: "Entertainment",
    icon: (index, selected) => (
      <PiMaskHappy color={selected ? "#f7f5f3" : "#202224"} />
    ),
  },
  {
    name: "Gaming",
    icon: (index, selected) => (
      <PiSword color={selected ? "#f7f5f3" : "#202224"} />
    ),
  },
  {
    name: "Health and Fitness",
    icon: (index, selected) => (
      <PiBarbell color={selected ? "#f7f5f3" : "#202224"} />
    ),
  },
  {
    name: "Music",
    icon: (index, selected) => (
      <PiGuitar color={selected ? "#f7f5f3" : "#202224"} />
    ),
  },
  {
    name: "News and Media",
    icon: (index, selected) => (
      <PiNewspaperClipping color={selected ? "#f7f5f3" : "#202224"} />
    ),
  },
  {
    name: "Non-profit",
    icon: (index, selected) => (
      <PiHandHeart color={selected ? "#f7f5f3" : "#202224"} />
    ),
  },
  {
    name: "Technology",
    icon: (index, selected) => (
      <PiDevices color={selected ? "#f7f5f3" : "#202224"} />
    ),
  },
  {
    name: "Travel",
    icon: (index, selected) => (
      <PiAirplaneTilt color={selected ? "#f7f5f3" : "#202224"} />
    ),
  },
  {
    name: "Other..",
    icon: (index, selected) => (
      <PiPlusSquare color={selected ? "#f7f5f3" : "#202224"} />
    ),
  },
];

export { categories };
