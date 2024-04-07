"use client";
import React from "react";
import useAuthStore from "@/store/authStore";
import OrderList from "@/components/pages/profile/OrderList";
import { removeToken } from "@/helper/token";
import Link from "next/link";

const ProfilePage = () => {
  const me = useAuthStore((state) => state.me.data);

  const onLogout = () => {
    removeToken();
    try {
      window.location.reload();
    } catch (error) {}
  };

  if (!me) return <></>;
  return (
    <div className="container my-4">
      {me.is_admin && (
        <div className="flex justify-end mb-4">
          <Link href={"/admin"}>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Go to admin panel
            </button>
          </Link>
        </div>
      )}
      <section className="border border-gray-300 rounded-lg p-4 flex justify-between items-center">
        <div className="flex items-center gap-4 flex-col md:flex-row">
          <div className="w-16 h-16 rounded-full border border-solid border-black flex justify-center items-center">
            <i className="ri-user-line text-2xl"></i>
          </div>
          <div className="">
            <p className="text-lg">
              {me.first_name} {me.last_name}
            </p>
            <p className="text-sm opacity-75">{me.email}</p>
          </div>
        </div>

        <button
          className="bg-red-500 px-3 py-1 rounded border border-red-700 font-semibold text-white"
          onClick={onLogout}
        >
          Logout
        </button>
      </section>

      <div className="mt-4"></div>
      <OrderList />
    </div>
  );
};

export default ProfilePage;
