"use client";

import { useEffect, useRef, useState } from "react";

import PopOffChip from "@/components/PopOffChip";
import PopOffInput from "@/components/PopOffInput";
import { categories } from "@/data/CustomisationData";
import { uploadAvatar } from "@/utility/dbUtils";

const OnboardingTwo = ({ session, data, setData }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [otherCategoryValue, setOtherCategoryValue] = useState("");

  const [chosenImage, setChosenImage] = useState(null);

  const fileRef = useRef(null);

  const handleSelectCategory = (category) => {
    const activeCategories = selectedCategories;
    const thisCategory = categories[category].name;
    const progressData = data;

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

    progressData.categories = activeCategories;
    progressData.otherCategory = thisOtherCategory;

    setOtherCategoryValue(progressData.otherCategory);
    setSelectedCategories([...progressData.categories]);

    setData(progressData);
  };

  useEffect(() => {
    setSelectedCategories(data.categories || []);

    if (data.categories.includes("Other..")) {
      setOtherCategoryValue(data.otherCategory);
    } else {
      setOtherCategoryValue("");
    }
  }, []);

  return (
    <section
      className={`px-3 sm:px-6 py-6 bg-white rounded-none sm:rounded-3xl w-full`}
    >
      <div className={`mb-4 grid grid-cols-1 place-items-center gap-2 w-full`}>
        <h4 className={`text-sm font-bold`}>Your Avatar:</h4>
        <img
          src={
            chosenImage || data.avatar_url || "/images/avatar-placeholder.jpg"
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
          onChange={async (e) => {
            const file = e.target.files[0];

            if (!file) {
              setChosenImage(null);
              return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
              setChosenImage(reader.result);
            };

            await uploadAvatar(session.user.id, file)
              .then((data) => {
                const progressData = data;

                progressData.avatar_url =
                  process.env.NEXT_PUBLIC_SUPABASE_AVATARS_LINK + data.path;

                setData(progressData);
              })
              .catch((e) => {
                console.log(e);
              });

            reader.readAsDataURL(file);
          }}
        />
      </div>

      <article className="mx-auto w-full max-w-lg">
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
                value={otherCategoryValue}
                onChange={(event) => {
                  const newValue = event.target.value.replace(/[^a-zA-Z]/g, "");

                  setOtherCategoryValue(newValue);

                  const progressData = data;
                  progressData.otherCategory = newValue;

                  setData(progressData);
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
