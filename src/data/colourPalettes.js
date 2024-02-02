import { BiRadio } from "react-icons/bi";
import { LuLeaf } from "react-icons/lu";

const extraPalettes = [
  {
    label: "Christmas",
    component: (colour) => (
      <i
        className={`fi fi-br-tree-christmas text-2xl`}
        style={{ color: colour }}
      ></i>
    ),
    colors: [
      "#D5C2D5",
      "#9A0000",
      "#5A0502",
      "#024D2E",
      "#007000",
      "#80B25D",
      "#008483",
      "#AC846B",
      "#A52B2A",
      "#784333",
      "#604033",
      "#2C1712",
    ],
  },
  {
    label: "Autumn",
    component: (colour) => <LuLeaf size={25} color={colour} />,
    colors: [
      "#004600",
      "#466603",
      "#B5BD11",
      "#FBE730",
      "#FFAC3B",
      "#EA3F00",
      "#870002",
      "#FF8F9B",
      "#994C90",
      "#54014F",
      "#00003C",
      "#2C72A8",
    ],
  },
  {
    label: "Retro",
    component: (colour) => <BiRadio size={25} color={colour} />,
    colors: [
      "#43E7D4",
      "#0B2B40",
      "#92D622",
      "#FF970C",
      "#E5570C",
      "#197384",
      "#20CED1",
      "#FA3960",
      "#CC033D",
      "#730F33",
      "#3B1850",
      "#1B1714",
    ],
  },
  {
    label: "Watermelon",
    component: (colour) => (
      <i
        className={`fi fi-br-watermelon text-xl`}
        style={{ color: colour }}
      ></i>
    ),
    colors: [
      "#005F39",
      "#2E8B57",
      "#7FC08A",
      "#C3F25C",
      "#FF6F61",
      "#FFA07A",
      "#FFD1C1",
      "#8C0335",
      "#F2003C",
      "#FFC0CB",
      "#000000",
      "#444444",
    ],
  },
  {
    label: "Nebula",
    component: (colour) => (
      <i
        className={`fi fi-br-galaxy-planet text-xl`}
        style={{ color: colour }}
      ></i>
    ),
    colors: [
      "#331E36",
      "#5E1742",
      "#882367",
      "#3B1F87",
      "#264B96",
      "#0077BE",
      "#0094C6",
      "#00BBD6",
      "#28D2E5",
      "#32EEDB",
      "#8CFF98",
      "#FFF47D",
    ],
  },
];

export { extraPalettes };
