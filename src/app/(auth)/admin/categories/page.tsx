"use client";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { PencilIcon, Search, TrashIcon } from "lucide-react";
import DynamicTable from "@/components/UI/tables/DTable";
import Image from "next/image";
import ImageUpload from "@/components/UI/ImageUpload";
import Dropdown from "@/components/UI/DropDownMenu";
import StatusToggle from "@/components/UI/Buttons/StatusToggle";

type FormData = {
  name: string;
  parentCategory: string;
  priority: number;
  logo: FileList | null;
};

type BrandFormData = {
  name: string;
  category: string;
  priority: number;
  logo: FileList | null;
};

type Category = {
  id: string;
  image: string;
  name: string;
  date: string;
  products: number;
  orders: number;
  totalSales: string;
  status: "active" | "inactive";
  isActive: boolean;
};

type SubCategory = {
  id: string;
  name: string;
  parentCategory: string;
  date: string;
  products: number;
  orders: number;
  totalSales: string;
  status: "active" | "inactive";
  isActive: boolean;
};

type Brand = {
  id: string;
  logo: string;
  name: string;
  date: string;
  products: number;
  orders: number;
  totalSales: string;
  status: "active" | "inactive";
  isActive: boolean;
};

const CategoryBrandSetup = () => {
  const [activeTab, setActiveTab] = useState<
    "categories" | "subCategories" | "brands"
  >("categories");
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize with sample data
  useEffect(() => {
    const sampleCategories: Category[] = [
      {
        id: "1",
        image: "/images/landau.jpg",
        name: "Electronics",
        date: "15/5/2025",
        products: 450,
        orders: 500,
        totalSales: "150K EGP",
        status: "active",
        isActive: true,
      },
      {
        id: "2",
        image: "/images/landau.jpg",
        name: "Clothing",
        date: "15/5/2025",
        products: 450,
        orders: 500,
        totalSales: "150K EGP",
        status: "active",
        isActive: true,
      },
      {
        id: "3",
        image: "/images/landau.jpg",
        name: "Home & Garden",
        date: "15/5/2025",
        products: 450,
        orders: 500,
        totalSales: "150K EGP",
        status: "active",
        isActive: true,
      },
    ];

    const sampleSubCategories: SubCategory[] = [
      {
        id: "1",
        name: "Smartphones",
        parentCategory: "Electronics",
        date: "15/5/2025",
        products: 120,
        orders: 150,
        totalSales: "50K EGP",
        status: "active",
        isActive: true,
      },
      {
        id: "2",
        name: "Laptops",
        parentCategory: "Electronics",
        date: "15/5/2025",
        products: 80,
        orders: 90,
        totalSales: "40K EGP",
        status: "active",
        isActive: false,
      },
      {
        id: "3",
        name: "Men's Wear",
        parentCategory: "Clothing",
        date: "15/5/2025",
        products: 200,
        orders: 180,
        totalSales: "60K EGP",
        status: "active",
        isActive: false,
      },
    ];

    const sampleBrands: Brand[] = [
      {
        id: "1",
        logo: "/images/landau.jpg",
        name: "Landau",
        date: "15/5/2025",
        products: 450,
        orders: 500,
        totalSales: "150K EGP",
        status: "active",
        isActive: true,
      },
      {
        id: "2",
        logo: "/images/landau.jpg",
        name: "Nike",
        date: "15/5/2025",
        products: 320,
        orders: 400,
        totalSales: "120K EGP",
        status: "active",
        isActive: true,
      },
      {
        id: "3",
        logo: "/images/landau.jpg",
        name: "Apple",
        date: "15/5/2025",
        products: 280,
        orders: 350,
        totalSales: "200K EGP",
        status: "active",
        isActive: false,
      },
    ];

    setCategories(sampleCategories);
    setSubCategories(sampleSubCategories);
    setBrands(sampleBrands);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  const categoryColumns = [
    {
      key: "image",
      header: "Category Image",
      render: (item: Category) => (
        <Image
          width={200}
          height={200}
          src={item.image}
          alt={item.name}
          className="h-10 w-10 rounded-md object-cover"
        />
      ),
    },
    { key: "name", header: "Category Name" },
    { key: "date", header: "Date" },
    { key: "products", header: "Products" },
    { key: "orders", header: "Orders" },
    { key: "totalSales", header: "Total Sales" },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (item: Category) => {
        const currentStatus = item.isActive;
        const handleStatusChange = (newStatus: boolean) => {
          console.log(
            `Status changed to: ${newStatus ? "Active" : "Inactive"}`,
          );
        };
        return (
          <StatusToggle
            initialStatus={currentStatus}
            onToggle={handleStatusChange}
          />
        );
      },
    },
  ];

  const subCategoryColumns = [
    { key: "name", header: "Sub Category Name" },
    { key: "parentCategory", header: "Parent Category" },
    { key: "date", header: "Date" },
    { key: "products", header: "Products" },
    { key: "orders", header: "Orders" },
    { key: "totalSales", header: "Total Sales" },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (item: SubCategory) => {
        const currentStatus = item.isActive;
        const handleStatusChange = (newStatus: boolean) => {
          console.log(
            `Status changed to: ${newStatus ? "Active" : "Inactive"}`,
          );
        };
        return (
          <StatusToggle
            initialStatus={currentStatus}
            onToggle={handleStatusChange}
          />
        );
      },
    },
  ];

  const brandColumns = [
    {
      key: "logo",
      header: "Brand Logo",
      render: (item: Brand) => (
        <Image
          width={200}
          height={200}
          src={item.logo}
          alt={item.name}
          className="h-10 w-10 rounded-md object-cover"
        />
      ),
    },
    { key: "name", header: "Brand Name" },
    { key: "date", header: "Date" },
    { key: "products", header: "Products" },
    { key: "orders", header: "Orders" },
    { key: "totalSales", header: "Total Sales" },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (item: Brand) => {
        const currentStatus = item.isActive;
        const handleStatusChange = (newStatus: boolean) => {
          console.log(
            `Status changed to: ${newStatus ? "Active" : "Inactive"}`,
          );
        };
        return (
          <StatusToggle
            initialStatus={currentStatus}
            onToggle={handleStatusChange}
          />
        );
      },
    },
  ];

  const parentCategoryOptions = [
    { id: "", name: "Select Parent Category" },
    ...categories.map((cat) => ({ id: cat.id, name: cat.name })),
  ];

  const {
    register: registerCategory,
    handleSubmit: handleCategorySubmit,
    reset: resetCategoryForm,
    formState: { errors: categoryErrors },
  } = useForm<FormData>();

  const {
    register: registerSubCategory, // New register for sub-category form
    handleSubmit: handleSubCategorySubmit, // New handleSubmit for sub-category form
    control,
    reset: resetSubCategoryForm, // New reset for sub-category form
    formState: { errors: subCategoryErrors }, // New errors for sub-category form
  } = useForm<FormData>();

  const {
    register: registerBrand,
    handleSubmit: handleBrandSubmit,
    reset: resetBrandForm,
    formState: { errors: brandErrors },
  } = useForm<BrandFormData>();

  const onSubmitCategory = (data: FormData) => {
    console.log("Category submitted:", data);
    resetCategoryForm();
  };

  const onSubmitSubCategory = (data: FormData) => {
    console.log("Sub Category submitted:", data);
    resetSubCategoryForm();
  };

  const onSubmitBrand = (data: BrandFormData) => {
    console.log("Brand submitted:", data);
    resetBrandForm();
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-2 py-4 shadow-sm">
      <div className="mb-8">
        <div className="flex justify-start border-b border-gray-200">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "categories"
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("categories")}
          >
            Categories
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "subCategories"
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("subCategories")}
          >
            Sub Categories
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "brands"
                ? "border-b-2 border-green-500 text-green-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("brands")}
          >
            Brands
          </button>
        </div>
      </div>

      {activeTab === "categories" && (
        <>
          {/* Category Setup Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 p-3">
              <Image
                className="w-6"
                src="/icons/category.png"
                width={200}
                height={200}
                alt="categoy icon"
              />
              <h2 className="text-xl font-semibold">Category Setup</h2>
            </div>
            <div className="p-3">
              <form onSubmit={handleCategorySubmit(onSubmitCategory)}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
                  <div className="md:col-span-3">
                    <div className="mb-4">
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Category Name* (EN)
                      </label>
                      <input
                        type="text"
                        className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none ${
                          categoryErrors.name
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="New Category"
                        {...registerCategory("name", {
                          required: "Category name is required",
                        })}
                      />
                      {categoryErrors.name && (
                        <p className="mt-1 text-xs text-red-600">
                          {categoryErrors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Priority
                      </label>
                      <input
                        type="number"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none"
                        placeholder="Set Priority"
                        {...registerCategory("priority", {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <ImageUpload
                      name="logo"
                      register={registerCategory}
                      errors={categoryErrors}
                      label="Category Logo"
                      required
                      aspectRatio="1:1"
                      maxSizeMB={2}
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => resetCategoryForm()}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Categories Table */}
          <div className="border-t border-gray-200">
            <div className="border-b border-gray-200 p-3">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-medium">All Categories</h3>
                  <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">
                    {categories.length}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3 sm:flex-row">
                  <div className="flex flex-1">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by category name..."
                        className="w-full rounded-s-md border border-r-0 border-gray-300 px-3 py-1.5 pl-10 outline-none placeholder:text-sm"
                      />
                      <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                        size={15}
                      />
                    </div>
                    <button
                      onClick={handleSearch}
                      className="rounded-e-md bg-light-primary px-3 py-1.5 text-sm text-white hover:brightness-90"
                    >
                      Search
                    </button>
                  </div>

                  <button className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none sm:w-fit">
                    Download
                  </button>
                </div>
              </div>
            </div>
            <div>
              <DynamicTable
                data={categories}
                columns={categoryColumns}
                minWidth={800}
                pagination={true}
                itemsPerPage={5}
                actions={[
                  {
                    label: "Edit",
                    onClick: () => console.log("edited"),
                    className:
                      "bg-white text-gray-700 hover:text-blue-700 hover:bg-blue-50",
                    icon: <PencilIcon className="h-4 w-4" />,
                  },
                  {
                    label: "Delete",
                    onClick: () => console.log("Deleted"),
                    className:
                      "bg-white text-gray-700 hover:text-red-700 hover:bg-red-50",
                    icon: <TrashIcon className="h-4 w-4" />,
                  },
                ]}
                solidActions={[
                  {
                    onClick: () => console.log("edited"),
                    icon: <PencilIcon className="h-4 w-4" />,
                    color: "#2563eb",
                  },
                  {
                    onClick: () => console.log("Deleted"),
                    color: "#dc2626",
                    icon: <TrashIcon className="h-4 w-4" />,
                  },
                ]}
              />
            </div>
          </div>
        </>
      )}

      {activeTab === "subCategories" && (
        <>
          {/* Sub Category Setup Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 p-3">
              <Image
                className="w-6"
                src="/icons/category.png"
                width={200}
                height={200}
                alt="categoy icon"
              />
              <h2 className="text-xl font-semibold">Sub Category Setup</h2>
            </div>
            <div className="p-3">
              <form onSubmit={handleSubCategorySubmit(onSubmitSubCategory)}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Sub Category Name* (EN)
                    </label>
                    <input
                      type="text"
                      className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none ${
                        subCategoryErrors.name
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="New Sub Category"
                      {...registerSubCategory("name", {
                        required: "Sub Category name is required",
                      })}
                    />
                    {subCategoryErrors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {subCategoryErrors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Parent Category
                    </label>
                    <Controller
                      name="parentCategory"
                      control={control}
                      rules={{ required: "Parent category is required" }}
                      render={({ field, fieldState }) => (
                        <div>
                          <Dropdown
                            options={parentCategoryOptions}
                            selected={field.value}
                            onSelect={(value) => {
                              field.onChange(value || ""); // or undefined, depending on how your form handles unselected
                            }}
                            placeholder="Choose Parent Category"
                          />
                          {fieldState.error && (
                            <p className="mt-1 text-sm text-red-600">
                              {fieldState.error.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                    {subCategoryErrors.parentCategory && (
                      <p className="mt-1 text-sm text-red-600">
                        {subCategoryErrors.parentCategory.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Priority
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none"
                      placeholder="Set Priority"
                      {...registerSubCategory("priority", {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => resetSubCategoryForm()}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sub Categories Table */}
          <div>
            <div className="border-t border-gray-200 p-3">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-medium">All Sub Categories</h3>
                  <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">
                    {subCategories.length}
                  </span>
                </div>
                <div className="flex flex-1 flex-col items-center gap-3 sm:flex-row">
                  <div className="flex flex-1">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by category and subcategories..."
                        className="w-full rounded-s-md border border-r-0 border-gray-300 px-3 py-1.5 pl-10 text-sm outline-none placeholder:text-sm"
                      />
                      <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                        size={15}
                      />
                    </div>
                    <button
                      onClick={handleSearch}
                      className="rounded-e-md bg-light-primary px-3 py-1.5 text-sm text-white hover:brightness-90"
                    >
                      Search
                    </button>
                  </div>

                  <button className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none sm:w-fit">
                    Download
                  </button>
                </div>
              </div>
            </div>
            <div>
              <DynamicTable
                data={subCategories}
                columns={subCategoryColumns}
                minWidth={800}
                pagination={true}
                itemsPerPage={5}
                actions={[
                  {
                    label: "Edit",
                    onClick: () => console.log("edited"),
                    className:
                      "bg-white text-gray-700 hover:text-blue-700 hover:bg-blue-50",
                    icon: <PencilIcon className="h-4 w-4" />,
                  },
                  {
                    label: "Delete",
                    onClick: () => console.log("Deleted"),
                    className:
                      "bg-white text-gray-700 hover:text-red-700 hover:bg-red-50",
                    icon: <TrashIcon className="h-4 w-4" />,
                  },
                ]}
                solidActions={[
                  {
                    onClick: () => console.log("edited"),
                    icon: <PencilIcon className="h-4 w-4" />,
                    color: "#2563eb",
                  },
                  {
                    onClick: () => console.log("Deleted"),
                    color: "#dc2626",
                    icon: <TrashIcon className="h-4 w-4" />,
                  },
                ]}
              />
            </div>
          </div>
        </>
      )}

      {activeTab === "brands" && (
        <>
          {/* Brand Setup Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 p-3">
              <Image
                className="w-6"
                src="/icons/category.png"
                width={200}
                height={200}
                alt="categoy icon"
              />
              <h2 className="text-xl font-semibold">Brand Setup</h2>
            </div>
            <div className="p-3">
              <form onSubmit={handleBrandSubmit(onSubmitBrand)}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
                  <div className="md:col-span-3">
                    {" "}
                    <div className="mb-4">
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Brand Name* (EN)
                      </label>
                      <input
                        type="text"
                        className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none ${
                          brandErrors.name
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="New Brand"
                        {...registerBrand("name", {
                          required: "Brand name is required",
                        })}
                      />
                      {brandErrors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {brandErrors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Priority
                      </label>
                      <input
                        type="number"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none"
                        placeholder="Set Priority"
                        {...registerBrand("priority", { valueAsNumber: true })}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <ImageUpload
                      name="logo"
                      register={registerBrand}
                      errors={brandErrors}
                      label="Brand Logo"
                      required
                      aspectRatio="1:1"
                      maxSizeMB={2}
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => resetBrandForm()}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Brands Table */}
          <div>
            <div className="border-t border-gray-200 p-3">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-medium">All Brands</h3>
                  <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">
                    {brands.length}
                  </span>
                </div>{" "}
                <div className="flex flex-1 flex-col items-center gap-3 sm:flex-row">
                  <div className="flex flex-1">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by category and subcategories..."
                        className="w-full rounded-s-md border border-r-0 border-gray-300 px-3 py-1.5 pl-10 outline-none placeholder:text-sm"
                      />
                      <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                        size={15}
                      />
                    </div>
                    <button
                      onClick={handleSearch}
                      className="rounded-e-md bg-light-primary px-3 py-1.5 text-sm text-white hover:brightness-90"
                    >
                      Search
                    </button>
                  </div>

                  <button className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none sm:w-fit">
                    Download
                  </button>
                </div>
              </div>
            </div>
            <div>
              <DynamicTable
                data={brands}
                columns={brandColumns}
                minWidth={800}
                pagination={true}
                itemsPerPage={5}
                actions={[
                  {
                    label: "Edit",
                    onClick: () => console.log("edited"),
                    className:
                      "bg-white text-gray-700 hover:text-blue-700 hover:bg-blue-50",
                    icon: <PencilIcon className="h-4 w-4" />,
                  },
                  {
                    label: "Delete",
                    onClick: () => console.log("Deleted"),
                    className:
                      "bg-white text-gray-700 hover:text-red-700 hover:bg-red-50",
                    icon: <TrashIcon className="h-4 w-4" />,
                  },
                ]}
                solidActions={[
                  {
                    onClick: () => console.log("edited"),
                    icon: <PencilIcon className="h-4 w-4" />,
                    color: "#2563eb",
                  },
                  {
                    onClick: () => console.log("Deleted"),
                    color: "#dc2626",
                    icon: <TrashIcon className="h-4 w-4" />,
                  },
                ]}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryBrandSetup;
