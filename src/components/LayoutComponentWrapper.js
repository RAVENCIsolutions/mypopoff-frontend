"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import {
  getLatestModified,
  getLatestSession,
  getRememberMe,
  updateLastModified,
  updateLastSession,
  updateRememberMe,
} from "@/utility/localStorageUtils";
import { processLogOut } from "@/utility/userUtils";

import { defaultUser } from "@/data/defaultUser";

const Layout01 = dynamic(() => import("@/templates/layout-01"));
const Layout02 = dynamic(() => import("@/templates/layout-02"));
const Layout03 = dynamic(() => import("@/templates/layout-03"));
const Layout04 = dynamic(() => import("@/templates/layout-04"));
// const Layout05 = dynamic(() => import("@/templates/layout-05"));
// const Layout06 = dynamic(() => import("@/templates/layout-06"));
const Layout07 = dynamic(() => import("@/templates/layout-07"));
const Layout08 = dynamic(() => import("@/templates/layout-08"));
const Layout09 = dynamic(() => import("@/templates/layout-09"));
const Layout10 = dynamic(() => import("@/templates/layout-10"));

const layoutComponents = {
  "layout-01": Layout01,
  "layout-02": Layout02,
  "layout-03": Layout03,
  "layout-04": Layout04,
  // 'layout-05' : Layout05,
  // 'layout-06' : Layout06,
  "layout-07": Layout07,
  "layout-08": Layout08,
  "layout-09": Layout09,
  "layout-10": Layout10,
};

const LayoutComponentWrapper = ({ session = null, data = defaultUser }) => {
  const [userData, setUserData] = useState(data);

  useEffect(() => {
    const remember = getRememberMe();
    const lastModified = getLatestModified();
    const latestSession = getLatestSession();

    if (session) {
      if (latestSession) {
        const timeSinceLastModified = new Date().getTime() - lastModified;
        const timeSinceLastModifiedInHours =
          timeSinceLastModified / (1000 * 60 * 60);

        if (!remember) {
          if (timeSinceLastModifiedInHours > 0.5) processLogOut().then();
        }
      } else {
        updateLastSession();
        updateLastModified();
        updateRememberMe(false);
      }
    }
  }, []);

  const LayoutComponent = layoutComponents[userData.page_layout || "layout-01"];

  return <LayoutComponent userData={userData} previewWindow={true} />;
};

export default LayoutComponentWrapper;
