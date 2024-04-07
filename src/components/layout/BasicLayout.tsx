import React, { ReactNode } from "react";
import NavBar from "./NavBar";

const BasicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default BasicLayout;
