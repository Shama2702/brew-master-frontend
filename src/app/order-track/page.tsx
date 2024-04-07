"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { IOrder } from "@/types/order.type";
import { serviceGetOrder } from "@/services/order.services";

const OrderTrackPage = () => {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<IOrder>();

  const onTrackOrder = async () => {
    if (!orderId.length) {
      toast.error("Please enter a valid order id");
    }

    setLoading(true);
    try {
      const data = await serviceGetOrder(orderId);

      setOrder(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container py-4">
      <div className="border border-gray-300 rounded-lg w-fit overflow-hidden mx-auto">
        <input
          type="text"
          className="border-none bg-transparent h-10 ring-0 outline-none px-2"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button
          className="py-2 px-4 bg-green-700 text-white"
          onClick={onTrackOrder}
        >
          Track Order
        </button>
      </div>

      <div className="mt-8">
        {loading ? (
          <div>Loading...</div>
        ) : order ? (
          <div>
            <div>Order ID: {order._id}</div>
            <div className="mt-2">
              Order Status:{" "}
              <span className="uppercase bg-green-300 border border-green-500 p-2 rounded-lg font-semibold text-sm">
                {order.status}
              </span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default OrderTrackPage;
