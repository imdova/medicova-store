"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "./DynamicModal";

type CreditCardFormData = {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  rememberCard: boolean;
};

type CreditCardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreditCardFormData) => void;
};

export default function CreditCardModal({
  isOpen,
  onClose,
  onSubmit,
}: CreditCardModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreditCardFormData>({
    defaultValues: {
      rememberCard: true,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    }
    return value;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setValue("cardNumber", formattedValue);
  };

  const handleExpiryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "expiryMonth" | "expiryYear",
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setValue(field, value.slice(0, 2));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setValue("cvv", value.slice(0, 3));
  };

  const submitHandler = async (data: CreditCardFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Payment method
          </h3>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              CARD NUMBER
            </label>
            <div className="mt-1">
              <input
                type="text"
                className={`block w-full rounded-md border outline-none ${
                  errors.cardNumber
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                } p-2 shadow-sm`}
                placeholder="**** **** **** ****"
                {...register("cardNumber", {
                  required: "Card number is required",
                  validate: (value) => {
                    const digits = value.replace(/\s/g, "");
                    return digits.length === 16 || "Invalid card number";
                  },
                })}
                onChange={handleCardNumberChange}
                maxLength={19} // 16 digits + 3 spaces
              />
              {errors.cardNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                EXPIRY DATE
              </label>
              <div className="mt-1 flex space-x-2">
                <input
                  type="text"
                  className={`block w-full rounded-md border outline-none ${
                    errors.expiryMonth
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300"
                  } p-2 shadow-sm`}
                  placeholder="MM"
                  {...register("expiryMonth", {
                    required: "Month is required",
                    validate: (value) => {
                      const month = parseInt(value, 10);
                      return (
                        (month >= 1 && month <= 12) || "Invalid month (1-12)"
                      );
                    },
                  })}
                  onChange={(e) => handleExpiryChange(e, "expiryMonth")}
                  maxLength={2}
                />
                <span className="flex items-center">/</span>
                <input
                  type="text"
                  className={`block w-full rounded-md border outline-none ${
                    errors.expiryYear
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300"
                  } p-2 shadow-sm`}
                  placeholder="YY"
                  {...register("expiryYear", {
                    required: "Year is required",
                    validate: (value) => {
                      const currentYear = new Date().getFullYear() % 100;
                      const year = parseInt(value, 10);
                      return (
                        year >= currentYear ||
                        `Year must be ${currentYear} or later`
                      );
                    },
                  })}
                  onChange={(e) => handleExpiryChange(e, "expiryYear")}
                  maxLength={2}
                />
              </div>
              {(errors.expiryMonth || errors.expiryYear) && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.expiryMonth?.message || errors.expiryYear?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  className={`block w-full rounded-md border outline-none ${
                    errors.cvv
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300"
                  } p-2 shadow-sm`}
                  placeholder="Code"
                  {...register("cvv", {
                    required: "CVV is required",
                    validate: (value) => {
                      return value.length === 3 || "CVV must be 3 digits";
                    },
                  })}
                  onChange={handleCvvChange}
                  maxLength={3}
                />
                {errors.cvv && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.cvv.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberCard"
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
              {...register("rememberCard")}
            />
            <label
              htmlFor="rememberCard"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember this card
              <span className="block text-xs text-gray-500">
                noon will securely store this card for a faster payment
                experience. CVV number will not be stored.
              </span>
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "ADD MY CARD"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
