"use client";
import React, { useEffect } from "react";
import useAuthStore from "@/store/authStore";

const AppStart = () => {
  const authMe = useAuthStore((state) => state.authMe);
  const me = useAuthStore((state) => state.me);

  useEffect(() => {
    if (!me.data) {
      authMe();
    }
  }, []);

  return <></>;
};

export default AppStart;
