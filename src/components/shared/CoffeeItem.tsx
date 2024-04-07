"use client";
import React from "react";
import { ICoffee } from "../../types/coffee.type";
import useCartStore from "@/store/cartStore";

type Props = {
  coffee: ICoffee;
};

const CoffeeItem = (props: Props) => {
  const { addToCart } = useCartStore();

  const onAddToCart = () => {
    addToCart(props.coffee, 1);
  };

  return (
    <div className="bg-gray-300 rounded flex flex-col h-full">
      <div className="w-full h-[250px] flex justify-center items-center">
        {props.coffee.image ? (
          <img
            src={props.coffee.image}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <i className="ri-cup-line text-7xl"></i>
        )}
      </div>
      <div className="p-4 flex-1 flex justify-between flex-col">
        <div className="">
          <p className="font-semibold text-lg">{props.coffee.name}</p>
          {props.coffee.description && (
            <p className="text-sm opacity-75">{props.coffee.description}</p>
          )}
        </div>

        <div className="mt-4">
          <span className="text-lg font-semibold">${props.coffee.price}</span>
          <button
            className="bg-black text-white px-2 py-1 rounded ml-2"
            onClick={onAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeItem;
