"use client";

import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useState } from "react";

type FilterOption = {
  id: string;
  name: string;
  count?: number;
};

type FilterGroup = {
  id: string;
  name: string;
  options: FilterOption[];
};

type TapFilterProps = {
  filterGroups: FilterGroup[];
  currentFilters: Record<string, string[]>;
  onFilterToggle: (filterKey: string, filterValue: string) => void;
};

export default function TapFilter({
  filterGroups,
  currentFilters,
  onFilterToggle,
}: TapFilterProps) {
  const [openTapDropdown, setOpenTapDropdown] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTapOptions, setFilteredTapOptions] = useState<
    Record<string, FilterOption[]>
  >({});

  // Initialize filtered tap options
  useState(() => {
    const initialFilteredOptions: Record<string, FilterOption[]> = {};
    filterGroups.forEach((group) => {
      initialFilteredOptions[group.id] = group.options;
    });
    setFilteredTapOptions(initialFilteredOptions);
  });

  const toggleTapDropdown = (groupId: string) => {
    setOpenTapDropdown((prev) => (prev === groupId ? null : groupId));
    // Reset search when opening
    if (openTapDropdown !== groupId) {
      setSearchTerm("");
      const group = filterGroups.find((g) => g.id === groupId);
      if (group) {
        setFilteredTapOptions((prev) => ({
          ...prev,
          [groupId]: group.options,
        }));
      }
    }
  };

  const filterTapOptions = (groupId: string, term: string) => {
    const group = filterGroups.find((g) => g.id === groupId);
    if (group) {
      const filtered = group.options.filter((option) =>
        option.name.toLowerCase().includes(term.toLowerCase()),
      );
      setFilteredTapOptions((prev) => ({
        ...prev,
        [groupId]: filtered,
      }));
    }
  };

  const isFilterActive = (filterKey: string) => {
    return Object.keys(currentFilters).includes(filterKey);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {filterGroups.map((group) => (
        <div key={group.id} className="relative">
          <button
            onClick={() => toggleTapDropdown(group.id)}
            className={`flex items-center rounded-full px-3 py-1 text-sm ${
              isFilterActive(group.id)
                ? "border border-indigo-300 bg-indigo-100 text-indigo-800"
                : "border border-gray-200 bg-gray-100 text-gray-800"
            }`}
          >
            {group.name}
            {openTapDropdown === group.id ? (
              <ChevronUp className="ml-1 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-1 h-4 w-4" />
            )}
          </button>

          {openTapDropdown === group.id && (
            <div className="absolute z-10 mt-1 w-56 rounded-md border border-gray-200 bg-white shadow-lg">
              <div className="border-b p-2">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder={`Search ${group.name}`}
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      filterTapOptions(group.id, e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {filteredTapOptions[group.id]?.length > 0 ? (
                  filteredTapOptions[group.id].map((option) => (
                    <div
                      key={option.id}
                      className="flex cursor-pointer items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        onFilterToggle(group.id, option.id);
                        setOpenTapDropdown(null);
                      }}
                    >
                      <span>{option.name}</span>
                      {option.count && (
                        <span className="text-xs text-gray-500">
                          {option.count}
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    No options found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
