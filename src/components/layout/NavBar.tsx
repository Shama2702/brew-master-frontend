"use client";
import Link from "next/link";
import React from "react";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const { cart } = useCartStore();
  const { me } = useAuthStore();
  const pathname = usePathname();

  const isAdminPath = pathname.includes("/admin");

  return (
    <header className="bg-gray-400 py-2 h-[60px] lg:h-[90px] flex flex-col justify-center">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href={"/"} className="">
            <i className="ri-cup-line mr-2 text-base lg:text-3xl"></i>
            <span className="text-sm lg:text-2xl">BrewMaster</span>
          </Link>
          {isAdminPath ? (
            <div className="flex items-center gap-2">
              <Link href={"/admin/coffees"}>Coffees</Link>
              <Link href={"/admin/orders"}>Orders</Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href={"/menu"}>Menu</Link>
              {me.data ? (
                <Link href={"/profile"}>Profile</Link>
              ) : (
                <Link href={"/login"}>Login</Link>
              )}
              <Link href={"/cart"}>
                <div className="relative">
                  <div className="w-4 h-4 absolute top-0 right-0 rounded-full bg-white text-xs flex justify-center items-center">
                    {cart.length}
                  </div>
                  <i className="ri-shopping-cart-line text-2xl pr-2"></i>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
