"use client";

import { FC, useEffect, useState } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { X } from "lucide-react";
import Modal from "@/components/UI/Modals/DynamicModal";
import Image from "next/image";
import PhoneInput from "@/components/Forms/formFields/PhoneInput";
import Dropdown from "@/components/UI/DropDownMenu";
import { CountryDropdown } from "@/components/UI/CountryDropdown";
type Country = {
  id: string;
  code: string;
  name: string;
};
type City = {
  id: string;
  code: string;
  name: string;
};
const EGYPT_CITIES: City[] = [
  { id: "EG-cairo", code: "cairo", name: "Cairo" },
  { id: "EG-alex", code: "alex", name: "Alexandria" },
  { id: "EG-giza", code: "giza", name: "Giza" },
  { id: "EG-mansoura", code: "mansoura", name: "Mansoura" },
  { id: "EG-tanta", code: "tanta", name: "Tanta" },
  { id: "EG-zagazig", code: "zagazig", name: "Zagazig" },
  { id: "EG-ismailia", code: "ismailia", name: "Ismailia" },
  { id: "EG-asyut", code: "asyut", name: "Asyut" },
  { id: "EG-sohag", code: "sohag", name: "Sohag" },
  { id: "EG-luxor", code: "luxor", name: "Luxor" },
  { id: "EG-aswan", code: "aswan", name: "Aswan" },
  { id: "EG-beni_suef", code: "beni_suef", name: "Beni Suef" },
  { id: "EG-fayoum", code: "fayoum", name: "Fayoum" },
  { id: "EG-kafr_elsheikh", code: "kafr_elsheikh", name: "Kafr El-Sheikh" },
  { id: "EG-minya", code: "minya", name: "Minya" },
  { id: "EG-damietta", code: "damietta", name: "Damietta" },
  { id: "EG-port_said", code: "port_said", name: "Port Said" },
  { id: "EG-suez", code: "suez", name: "Suez" },
  { id: "EG-red_sea", code: "red_sea", name: "Red Sea" },
];

type AddSellerFormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  phone_code: string;
  brand_name: string;
  brand_type: string;
  country: string;
  city: string;
  address: string;
  logo: FileList | null;
};

const brandOptions = [
  { id: "all", name: "All Brands" },
  { id: "apple", name: "Apple" },
  { id: "samsung", name: "Samsung" },
  { id: "xiaomi", name: "Xiaomi" },
  { id: "huawei", name: "Huawei" },
  { id: "oppo", name: "Oppo" },
  { id: "sony", name: "Sony" },
  { id: "lg", name: "LG" },
];

const DEFAULT_COUNTRIES: Country[] = [
  // Arab Countries
  { id: "SA", code: "sa", name: "Saudi Arabia" },
  { id: "AE", code: "ae", name: "United Arab Emirates" },
  { id: "EG", code: "eg", name: "Egypt" },
  { id: "JO", code: "jo", name: "Jordan" },
  { id: "KW", code: "kw", name: "Kuwait" },
  { id: "QA", code: "qa", name: "Qatar" },
  { id: "BH", code: "bh", name: "Bahrain" },
  { id: "OM", code: "om", name: "Oman" },
  { id: "DZ", code: "dz", name: "Algeria" },
  { id: "MA", code: "ma", name: "Morocco" },
  { id: "TN", code: "tn", name: "Tunisia" },
  { id: "LB", code: "lb", name: "Lebanon" },
  { id: "IQ", code: "iq", name: "Iraq" },
  { id: "SY", code: "sy", name: "Syria" },
  { id: "YE", code: "ye", name: "Yemen" },
  { id: "SD", code: "sd", name: "Sudan" },
  { id: "PS", code: "ps", name: "Palestine" },

  // Existing Countries
  { id: "US", code: "us", name: "United States" },
  { id: "GB", code: "gb", name: "United Kingdom" },
  { id: "CA", code: "ca", name: "Canada" },
  { id: "AU", code: "au", name: "Australia" },
  { id: "IN", code: "in", name: "India" },
  { id: "JP", code: "jp", name: "Japan" },
];

type AddSellerModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

