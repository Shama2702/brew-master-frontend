"use client";

import React, { useState } from "react";
import useCartStore from "@/store/cartStore";
import useOrderStore from "@/store/orderStore";
import useAuthStore from "@/store/authStore";
import { serviceCreateOrder } from "@/services/order.services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const router = useRouter();
  const { cart, removeFromCart, clearCart } = useCartStore();
  const getOrders = useOrderStore((state) => state.getOrders);
  const me = useAuthStore((state) => state.me.data);
  const [loading, setLoading] = useState(false);

  const onCheckout = async () => {
    if (!me) {
      toast.error("Please login to continue checkout");
      return;
    }
    setLoading(true);
    const orderData = {
      coffees: cart.map((item) => ({
        coffee: item.coffee._id,
        quantity: item.quantity,
      })),
    };
    try {
      await serviceCreateOrder(orderData);
      setLoading(false);
      toast.success("Order created");
      clearCart();
      getOrders();
      router.push("/profile");
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="container my-6 lg:my-10">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center ">
          <i className="ri-shopping-cart-line text-2xl"></i>
          <p className="text-lg">Cart is empty</p>
        </div>
      ) : (
        <section className="max-w-lg mx-auto">
          <h1 className="text-2xl font-semibold">Cart</h1>
          <div className="mt-4">
            {cart.map((item) => (
              <div
                key={item.coffee._id}
                className="flex justify-between items-center border-b border-gray-300 py-2"
              >
                <div className="flex items-center gap-4">
                  <i className="ri-cup-line text-2xl"></i>
                  <div>
                    <p className="font-semibold">{item.coffee.name}</p>
                    <p className="text-sm opacity-75">
                      {item.quantity} x ${item.coffee.price}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    className="text-red-500"
                    onClick={() => removeFromCart(item.coffee._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              className="bg-gray-500 px-4 py-2 text-white rounded-md"
              onClick={onCheckout}
              disabled={loading}
            >
              {loading ? "Loading..." : "Checkout"}
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default CartPage;
