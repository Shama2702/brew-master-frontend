"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  serviceAddCoffee,
  serviceUpdateCoffee,
} from "@/services/admin.coffee.services";
import toast from "react-hot-toast";
import useMenuStore from "@/store/menuStore";
import { ICoffee } from "@/types/coffee.type";

interface IFormInput {
  name: string;
  description: string;
  price: number;
}

type Props = {
  initialData?: ICoffee;
};

const CoffeeForm = (props: Props) => {
  const { register, handleSubmit, reset, setValue } = useForm<IFormInput>();
  const fetchMenus = useMenuStore((state) => state.fetchMenus);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.initialData) {
      setValue("name", props.initialData.name);
      props.initialData.description &&
        setValue("description", props.initialData.description);
      setValue("price", props.initialData.price);
    }
  }, [props.initialData]);

  const onSubmit = async (data: IFormInput) => {
    setLoading(true);
    try {
      if (props.initialData) {
        await serviceUpdateCoffee(props.initialData._id, data);
      } else {
        await serviceAddCoffee(data);
      }
      setLoading(false);
      toast.success(props.initialData ? "Updated" : "Added");
      fetchMenus();
      if (!props.initialData) {
        reset();
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg max-w-lg mx-auto">
      <h2 className="font-semibold text-lg text-center">
        {props.initialData ? "Update coffee" : "Add new coffee"}
      </h2>

      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label htmlFor="">Name</label>
            <input
              type="text"
              {...register("name")}
              className="bg-gray-200 h-10 mt-1 px-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Price</label>
            <input
              type="number"
              {...register("price")}
              className="bg-gray-200 h-10 mt-1 px-2"
              required
              step="0.01"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Description</label>
            <textarea
              {...register("description")}
              className="bg-gray-200 h-32 mt-1 px-2"
            />
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 rounded-lg"
            >
              {loading
                ? "Loading..."
                : props.initialData
                ? "Update"
                : "Add Coffee"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CoffeeForm;
