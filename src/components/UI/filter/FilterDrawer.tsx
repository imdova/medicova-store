"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Drawer } from "../Drawer";
import DynamicCheckbox from "../DynamicCheckbox";

type FilterOption = {
  id: string;
  label: string;
  count?: number;
};

type FilterGroup = {
  id: string;
  label: string;
  options: FilterOption[];
  collapsed?: boolean;
  isSingleSelect?: boolean; // New property to control selection behavior
};

export const Filters = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterGroup[]>([
    {
      id: "sellerStatus",
      label: "Seller Status",
      isSingleSelect: true, // This group will be single select
      options: [
        { id: "active", label: "Active", count: 42 },
        { id: "inactive", label: "Inactive", count: 8 },
      ],
      collapsed: false,
    },
    {
      id: "stock",
      label: "Stock",
      isSingleSelect: true, // This group will be single select
      options: [
        { id: "inStock", label: "In stock", count: 35 },
        { id: "outOfStock", label: "Out of Stock", count: 15 },
      ],
      collapsed: false,
    },
    {
      id: "qcStatus",
      label: "QC Status",
      isSingleSelect: true, // This group will be single select
      options: [
        { id: "approved", label: "Approved", count: 28 },
        { id: "pending", label: "Pending", count: 12 },
        { id: "rejected", label: "Rejected", count: 10 },
      ],
      collapsed: false,
    },
    {
      id: "brand",
      label: "Brand",
      isSingleSelect: false, // This group remains multi-select
      options: [
        { id: "nike", label: "Nike", count: 18 },
        { id: "adidas", label: "Adidas", count: 15 },
        { id: "puma", label: "Puma", count: 7 },
      ],
      collapsed: false,
    },
  ]);

  // Initialize filters from URL params
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    setFilters((prevFilters) =>
      prevFilters.map((group) => ({
        ...group,
        options: group.options.map((option) => ({
          ...option,
          selected: params.getAll(group.id).includes(option.id),
        })),
      })),
    );
  }, [searchParams]);

  const toggleGroup = (groupId: string) => {
    setFilters((prevFilters) =>
      prevFilters.map((group) =>
        group.id === groupId
          ? { ...group, collapsed: !group.collapsed }
          : group,
      ),
    );
  };

  const toggleOption = (groupId: string, optionId: string) => {
    const params = new URLSearchParams(searchParams);
    const group = filters.find((g) => g.id === groupId);

    if (group?.isSingleSelect) {
      // For single select groups, replace any existing value
      params.delete(groupId);
      params.append(groupId, optionId);
    } else {
      // For multi-select groups, keep the existing behavior
      const currentValues = params.getAll(groupId);
      if (currentValues.includes(optionId)) {
        params.delete(groupId);
        currentValues
          .filter((id) => id !== optionId)
          .forEach((id) => params.append(groupId, id));
      } else {
        params.append(groupId, optionId);
      }
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.replace(pathname);
  };

  const applyFilters = () => {
    onClose();
  };

  return (
    <Drawer
      hiddenCloseBtn
      mobile={false}
      isOpen={isOpen}
      onClose={onClose}
      width="w-80"
      position="right"
    >
      <div className="h-full p-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">All filters</h2>
          <button
            onClick={clearAllFilters}
            className="text-sm text-green-600 hover:text-green-800"
          >
            Clear all
          </button>
        </div>

        <div className="space-y-6">
          {filters.map((group) => (
            <div key={group.id} className="border-b pb-4">
              <button
                className="flex w-full items-center justify-between text-left font-medium"
                onClick={() => toggleGroup(group.id)}
              >
                <span>{group.label}</span>
                {group.collapsed ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronUp size={18} />
                )}
              </button>

              {!group.collapsed && (
                <div className="mt-2 space-y-2 pl-2">
                  {group.options.map((option) => {
                    const isSelected = searchParams
                      .getAll(group.id)
                      .includes(option.id);
                    return (
                      <div
                        key={option.id}
                        className="flex items-center justify-between gap-2"
                      >
                        <DynamicCheckbox
                          label={option.label}
                          checked={isSelected}
                          onChange={() => toggleOption(group.id, option.id)}
                        />
                        {option.count !== undefined && (
                          <span className="text-sm text-gray-500">
                            ({option.count})
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md">
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 rounded-md border border-gray-300 py-2 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={applyFilters}
              className="flex-1 rounded-md bg-green-600 py-2 text-white hover:bg-green-700"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
