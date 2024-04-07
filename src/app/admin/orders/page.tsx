"use client";

import React, { useEffect, useState } from "react";
import useOrderStore from "@/store/orderStore";
import { serviceUpdateOrderStatus } from "@/services/admin.order.services";
import toast from "react-hot-toast";

const AdminOrdersPage = () => {
  const { adminOrders, getAdminOrders, updateAdminOrder } = useOrderStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!adminOrders.data.length && !adminOrders.loading) {
      getAdminOrders();
    }
  }, []);

  const updateOrderStatus = async (id: string, status: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await serviceUpdateOrderStatus(id, { status });
      toast.success("Updated");
      updateAdminOrder(result);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      {adminOrders.loading ? (
        <p className="mt-4">Loading...</p>
      ) : (
        <div className="mt-4 overflow-auto">
          <table className="mt-4 w-full min-w-[800px] bg-white p-4 rounded">
            <thead>
              <tr>
                <th className="p-2">User</th>
                <th className="p-2">Items</th>
                <th className="p-2">Total</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {adminOrders.data.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="p-2">
                    <div>
                      <p>
                        {order.user.first_name} {order.user.last_name}
                      </p>
                      <p className="text-sm opacity-50">{order.user.email}</p>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="whitespace-pre-wrap">
                      {order.coffees
                        .map(
                          (coffee) =>
                            `${coffee.coffee.name} x ${coffee.quantity}`
                        )
                        .join("\n")}
                    </div>
                  </td>
                  <td className="p-2">$ {order.total_price}</td>
                  <td className="p-2">
                    <select
                      name=""
                      id=""
                      value={order.status}
                      className="border py-1 px-2 rounded outline-none"
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                      disabled={loading}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="ready">Ready</option>
                      <option value="on-the-way">On The Way</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
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

export default AdminOrdersPage;