const AddSellerModal: FC<AddSellerModalProps> = ({
  isModalOpen = false,
  setIsModalOpen,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const methods = useForm<AddSellerFormData>({
    defaultValues: {
      brand_type: "all",
      country: "EG",
      city: "EG-cairo",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = methods;

  const logoFile = watch("logo");

  useEffect(() => {
    if (logoFile && logoFile.length > 0) {
      const file = logoFile[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [logoFile]);

  const onSubmit: SubmitHandler<AddSellerFormData> = (data) => {
    console.log("Brand approval submitted:", data);
    setIsModalOpen(false);
    reset();
    setPreviewImage(null);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          reset();
          setPreviewImage(null);
        }}
        title="Brand Approval Request"
        size="lg"
      >
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-h-[600px] space-y-6 overflow-y-auto"
          >
            <div className="space-y-4">
              <h2 className="mb-2 text-lg font-semibold">Contact Info</h2>
              <div className="flex gap-3">
                {/* First and Last name */}
                <div className="w-full">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name*
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="first_name"
                      {...register("first_name", {
                        required: "first name is required",
                      })}
                      placeholder="Your First name"
                      className={`block w-full rounded-md border border-gray-200 p-2 shadow-sm outline-none sm:text-sm ${
                        errors.first_name ? "border-red-300" : "border-gray-300"
                      }`}
                    />
                    {errors.first_name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.first_name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name*
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="last_name"
                      {...register("last_name", {
                        required: "last name is required",
                      })}
                      placeholder="Your last name"
                      className={`block w-full rounded-md border border-gray-200 p-2 shadow-sm outline-none sm:text-sm ${
                        errors.last_name ? "border-red-300" : "border-gray-300"
                      }`}
                    />
                    {errors.last_name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.last_name.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email*
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className={`block w-full rounded-md border border-gray-200 p-2 shadow-sm outline-none sm:text-sm ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="example@medicova.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <PhoneInput name="phone" required />
              <h2 className="mb-2 text-lg font-semibold">Seller Information</h2>

              <div className="flex gap-3">
                {/* First and Last name */}
                <div className="w-full">
                  <label
                    htmlFor="brand_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Brand name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="brand_name"
                      {...register("brand_name")}
                      placeholder="Your brand name"
                      className={`block w-full rounded-md border border-gray-200 p-2 shadow-sm outline-none sm:text-sm ${
                        errors.brand_name ? "border-red-300" : "border-gray-300"
                      }`}
                    />
                    {errors.brand_name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.brand_name.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Brand type */}
                <div className="w-full">
                  <label
                    htmlFor="brand_type"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Brand type
                  </label>
                  <Controller
                    name="brand_type"
                    control={methods.control}
                    render={({ field }) => (
                      <Dropdown
                        options={brandOptions}
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                {/* country */}
                <div className="w-full">
                  <label
                    htmlFor="country"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    country
                  </label>
                  <Controller
                    name="country"
                    control={methods.control}
                    render={({ field }) => (
                      <CountryDropdown
                        options={DEFAULT_COUNTRIES}
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    )}
                  />
                </div>
                {/* City */}
                <div className="w-full">
                  <label
                    htmlFor="brand_type"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <Controller
                    name="city"
                    control={methods.control}
                    render={({ field }) => (
                      <Dropdown
                        options={EGYPT_CITIES}
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
              {/* Address*/}
              <div className="w-full">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="address"
                    {...register("address")}
                    placeholder="2118 Thornridge Cir. Syracuse, Connecticut 35624"
                    className={`block w-full rounded-md border border-gray-200 p-2 shadow-sm outline-none sm:text-sm ${
                      errors.address ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Brand Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Brand Logo*
                </label>
                <div className="mt-1 flex items-center gap-4">
                  <label
                    htmlFor="logo"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-4 py-6 text-sm text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                  >
                    <span className="mb-2 block font-medium">Add Image</span>
                    <span className="block text-xs">PNG, JPG up to 5MB</span>
                    <input
                      id="logo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...register("logo", {
                        required: "Brand logo is required",
                        validate: {
                          fileSize: (files) =>
                            !files ||
                            files[0]?.size <= 5 * 1024 * 1024 ||
                            "File size should be less than 5MB",
                          fileType: (files) =>
                            !files ||
                            ["image/jpeg", "image/png"].includes(
                              files[0]?.type,
                            ) ||
                            "Only JPG and PNG files are allowed",
                        },
                      })}
                    />
                  </label>
                  {previewImage && (
                    <div className="relative h-24 w-24 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        width={300}
                        height={300}
                        src={previewImage}
                        alt="Brand logo preview"
                        className="h-full w-full object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          reset({ ...watch(), logo: null });
                        }}
                        className="absolute right-1 top-1 rounded-full bg-gray-800 p-0.5 text-white opacity-70 hover:opacity-100"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
                {errors.logo && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.logo.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  reset();
                  setPreviewImage(null);
                }}
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none"
              >
                Create
              </button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default AddSellerModal;
