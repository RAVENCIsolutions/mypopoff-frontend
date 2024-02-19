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
    icon: (index, selectedCategory) => (
      <PiBriefcase color={selectedCategory === index ? "#f7f5f3" : "#202224"} />
    ),
  },
  {
    name: "Creative",
    icon: (index, selectedCategory) => (
      <PiPaintBrushHousehold
        color={selectedCategory === index ? "#f7f5f3" : "#202224"}
      />
    ),
  },
  {
    name: "eCommmerce and Retail",
    icon: (index, selectedCategory) => (
      <PiShoppingCart
        color={selectedCategory === index ? "#f7f5f3" : "#202224"}
      />
    ),
  },
  {
    name: "Education",
    icon: (index, selectedCategory) => (
      <PiGraduationCap
        className={
          selectedCategory === index ? "text-white" : "text-primary-dark"
        }
      />
    ),
  },
  {
    name: "Entertainment",
    icon: (index, selectedCategory) => (
      <PiMaskHappy color={selectedCategory === index ? "#f7f5f3" : "#202224"} />
    ),
  },
  {
    name: "Gaming",
    icon: (index, selectedCategory) => (
      <PiSword color={selectedCategory === index ? "#f7f5f3" : "#202224"} />
    ),
  },
  {
    name: "Health and Fitness",
    icon: (index, selectedCategory) => (
      <PiBarbell color={selectedCategory === index ? "#f7f5f3" : "#202224"} />
    ),
  },
  {
    name: "Music",
    icon: (index, selectedCategory) => (
      <PiGuitar color={selectedCategory === index ? "#f7f5f3" : "#202224"} />
    ),
  },
  {
    name: "News and Media",
    icon: (index, selectedCategory) => (
      <PiNewspaperClipping
        color={selectedCategory === index ? "#f7f5f3" : "#202224"}
      />
    ),
  },
  {
    name: "Non-profit",
    icon: (index, selectedCategory) => (
      <PiHandHeart color={selectedCategory === index ? "#f7f5f3" : "#202224"} />
    ),
  },
  {
    name: "Technology",
    icon: (index, selectedCategory) => (
      <PiDevices color={selectedCategory === index ? "#f7f5f3" : "#202224"} />
    ),
  },
  {
    name: "Travel",
    icon: (index, selectedCategory) => (
      <PiAirplaneTilt
        color={selectedCategory === index ? "#f7f5f3" : "#202224"}
      />
    ),
  },
  {
    name: "Other..",
    icon: (index, selectedCategory) => (
      <PiPlusSquare
        color={selectedCategory === index ? "#f7f5f3" : "#202224"}
      />
    ),
  },
];

export { categories };
