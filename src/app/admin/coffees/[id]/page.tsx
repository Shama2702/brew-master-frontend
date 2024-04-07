"use client";

import React, { useEffect, useMemo } from "react";
import useMenuStore from "@/store/menuStore";
import CoffeeForm from "@/components/admin/CoffeeForm";

const CoffeeEditPage = ({ params }: any) => {
  const coffeeId = params.id;
  const { menus, fetchMenus } = useMenuStore((state) => state);

  useEffect(() => {
    if (!menus.data.length) {
      fetchMenus();
    }
  }, []);

  const selectedCoffee = useMemo(() => {
    return menus.data.find((coffee) => coffee._id === coffeeId);
  }, [menus.data, coffeeId]);

  return (
    <div className="container py-4">
      {!selectedCoffee ? (
        <div>Loading...</div>
      ) : (
        <CoffeeForm initialData={selectedCoffee} />
      )}
    </div>
  );
};

export default CoffeeEditPage;
