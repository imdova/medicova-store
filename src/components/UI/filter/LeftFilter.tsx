"use client";

import { Check, ChevronDown, ChevronUp, Minus, Plus, X } from "lucide-react";
import { useState } from "react";

type FilterOption = {
  id: string;
  name: string;
  count?: number;
  subcategories?: FilterOption[];
};

type FilterGroup = {
  id: string;
  name: string;
  options: FilterOption[];
};

type LeftFilterProps = {
  filterGroups: FilterGroup[];
  currentFilters: Record<string, string[]>;
  onFilterToggle: (filterKey: string, filterValue: string) => void;
  onClearFilters: () => void;
};

export default function LeftFilter({
  filterGroups,
  currentFilters,
  onFilterToggle,
  onClearFilters,
}: LeftFilterProps) {
  const [openFilterGroups, setOpenFilterGroups] = useState<
    Record<string, boolean>
  >(filterGroups.reduce((acc, group) => ({ ...acc, [group.id]: true }), {}));

  const [openSubcategories, setOpenSubcategories] = useState<
    Record<string, boolean>
  >({});

  const toggleFilterGroup = (groupId: string) => {
    setOpenFilterGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const toggleSubcategory = (categoryId: string) => {
    setOpenSubcategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const isFilterActive = (filterKey: string, filterValue: string) => {
    return currentFilters[filterKey]?.includes(filterValue) || false;
  };

  const hasActiveFilters = Object.values(currentFilters).some(
    (filters) => filters.length > 0,
  );

  return (
    <div className="w-full flex-shrink-0 md:w-64">
      <div className="rounded-lg bg-white p-4 shadow-sm">
        {hasActiveFilters && (
          <div className="mb-4 flex justify-end">
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200"
            >
              Clear all
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        {filterGroups.map((group) => (
          <div key={group.id} className="border-gray-100 pb-6">
            <div
              className="mb-4 flex cursor-pointer items-center justify-between"
              onClick={() => toggleFilterGroup(group.id)}
            >
              <h3 className="text-md font-bold text-gray-600">{group.name}</h3>
              {openFilterGroups[group.id] ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </div>

            {openFilterGroups[group.id] && (
              <div className="mt-2 space-y-4 pl-2">
                {group.options.map((option) => (
                  <div key={option.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <label className="flex cursor-pointer items-center">
                          <div className="relative h-5 w-5 cursor-pointer">
                            <input
                              id={`${group.id}-${option.id}`}
                              name={group.id}
                              type="checkbox"
                              checked={isFilterActive(group.id, option.id)}
                              onChange={() =>
                                onFilterToggle(group.id, option.id)
                              }
                              className="peer relative h-full w-full cursor-pointer appearance-none rounded border border-gray-300 transition-all checked:border-green-500 checked:bg-green-500"
                            />
                            <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                              <Check className="text-white" size={13} />
                            </span>
                          </div>
                          <span className="ml-3 text-sm font-semibold text-gray-600">
                            {option.name}
                          </span>
                        </label>
                      </div>
                      {option.subcategories ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSubcategory(option.id);
                          }}
                          className="text-xs text-gray-500 hover:text-gray-700"
                        >
                          {openSubcategories[option.id] ? (
                            <span>
                              {" "}
                              <Minus className="text-gray-700" size={13} />
                            </span>
                          ) : (
                            <span>
                              <Plus className="text-gray-700" size={13} />
                            </span>
                          )}
                        </button>
                      ) : option.count ? (
                        <span className="text-xs text-gray-500">
                          {option.count}
                        </span>
                      ) : null}
                    </div>

                    {option.subcategories && openSubcategories[option.id] && (
                      <div className="my-4 ml-6 mt-3 space-y-2">
                        {option.subcategories.map((sub) => (
                          <div key={sub.id} className="relative cursor-pointer">
                            <label className="flex cursor-pointer items-center">
                              <div className="relative h-5 w-5 cursor-pointer">
                                <input
                                  id={`subcategory-${sub.id}`}
                                  name="subcategory"
                                  type="checkbox"
                                  checked={isFilterActive(group.id, sub.id)}
                                  onChange={() =>
                                    onFilterToggle(group.id, sub.id)
                                  }
                                  className="peer relative h-full w-full cursor-pointer appearance-none rounded border border-gray-300 transition-all checked:border-green-500 checked:bg-green-500"
                                />
                                <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                  <Check className="text-white" size={13} />
                                </span>
                              </div>
                              <span className="ml-3 text-sm text-gray-600">
                                {sub.name}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
