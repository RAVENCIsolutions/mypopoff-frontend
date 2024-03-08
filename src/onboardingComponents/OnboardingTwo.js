"use client";

import { useEffect, useRef, useState } from "react";

import PopOffChip from "@/components/PopOffChip";
import PopOffInput from "@/components/PopOffInput";
import { categories } from "@/data/CustomisationData";
import onBoardingStore from "@/stores/OnboardingStore";

const OnboardingTwo = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [otherCategoryValue, setOtherCategoryValue] = useState("");

  const [chosenImage, setChosenImage] = useState(null);
  const [chosenFile, setChosenFile] = useState(null);

  const fileRef = useRef(null);
  const userData = onBoardingStore.userData;

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    onBoardingStore.updateUserData({
      category: categories[category].name,
      otherCategory: category < categories.length - 1 ? "" : otherCategoryValue,
    });
  };

  useEffect(() => {
    if (userData.category === "Other..")
      setOtherCategoryValue(userData.otherCategory);

    const getCategory = categories.findIndex(
      (category) => userData.category === category.name
    );

    if (getCategory !== -1) {
      setSelectedCategory(getCategory);
    }
  }, []);

  return (
    <section
      className={`p-6 flex flex-col items-center gap-6 bg-white rounded-3xl w-full`}
    >
      <div className={`flex flex-col items-center justify-start gap-2`}>
        <h4 className={`text-sm font-bold`}>Your Avatar:</h4>
        <img
          src={
            chosenImage ||
            userData.avatar_url ||
            "/images/avatar-placeholder.jpg"
          }
          alt={"Landing Page Image"}
          className={`w-20 h-20 border border-primary-dark/20 rounded-full object-cover shadow-xl shadow-primary-dark/10 overflow-hidden transition-all duration-300`}
          onClick={() => fileRef.current.click()}
        />

        <input
          ref={fileRef}
          type="file"
          id={"Your image"}
          name={"chosen-image"}
          className={`hidden`}
          accept={"image/*"}
          multiple={false}
          onChange={(e) => {
            const file = e.target.files[0];

            if (!file) {
              setChosenImage(null);
              return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
              setChosenImage(reader.result);
            };

            onBoardingStore.setAvatar(file);

            reader.readAsDataURL(file);
          }}
        />
      </div>

      <article className="mx-auto flex flex-col items-center gap-3 w-full max-w-md">
        <h4 className="mt-2 text-base font-bold text-center md:text-left">
          Which category best suits your PopOff?
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-stretch flex-wrap">
          {categories.map((category, index) => (
            <PopOffChip
              key={index}
              label={category.name}
              icon={category.icon(index, selectedCategory)}
              selected={selectedCategory === index}
              onClick={() => handleSelectCategory(index)}
            />
          ))}

          {selectedCategory === categories.length - 1 && (
            <div className={`my-3`}>
              <PopOffInput
                name="otherCategory"
                label="Other Category*"
                value={onBoardingStore.userData.otherCategory}
                onChange={(event) => {
                  setOtherCategoryValue(
                    event.target.value.replace(/[^a-zA-Z]/g, "")
                  );

                  onBoardingStore.updateUserData({
                    otherCategory: event.target.value,
                  });
                }}
              />
            </div>
          )}
        </div>
      </article>
    </section>
  );
};

export default OnboardingTwo;
