"use client";

import { observer } from "mobx-react";
import { useEffect, useState } from "react";

import onBoardingStore from "@/stores/OnboardingStore";
import { getFromStorage } from "@/utility/localStorageUtils";

const UpdateOnBoardingStorage = observer(() => {
  const [dataHasBeenUpdated, setDataHasBeenUpdated] = useState(false);

  useEffect(() => {
    if (onBoardingStore.readyForOnboarding && !dataHasBeenUpdated) {
      onBoardingStore.setUserData(getFromStorage("userData"));
      setDataHasBeenUpdated(true);
    }
  }, []);
});

export default UpdateOnBoardingStorage;
