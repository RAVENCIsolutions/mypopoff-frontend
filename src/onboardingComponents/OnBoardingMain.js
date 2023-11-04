"use client";

import { useEffect, useState } from "react";
import OnBoardingOne from "@/onboardingComponents/OnBoardingOne";

const OnBoardingMain = () => {
  const onBoardingTitle = [
    {
      id: "page-one",
      title: "Choose Layout",
    },
    { id: "page-two", title: "Choose Buttons" },
    { id: "page-three", title: "Choose Colours" },
    { id: "page-four", title: "Personalise" },
  ];

  const onBoardingPages = [
    {
      id: "page-one",
      component: <OnBoardingOne title={onBoardingTitle[0].title} />,
    },
    { id: "page-two", component: "" },
    { id: "page-three", component: "" },
    { id: "page-four", component: "" },
  ];

  const [activePage, setActivePage] = useState(null);

  useEffect(() => {
    setActivePage(onBoardingPages[0].component);
  }, []);

  return <main>'hello'</main>;
};

export default OnBoardingMain;
