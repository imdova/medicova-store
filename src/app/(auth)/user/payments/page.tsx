"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CreditCard, Plus, Trash2, ChevronRight } from "lucide-react";
import Modal from "@/components/UI/Modals/DynamicModal";

type CardFormData = {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
};

const PaymentsPage = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "card_1",
      type: "VISA",
      last4: "4242",
      expiry: "05/27",
      name: "Hala Zezo",
      isDefault: true,
    },
    {
      id: "card_2",
      type: "MASTERCARD",
      last4: "5555",
      expiry: "11/25",
      name: "Hala Zezo",
      isDefault: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CardFormData>();

  const handleAddCard = (data: CardFormData) => {
    const newPaymentMethod = {
      id: `card_${Date.now()}`,
      type: data.cardNumber.startsWith("4") ? "VISA" : "MASTERCARD",
      last4: data.cardNumber.slice(-4),
      expiry: data.expiryDate,
      name: data.cardName,
      isDefault: false,
    };

    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    setShowModal(false);
    reset();
  };

  const setAsDefault = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({ ...method, isDefault: method.id === id })),
    );
  };

  const deleteCard = (id: string) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-700">Payments</h1>
      </div>

      <div className="mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Card
        </button>
      </div>

      {paymentMethods.length > 0 ? (
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4 rounded-md bg-green-50 p-2">
                    <CreditCard className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {method.type} •••• {method.last4}
                    </p>
                    <p className="text-sm text-gray-500">
                      Expires {method.expiry} • {method.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {method.isDefault ? (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                      Default
                    </span>
                  ) : (
                    <button
                      onClick={() => setAsDefault(method.id)}
                      className="text-sm text-green-600 hover:text-green-800"
                    >
                      Set as default
                    </button>
                  )}

                  <button
                    onClick={() => deleteCard(method.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <button className="text-gray-400 hover:text-gray-600">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <CreditCard className="text-2xl text-gray-400" />
          </div>
          <h2 className="mb-2 text-lg font-semibold text-gray-800">
            No saved cards
          </h2>
          <p className="mb-4 text-gray-600">
            Cards saved during the checkout process will display here.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            Add Payment Method
          </button>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add New Card"
      >
        <form onSubmit={handleSubmit(handleAddCard)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              {...register("cardNumber", {
                required: "Card number is required",
                pattern: {
                  value: /^\d{13,19}$/,
                  message: "Invalid card number",
                },
              })}
              placeholder="1234 5678 9012 3456"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-green-500"
            />
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name on Card
            </label>
            <input
              {...register("cardName", {
                required: "Cardholder name is required",
              })}
              placeholder="Hala Zezo"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-green-500"
            />
            {errors.cardName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.cardName.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Expiry Date (MM/YY)
              </label>
              <input
                {...register("expiryDate", {
                  required: "Expiry date is required",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                    message: "Invalid format (MM/YY)",
                  },
                })}
                placeholder="MM/YY"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-green-500"
              />
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.expiryDate.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                {...register("cvv", {
                  required: "CVV is required",
                  pattern: {
                    value: /^\d{3,4}$/,
                    message: "Invalid CVV",
                  },
                })}
                placeholder="123"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-green-500"
              />
              {errors.cvv && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.cvv.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
            >
              Save Card
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PaymentsPage;
