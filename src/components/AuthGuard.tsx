"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

type Props = {
  children: React.ReactNode;
  admin?: boolean;
};

const AuthGuard = (props: Props) => {
  const router = useRouter();
  const me = useAuthStore((state) => state.me);

  useEffect(() => {
    if (!me.data && !me.loading) {
      router.replace("/login");
    }
  }, [me]);

  if (me.loading) {
    return <div className="p-4 container">Authenticating...</div>;
  }

  if (props.admin) {
    if (me.data?.is_admin) {
      return <>{props.children}</>;
    } else {
      return (
        <div className="p-4 container">
          You are not authorized to view this page
        </div>
      );
    }
  }

  if (me.data) {
    return <>{props.children}</>;
  }

  return null;
};

export default AuthGuard;
