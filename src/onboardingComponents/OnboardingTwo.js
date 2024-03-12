"use client";

import { useEffect, useRef, useState } from "react";

import PopOffChip from "@/components/PopOffChip";
import PopOffInput from "@/components/PopOffInput";
import { categories } from "@/data/CustomisationData";
import onBoardingStore from "@/stores/OnboardingStore";
import userStore from "@/stores/UserStore";

const OnboardingTwo = () => {
  const [loadOnce, setLoadOnce] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [otherCategoryValue, setOtherCategoryValue] = useState("");

  const [chosenImage, setChosenImage] = useState(null);

  const fileRef = useRef(null);

  const handleSelectCategory = (category) => {
    const activeCategories = selectedCategories;
    const thisCategory = categories[category].name;

    if (activeCategories.includes(thisCategory)) {
      activeCategories.splice(activeCategories.indexOf(thisCategory), 1);
    } else {
      activeCategories.push(thisCategory);
    }

    let thisOtherCategory = "";

    if (!activeCategories.includes("Other..")) {
      thisOtherCategory = "";
    } else {
      thisOtherCategory = otherCategoryValue;
    }

    onBoardingStore.updateUserData({
      categories: [...activeCategories],
      otherCategory: thisOtherCategory,
    });

    setOtherCategoryValue(thisOtherCategory);
    setSelectedCategories([...activeCategories]);
  };

  useEffect(() => {
    if (
      !loadOnce &&
      onBoardingStore.userData &&
      onBoardingStore.userData.categories
    ) {
      setSelectedCategories(userStore.userData.categories || []);

      if (!userStore.userData.categories.includes("Other.."))
        setOtherCategoryValue("");

      setLoadOnce(true);
    }
  }, [onBoardingStore.userData]);

  return (
    <section
      className={`p-6 flex flex-col items-center gap-6 bg-white rounded-none sm:rounded-3xl w-full`}
    >
      <div className={`flex flex-col items-center justify-start gap-2`}>
        <h4 className={`text-sm font-bold`}>Your Avatar:</h4>
        <img
          src={
            chosenImage ||
            onBoardingStore.userData.avatar_url ||
            "/images/avatar-placeholder.jpg"
          }
          alt={"Avatar Image"}
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

      <article className="mx-auto flex flex-col items-center gap-3 w-full">
        <h4 className="mt-2 text-base font-bold text-center md:text-left">
          Which category best suits your PopOff?
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-start justify-stretch flex-wrap">
          {categories.map((category, index) => (
            <PopOffChip
              key={index}
              label={category.name}
              icon={category.icon(
                index,
                selectedCategories.includes(category.name)
              )}
              selected={selectedCategories.includes(category.name)}
              onClick={() => handleSelectCategory(index)}
            />
          ))}

          {selectedCategories.includes("Other..") && (
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
