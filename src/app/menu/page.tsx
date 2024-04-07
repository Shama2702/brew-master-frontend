"use client";
import React, { useEffect } from "react";
import CoffeeItem from "@/components/shared/CoffeeItem";
import useMenuStore from "@/store/menuStore";

const MenuPage = () => {
  const { menus, fetchMenus } = useMenuStore((state) => state);

  useEffect(() => {
    if (!menus.data.length) {
      fetchMenus();
    }
  }, []);

  return (
    <div className="container my-6 lg:my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ">
        {menus.data.map((coffee) => (
          <CoffeeItem key={coffee._id + "_coffee"} coffee={coffee} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
