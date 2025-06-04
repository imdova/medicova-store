"use client";
import CustomAlert from "@/components/UI/CustomAlert";
import DynamicCheckbox from "@/components/UI/DynamicCheckbox";
import Image from "next/image";
import React, { useState } from "react";

type OrderItem = {
  name: string;
  image: string;
  price: number;
  quantity: number;
  reason: string;
  returnOption: string;
  selected: boolean;
};

type Order = {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
  selected: boolean;
};

const ReturnsPage = () => {
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "info" | "cart" | "wishlist";
  } | null>(null);
  // Dummy data for recent orders that can be returned
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-12345",
      date: "2025-05-15",
      items: [
        {
          name: "Wireless greentooth Earbuds",
          image:
            "https://f.nooncdn.com/p/pzsku/ZE7B062D6B7327CA2C705Z/45/_/1739718311/6609b50c-0851-41f2-9006-5d43b6e9c964.jpg?width=800",
          price: 59.99,
          quantity: 1,
          reason: "",
          returnOption: "",
          selected: false,
        },
        {
          name: "Smart Watch Series 5",
          image:
            "https://f.nooncdn.com/p/pzsku/ZE7B062D6B7327CA2C705Z/45/_/1739718311/6609b50c-0851-41f2-9006-5d43b6e9c964.jpg?width=800",
          price: 129.99,
          quantity: 1,
          reason: "",
          returnOption: "",
          selected: false,
        },
      ],
      total: 189.98,
      status: "Delivered",
      selected: false,
    },
    {
      id: "ORD-67890",
      date: "2025-05-20",
      items: [
        {
          name: "USB-C Fast Charger",
          image:
            "https://f.nooncdn.com/p/pzsku/ZE7B062D6B7327CA2C705Z/45/_/1739718311/6609b50c-0851-41f2-9006-5d43b6e9c964.jpg?width=800",
          price: 19.99,
          quantity: 2,
          reason: "",
          returnOption: "",
          selected: false,
        },
      ],
      total: 39.98,
      status: "Delivered",
      selected: false,
    },
  ]);

  const returnReasons = [
    "Changed my mind",
    "Product damaged",
    "Wrong item received",
    "Product not as described",
    "Other",
  ];

  const returnOptions = [
    "Refund to original payment",
    "noon Credit",
    "Replacement",
  ];

  const handleItemSelect = (orderIndex: number, itemIndex: number) => {
    const updatedOrders = [...orders];
    updatedOrders[orderIndex].items[itemIndex].selected =
      !updatedOrders[orderIndex].items[itemIndex].selected;

    // Update order selection status if all items are selected/deselected
    const allItemsSelected = updatedOrders[orderIndex].items.every(
      (item) => item.selected,
    );
    updatedOrders[orderIndex].selected = allItemsSelected;

    setOrders(updatedOrders);
  };

  const handleOrderSelect = (orderIndex: number) => {
    const updatedOrders = [...orders];
    const newSelectionState = !updatedOrders[orderIndex].selected;

    updatedOrders[orderIndex].selected = newSelectionState;
    updatedOrders[orderIndex].items.forEach((item) => {
      item.selected = newSelectionState;
    });

    setOrders(updatedOrders);
  };

  const handleReasonChange = (
    orderIndex: number,
    itemIndex: number,
    value: string,
  ) => {
    const updatedOrders = [...orders];
    updatedOrders[orderIndex].items[itemIndex].reason = value;
    setOrders(updatedOrders);
  };

  const handleOptionChange = (
    orderIndex: number,
    itemIndex: number,
    value: string,
  ) => {
    const updatedOrders = [...orders];
    updatedOrders[orderIndex].items[itemIndex].returnOption = value;
    setOrders(updatedOrders);
  };

  const handleSubmitReturn = (orderIndex: number) => {
    const order = orders[orderIndex];
    const selectedItems = order.items.filter((item) => item.selected);

    if (selectedItems.length === 0) {
      showAlert("Please select at least one item to return", "info");

      return;
    }

    // Validate all selected items have reason and option
    const invalidItems = selectedItems.filter(
      (item) => !item.reason || !item.returnOption,
    );

    if (invalidItems.length > 0) {
      showAlert(
        "Please select a reason and return option for all selected items",
        "info",
      );
      return;
    }

    // Here you would typically send the data to your API
    console.log("Submitting return request for order:", order.id);
    console.log("Selected items:", selectedItems);

    showAlert(
      `Return request submitted successfully for order ${order.id}`,
      "success",
    );

    // Reset the form after submission
    const updatedOrders = [...orders];
    updatedOrders[orderIndex].items.forEach((item) => {
      if (item.selected) {
        item.selected = false;
        item.reason = "";
        item.returnOption = "";
      }
    });
    updatedOrders[orderIndex].selected = false;
    setOrders(updatedOrders);
  };

  // Show Alert Function
  const showAlert = (
    message: string,
    type: "success" | "error" | "info" | "cart" | "wishlist",
  ) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000); // Hide after 3 seconds
  };

  return (
    <div>
      {/* Global Alert Display */}
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-4 text-2xl font-bold text-gray-700">
          Create a New Return
        </h1>
        <h2 className="mb-4 font-semibold text-gray-700">
          Select Order to Return
        </h2>

        <div className="space-y-6">
          {orders.map((order, orderIndex) => (
            <div key={order.id} className="rounded-lg border p-4">
              <div className="mb-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center">
                  <div className="mr-3">
                    <DynamicCheckbox
                      checked={order.selected}
                      onChange={() => handleOrderSelect(orderIndex)}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">
                      Placed on {order.date}
                    </p>
                  </div>
                </div>
                <div className="text-sm sm:text-right">
                  <p className="font-medium">
                    Total: EGP {order.total.toFixed(2)}
                  </p>
                  <p className="text-sm text-green-600">{order.status}</p>
                </div>
              </div>

              <div className="border-t pt-3">
                <h4 className="mb-2 font-medium">Items in this order</h4>
                {order.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`mb-2 flex flex-col items-start gap-3 rounded-md p-2 py-3 sm:flex-row ${item.selected ? "bg-green-50" : "border-b last:border-none"}`}
                  >
                    <div className="flex items-center pr-3">
                      <DynamicCheckbox
                        checked={item.selected}
                        onChange={() => handleItemSelect(orderIndex, itemIndex)}
                      />
                    </div>
                    <Image
                      width={80}
                      height={80}
                      src={item.image}
                      alt={item.name}
                      className="mr-4 h-20 w-20 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm">EGP {item.price.toFixed(2)}</p>

                      {item.selected && (
                        <div className="mt-2 space-y-2">
                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              Reason for return
                            </label>
                            <select
                              className="w-full rounded-md border p-2 text-sm outline-none"
                              value={item.reason}
                              onChange={(e) =>
                                handleReasonChange(
                                  orderIndex,
                                  itemIndex,
                                  e.target.value,
                                )
                              }
                              required
                            >
                              <option value="">Select a reason</option>
                              {returnReasons.map((reason) => (
                                <option key={reason} value={reason}>
                                  {reason}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              Return option
                            </label>
                            <select
                              className="w-full rounded-md border p-2 text-sm outline-none"
                              value={item.returnOption}
                              onChange={(e) =>
                                handleOptionChange(
                                  orderIndex,
                                  itemIndex,
                                  e.target.value,
                                )
                              }
                              required
                            >
                              <option value="">Select an option</option>
                              {returnOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleSubmitReturn(orderIndex)}
                  className="rounded-md bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 sm:px-6"
                >
                  Request Return for This Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-700 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Return Instructions</h2>
        <div className="prose prose-sm">
          <ul className="list-disc space-y-2 pl-5">
            <li>You have 14 days from the delivery date to request a return</li>
            <li>Items must be in original condition with all tags attached</li>
            <li>
              Refunds will be processed within 5-7 business days after we
              receive your return
            </li>
            <li>Original shipping fees are non-refundable</li>
            <li>
              For damaged or incorrect items, please contact customer support
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;
