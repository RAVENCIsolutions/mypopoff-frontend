"use client";

import { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import PopOffInput from "@/components/PopOffInput";
import { observer } from "mobx-react";

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
  PiPencilLineLight,
  PiPlusSquare,
  PiShoppingCart,
  PiSword,
} from "react-icons/pi";

import PopOffChip from "@/components/PopOffChip";
import PopOffChipInput from "@/components/PopOffChipInput";
import PopOffTextArea from "@/components/PopOffTextArea";

const OnBoardingFour = observer((props) => {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [otherCategoryValue, setOtherCategoryValue] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    avatar: "",
    category: "",
    otherCategory: "",
    tags: [],
    bio: "",
  });

  const avatarOverlay = useRef(null);
  const avatarFileRef = useRef(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setFormData({
      ...formData,
      category: categories[category],
    });

    setFormData({
      ...formData,
      otherCategory: category < categories.length - 1 ? "" : otherCategoryValue,
    });
  };

  const handleAvatarSelect = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedAvatar(file);
    }
  };

  const categories = [
    {
      name: "Business and Corporate",
      icon: (index) => (
        <PiBriefcase
          color={selectedCategory === index ? "#f7f5f3" : "#202224"}
        />
      ),
    },
    {
      name: "Creative",
      icon: (index) => (
        <PiPaintBrushHousehold
          color={selectedCategory === index ? "#f7f5f3" : "#202224"}
        />
      ),
    },
    {
      name: "eCommmerce and Retail",
      icon: (index) => (
        <PiShoppingCart
          color={selectedCategory === index ? "#f7f5f3" : "#202224"}
        />
      ),
    },
    {
      name: "Education",
      icon: (index) => (
        <PiGraduationCap
          className={
            selectedCategory === index ? "text-white" : "text-primary-dark"
          }
        />
      ),
    },
    {
      name: "Entertainment",
      icon: (index) => (
        <PiMaskHappy
          color={selectedCategory === index ? "#f7f5f3" : "#202224"}
        />
      ),
    },
    {
      name: "Gaming",
      icon: (index) => (
        <PiSword color={selectedCategory === index ? "#f7f5f3" : "#202224"} />
      ),
    },
    {
      name: "Health and Fitness",
      icon: (index) => (
        <PiBarbell color={selectedCategory === index ? "#f7f5f3" : "#202224"} />
      ),
    },
    {
      name: "Music",
      icon: (index) => (
        <PiGuitar color={selectedCategory === index ? "#f7f5f3" : "#202224"} />
      ),
    },
    {
      name: "News and Media",
      icon: (index) => (
        <PiNewspaperClipping
          color={selectedCategory === index ? "#f7f5f3" : "#202224"}
        />
      ),
    },
    {
      name: "Non-profit",
      icon: (index) => (
        <PiHandHeart
          color={selectedCategory === index ? "#f7f5f3" : "#202224"}
        />
      ),
    },
    {
      name: "Technology",
      icon: (index) => (
        <PiDevices color={selectedCategory === index ? "#f7f5f3" : "#202224"} />
      ),
    },
    {
      name: "Travel",
      icon: (index) => (
        <PiAirplaneTilt
          color={selectedCategory === index ? "#f7f5f3" : "#202224"}
        />
      ),
    },
    {
      name: "Other..",
      icon: (index) => (
        <PiPlusSquare
          color={selectedCategory === index ? "#f7f5f3" : "#202224"}
        />
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);

    props.setFeedback([
      { id: 0, subject: "username", text: "Test", severity: "success" },
      { id: 1, subject: "something else", text: "Test", severity: "info" },
      { id: 2, subject: "category", text: "Testing", severity: "warning" },
      {
        id: 3,
        subject: "other",
        text: "Testing C relative flex flex-col items-center gap-2 h-32 w-32 rounded-full shadow-xl shadow-primary-dark/10 overflow-hidden",
        severity: "error",
      },
    ]);

    setLoading(false);
  }, []);

  useEffect(() => {
    props.setGreenLight();
  });

  return (
    <>
      <section className="relative mt-5 mb-10 self-start flex flex-col md:flex-row items-stretch justify-between">
        <article className="pt-10 px-5 pb-10 flex flex-col items-center gap-10 rounded-none md:rounded-3xl w-full bg-white shadow-lg shadow-dashboard-primary-dark/10">
          <div className="relative flex flex-col items-center gap-2 h-32 w-32 rounded-full shadow-xl shadow-primary-dark/10 overflow-hidden">
            <img src="/images/avatar-placeholder.jpg" className="" />

            <div
              ref={avatarOverlay}
              className="absolute flex items-center justify-center w-full h-full bg-primary-dark rounded-full opacity-0 transition-all duration-500"
            >
              <p className="text-white text-base">Change Avatar</p>
            </div>

            <button
              className="avatar absolute top-2.5 right-2.5 p-2 hover:p-2.5 bg-white rounded-full shadow-md hover:shadow-xl shadow-primary-dark/10 hover:shadow-primary-dark/20 transition-all duration-300 z-20"
              onClick={() => avatarFileRef.current.click()}
              onMouseOver={() => {
                avatarOverlay.current.style.opacity = "0.2";
              }}
              onMouseLeave={() => {
                avatarOverlay.current.style.opacity = "0";
              }}
            >
              <PiPencilLineLight
                className="text-primary-dark avatar-hover:text-primary-light"
                size={20}
              />
            </button>
          </div>

          <input
            type="file"
            ref={avatarFileRef}
            className="hidden"
            accept="image/*"
            onChange={handleAvatarSelect}
          />

          <div className="flex flex-col md:flex-row items-center gap-0">
            <h4 className="mt-2.5 text-lg md:text-2xl font-bold">
              mypopoff.com/
            </h4>
            <PopOffInput
              name="username"
              label="Your PopOff username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <article className="flex flex-col items-center gap-3 w-full max-w-xl">
            <h4 className="mt-2 text-base font-bold text-center md:text-left">
              Which category best suits your PopOff?
            </h4>
            <div className="flex flex-row items-start justify-center flex-wrap gap-2">
              {categories.map((category, index) => (
                <PopOffChip
                  key={index}
                  label={category.name}
                  icon={category.icon(index)}
                  selected={selectedCategory === index}
                  onClick={() => handleSelectCategory(index)}
                />
              ))}
            </div>
            {selectedCategory === categories.length - 1 && (
              <PopOffInput
                name="otherCategory"
                label="Other Category"
                value={formData.otherCategory}
                onChange={(event) => {
                  handleChange(event);
                  setOtherCategoryValue(event.target.value);
                }}
              />
            )}
          </article>

          <article className="flex flex-col items-center gap-3 w-full max-w-md">
            <h4 className="mt-2 text-base font-bold text-center md:text-left">
              Make your PopOff easier to find by adding some tags:
            </h4>
            <div className="flex flex-row justify-center flex-wrap gap-2">
              <PopOffChipInput />
            </div>
          </article>

          <article className="flex flex-col items-center gap-3 w-full max-w-xs">
            <h4 className="mt-2 text-base font-bold text-center md:text-left">
              Share a summary about your PopOff:
            </h4>
            <PopOffTextArea
              name="bio"
              label="Your Bio.."
              value={formData.bio}
              onChange={handleChange}
            />
          </article>
        </article>
      </section>
    </>
  );
});

export default OnBoardingFour;
