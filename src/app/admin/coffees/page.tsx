"use client";

import React, { useEffect, useState } from "react";
import useMenuStore from "@/store/menuStore";
import Link from "next/link";
import { serviceDeleteCoffee } from "@/services/admin.coffee.services";
import toast from "react-hot-toast";

const AdminCoffeesPage = () => {
  const { menus, fetchMenus, removeMenu } = useMenuStore((state) => state);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!menus.data.length) {
      fetchMenus();
    }
  }, []);

  const onDelete = async (id: string) => {
    if (loading) return;
    setLoading(true);
    try {
      await serviceDeleteCoffee(id);
      toast.success("Deleted");
      removeMenu(id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <div className="flex justify-end">
        <Link href={`/admin/coffees/new`}>
          <button className="bg-blue-500 py-2 px-4 rounded-lg font-semibold text-white">
            Add Coffee
          </button>
        </Link>
      </div>

      {menus.loading ? (
        <p className="mt-4">Loading...</p>
      ) : (
        <div className="mt-4 overflow-auto">
          <table className="mt-4 w-full min-w-[800px] bg-white p-4 rounded">
            <thead>
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Description</th>
                <th className="p-2">Price</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menus.data.map((coffee) => (
                <tr key={coffee._id} className="border-b">
                  <td className="p-2">{coffee.name}</td>
                  <td className="p-2 w-[60%]">{coffee.description}</td>
                  <td className="p-2">{coffee.price}</td>
                  <td>
                    <Link href={`/admin/coffees/${coffee._id}`}>
                      <button className="bg-yellow-500 py-1 px-2 rounded-lg font-semibold text-white">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 py-1 px-2 rounded-lg font-semibold text-white ml-2"
                      onClick={() => onDelete(coffee._id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminCoffeesPage;
