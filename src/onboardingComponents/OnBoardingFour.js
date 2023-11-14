"use client";

import { useEffect, useRef, useState } from "react";
import { Chip, CircularProgress, TextField } from "@mui/material";
import PopOffInput from "@/components/PopOffInput";
import { TwitterPicker } from "react-color";
import ColourPickerBlock from "@/components/ColourPickerBlock";
import { observer } from "mobx-react";
import onBoardingStore from "@/stores/OnBoardingStore";
import { onBoardingButtons } from "@/data/OnBoardingButtons";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import { TiPencil } from "react-icons/ti";
import {
  PiAirplaneTilt,
  PiBarbell,
  PiBriefcase,
  PiDevices,
  PiGraduationCap,
  PiMaskHappy,
  PiNewspaperClipping,
  PiPaintBrushBroad,
  PiPaintBrushHousehold,
  PiPencilLineLight,
  PiSword,
} from "react-icons/pi";
import { IoFitnessOutline } from "react-icons/io5";
import CategoryChip from "@/components/CategoryChip";
import styled from "@emotion/styled";

const OnBoardingFour = observer(() => {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    profile: "",
    categories: {},
    tags: [],
    bio: "",
  });

  const avatarOverlay = useRef(null);

  const handleChange = (event) => {
    console.log(event);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const categories = [
    {
      name: "Business and Corporate",
      icon: (index) => (
        <PiBriefcase color={selectedCategory === index ? "white" : "#202224"} />
      ),
    },
    {
      name: "Creative",
      icon: (index) => (
        <PiPaintBrushHousehold
          color={selectedCategory === index ? "white" : "#202224"}
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
        <PiMaskHappy color={selectedCategory === index ? "white" : "#202224"} />
      ),
    },
    {
      name: "Gaming",
      icon: (index) => (
        <PiSword color={selectedCategory === index ? "white" : "#202224"} />
      ),
    },
    {
      name: "Health and Fitness",
      icon: (index) => (
        <PiBarbell color={selectedCategory === index ? "white" : "#202224"} />
      ),
    },
    {
      name: "News and Media",
      icon: (index) => (
        <PiNewspaperClipping
          color={selectedCategory === index ? "white" : "#202224"}
        />
      ),
    },
    {
      name: "Technology",
      icon: (index) => (
        <PiDevices color={selectedCategory === index ? "white" : "#202224"} />
      ),
    },
    {
      name: "Travel",
      icon: (index) => (
        <PiAirplaneTilt
          color={selectedCategory === index ? "white" : "#202224"}
        />
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);

    setLoading(false);
  }, []);

  return (
    <>
      <section className="relative mt-5 mb-10 self-start flex flex-col md:flex-row items-stretch justify-between">
        <article className="pt-10 px-5 pb-10 flex flex-col items-center gap-8 rounded-none md:rounded-3xl w-full bg-white shadow-lg shadow-dashboard-primary-dark/10">
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

          <div className="flex items-center gap-0">
            <h4 className="mt-2.5 text-2xl font-bold">mypopoff.com/</h4>
            <PopOffInput
              className=" transition-all duration-300"
              name="username"
              label="Your PopOff username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <article className="flex flex-col items-center gap-3 w-full max-w-md">
            <h4 className="mt-2 text-base font-bold">
              Which category best suits your PopOff?
            </h4>
            <div className="flex flex-row justify-center flex-wrap gap-2">
              {categories.map((category, index) => (
                <Chip
                  key={index}
                  label={category.name}
                  icon={category.icon(index)}
                  onClick={() => handleSelectCategory(index)}
                  className={`pl-1 shadow-primary-dark/10 transition-all duration-300 ${
                    selectedCategory === index
                      ? "bg-action text-white shadow-none"
                      : "text-primary-dark shadow-lg"
                  }`}
                />
              ))}
            </div>
          </article>

          <article className="flex flex-col items-center gap-3 w-full max-w-md">
            <h4 className="mt-2 text-base font-bold">
              Make your PopOff easier to find by adding some tags:
            </h4>
            <div className="flex flex-row justify-center flex-wrap gap-2"></div>
          </article>

          <article className="flex flex-col items-center gap-3 w-full max-w-xs">
            <h4 className="mt-2 text-base font-bold">
              Share a summary about your PopOff:
            </h4>
            <TextField
              id="standard-multiline-static"
              label="Your bio..."
              helperText=""
              multiline
              fullWidth
              rows={4}
              variant="standard"
              inputProps={{ className: "text-sm placeholder:text-sm" }}
            />
          </article>
        </article>
      </section>
    </>
  );
});

export default OnBoardingFour;
