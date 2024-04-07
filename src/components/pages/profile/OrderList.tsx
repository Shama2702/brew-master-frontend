"use client";

import React, { useEffect } from "react";
import useOrderStore from "@/store/orderStore";

const OrderList = () => {
  const orders = useOrderStore((state) => state.orders.data);
  const getOrders = useOrderStore((state) => state.getOrders);

  useEffect(() => {
    if (!orders.length) {
      getOrders();
    }
  }, []);

  return (
    <section className="border border-gray-300 rounded-lg p-4">
      <p className="font-semibold text-black">My Orders</p>

      <div className="mt-6 space-y-2">
        {orders.map((order) => (
          <div
            key={`order__${order._id}`}
            className="border border-gray-300 rounded-lg p-4 flex justify-between items-center"
          >
            <div className="">
              <p>ID: {order._id}</p>
              <p>{new Date(order.createdAt).toLocaleDateString()}</p>
              <p>
                {order.coffees
                  .map((item) => `${item.coffee.name} x ${item.quantity}`)
                  .join(", ")}
              </p>
              <p className="mt-1 text-sm opacity-50">
                Total: ${order.total_price}
              </p>
            </div>

            <p className="uppercase">{order.status}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderList;
