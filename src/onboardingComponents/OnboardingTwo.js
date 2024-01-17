"use client";

import { useState } from "react";
import PopOffInput from "@/components/PopOffInput";
import PopOffChip from "@/components/PopOffChip";
import { categories } from "@/data/CustomisationData";

const OnboardingTwo = (props) => {
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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAvatarSelect = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedAvatar(file);
    }
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

  return (
    <section className={`p-6 flex flex-col bg-white rounded-3xl w-full`}>
      <input
        type="file"
        // ref={avatarFileRef}
        className="hidden"
        accept="image/*"
        onChange={handleAvatarSelect}
      />

      <div className="flex flex-col md:flex-row items-center gap-0">
        <h4 className="mt-2.5 text-lg md:text-2xl font-bold">mypopoff.com/</h4>
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
        <div className="flex flex-row items-start justify-center flex-wrap">
          {categories.map((category, index) => (
            <PopOffChip
              key={index}
              label={category.name}
              icon={category.icon(index, selectedCategory)}
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
    </section>
  );
};

export default OnboardingTwo;
