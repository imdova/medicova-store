"use client";
import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  CheckCircle,
  XCircle,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import DynamicTable from "@/components/UI/tables/DTable";
import BrandApprovalModal from "../components/BrandApprovalModal";

// Types
type Brand = {
  id: string;
  name: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

const BrandsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // New state for brand existence check
  const [brandCheckInput, setBrandCheckInput] = useState("");
  const [brandCheckResult, setBrandCheckResult] = useState<
    "exists" | "not-exists" | null
  >(null); // null, 'exists', 'not-exists'

  const [searchParams, setSearchParams] = useState({ search: "", status: "" });

  // Sync state with URL changes
  useEffect(() => {
    const getParams = () => {
      const params = new URLSearchParams(window.location.search);
      return {
        search: params.get("search") || "",
        status: params.get("status") || "",
      };
    };

    setSearchParams(getParams());
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const getParams = () => {
        const params = new URLSearchParams(window.location.search);
        return {
          search: params.get("search") || "",
          status: params.get("status") || "",
        };
      };

      setSearchParams(getParams());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  // Mock fetch (keep existing)
  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoading(true);
      setTimeout(() => {
        const mockBrands: Brand[] = [
          {
            id: "1",
            name: "Nike",
            status: "approved",
            createdAt: "2023-01-15",
          },
          {
            id: "2",
            name: "Adidas",
            status: "approved",
            createdAt: "2023-02-20",
          },
          { id: "3", name: "Puma", status: "pending", createdAt: "2023-03-10" },
          {
            id: "4",
            name: "Reebok",
            status: "rejected",
            createdAt: "2023-04-05",
          },
          {
            id: "5",
            name: "Under Armour",
            status: "pending",
            createdAt: "2023-05-12",
          },
        ];
        setBrands(mockBrands);
        setIsLoading(false);
      }, 500);
    };
    fetchBrands();
  }, []);

  // Apply filtering (keep existing)
  useEffect(() => {
    const { search, status } = searchParams;
    let result = brands;

    if (search) {
      const term = search.toLowerCase();
      result = result.filter((brand) =>
        brand.name.toLowerCase().includes(term),
      );
    }

    if (status) {
      result = result.filter((brand) => brand.status === status);
    }

    setFilteredBrands(result);
  }, [brands, searchParams]);

  // Handle search form (keep existing)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchValue = formData.get("search") as string;

    const params = new URLSearchParams(window.location.search);
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}`,
    );
    window.dispatchEvent(new Event("popstate"));
  };

  // Handle filter (keep existing)
  const handleStatusChange = (newStatus: string) => {
    const params = new URLSearchParams(window.location.search);
    if (newStatus === "all") {
      params.delete("status");
    } else {
      params.set("status", newStatus);
    }

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}`,
    );
    window.dispatchEvent(new Event("popstate"));
  };

  // --- NEW: Handle Brand Existence Check ---
  const handleBrandCheck = () => {
    if (!brandCheckInput.trim()) {
      setBrandCheckResult(null); // Clear result if input is empty
      return;
    }

    const exists = brands.some(
      (b) => b.name.toLowerCase() === brandCheckInput.trim().toLowerCase(),
    );

    if (exists) {
      setBrandCheckResult("exists");
    } else {
      setBrandCheckResult("not-exists");
    }
  };

  const columns = [
    {
      key: "name",
      header: "Brand Name",
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      render: (item: Brand) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            item.status === "approved"
              ? "bg-green-100 text-green-800"
              : item.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      sortable: true,
    },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-900">Brand Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Brand
        </button>
      </div>

      {/* NEW: Brand Existence Check Section */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-800">
          Check if the brand you want to create already exist in Noon Brands
          list
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 p-2.5 outline-none sm:text-sm"
              placeholder="Check brand"
              value={brandCheckInput}
              onChange={(e) => {
                setBrandCheckInput(e.target.value);
                setBrandCheckResult(null); // Clear previous result on change
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevent form submission if this were part of a larger form
                  handleBrandCheck();
                }
              }}
            />
          </div>
          <button
            onClick={handleBrandCheck}
            className="inline-flex w-full items-center justify-center rounded-md bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 sm:w-auto"
          >
            Check
          </button>
        </div>
        {brandCheckResult === "exists" && (
          <p className="mt-2 flex items-center text-sm text-red-600">
            <XCircle className="mr-1 h-4 w-4" />
            Brand <span className="font-semibold">{brandCheckInput}</span>
            already exists.
          </p>
        )}
        {brandCheckResult === "not-exists" && (
          <p className="mt-2 flex items-center text-sm text-green-600">
            <CheckCircle className="mr-1 h-4 w-4" />
            Brand <span className="font-semibold">{brandCheckInput}</span> is
            available.
          </p>
        )}
      </div>

      {/* Existing Search and Filter Section */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="search"
                defaultValue={searchParams.search}
                className="block w-full rounded-md border-gray-300 p-2 pl-10 outline-none sm:text-sm"
                placeholder="Search brands..."
              />
            </div>
          </form>

          <div className="flex items-center gap-2">
            <select
              value={searchParams.status || "all"}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="rounded-md border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Existing Dynamic Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <DynamicTable
          data={filteredBrands}
          columns={columns}
          pagination
          itemsPerPage={5}
          selectable
          emptyMessage={
            isLoading
              ? "Loading brands..."
              : "No brands found matching your criteria"
          }
          actions={[
            {
              label: "Edit",
              onClick: () => console.log("Edited"),
              className:
                "bg-white text-gray-700 hover:text-blue-700 hover:bg-blue-50 ",
              icon: <PencilIcon className="h-4 w-4" />,
            },
            {
              label: "Delete",
              onClick: () => console.log("Deleted"),
              className:
                "bg-white text-gray-700 hover:text-red-700 hover:bg-red-50 ",
              icon: <TrashIcon className="h-4 w-4" />,
            },
          ]}
        />
      </div>
      <BrandApprovalModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default BrandsPage;
