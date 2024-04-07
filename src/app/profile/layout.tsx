import React from "react";
import AuthGuard from "@/components/AuthGuard";

const layout = (props: any) => {
  return <AuthGuard>{props.children}</AuthGuard>;
};

export default layout;
