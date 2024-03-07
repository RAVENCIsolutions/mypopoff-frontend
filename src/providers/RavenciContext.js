"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { supabase } from "@/config/Supbase";

const RavenciContext = createContext();

export const RavenciProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session ? await supabase.auth.getUser() : null);
    };

    getSession().then(() => setIsLoaded(true));

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session ? supabase.auth.getUser() : null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe;
    };
  }, []);

  const value = {
    user,
    isLoaded,
    isSignedIn: !!user,
  };

  return (
    <RavenciContext.Provider value={value}>{children}</RavenciContext.Provider>
  );
};

export const useRavenci = () => useContext(RavenciContext);
