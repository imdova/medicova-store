// components/DateRangeSelector.tsx
import { useState, useEffect, useRef } from "react";
import {
  formatDate,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  isSameDay,
  differenceInDays,
  addMonths,
  subMonths,
} from "@/util/dateUtils";
import { Calendar } from "lucide-react";

type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

type PresetRange = {
  label: string;
  value: () => DateRange;
};

type DateRangeSelectorProps = {
  onDateChange: (range: DateRange) => void;
  initialRange?: DateRange;
  formatString?: string;
  className?: string;
};

const DateRangeSelector = ({
  onDateChange,
  initialRange = { startDate: null, endDate: null },
  formatString = "MMM dd, yyyy",
  className = "",
}: DateRangeSelectorProps) => {
  const [dateRange, setDateRange] = useState<DateRange>(initialRange);
  const [isCustomRange, setIsCustomRange] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Define preset ranges
  const presetRanges: PresetRange[] = [
    {
      label: "Today",
      value: () => ({
        startDate: new Date(),
        endDate: new Date(),
      }),
    },
    {
      label: "Yesterday",
      value: () => ({
        startDate: subDays(new Date(), 1),
        endDate: subDays(new Date(), 1),
      }),
    },
    {
      label: "Last 7 Days",
      value: () => ({
        startDate: subDays(new Date(), 6),
        endDate: new Date(),
      }),
    },
    {
      label: "This Week",
      value: () => ({
        startDate: startOfWeek(new Date()),
        endDate: endOfWeek(new Date()),
      }),
    },
    {
      label: "Last Week",
      value: () => ({
        startDate: startOfWeek(subDays(new Date(), 7)),
        endDate: endOfWeek(subDays(new Date(), 7)),
      }),
    },
    {
      label: "This Month",
      value: () => ({
        startDate: startOfMonth(new Date()),
        endDate: endOfMonth(new Date()),
      }),
    },
    {
      label: "Last Month",
      value: () => ({
        startDate: startOfMonth(subMonths(new Date(), 1)),
        endDate: endOfMonth(subMonths(new Date(), 1)),
      }),
    },
    {
      label: "This Year",
      value: () => ({
        startDate: startOfYear(new Date()),
        endDate: endOfYear(new Date()),
      }),
    },
    {
      label: "Custom Range",
      value: () => ({
        startDate: null,
        endDate: null,
      }),
    },
  ];

  // Handle date range change
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      onDateChange(dateRange);
    }
  }, [dateRange, onDateChange]);

  // Apply preset range
  const applyPresetRange = (preset: PresetRange) => {
    const newRange = preset.value();
    setDateRange(newRange);
    setIsCustomRange(preset.label === "Custom Range");
    setActivePreset(preset.label === "Custom Range" ? null : preset.label);
    setShowStartCalendar(false);
    setShowEndCalendar(false);
  };

  // Navigate to previous period
  const navigatePrevious = () => {
    if (!dateRange.startDate || !dateRange.endDate) return;

    const daysDiff = differenceInDays(dateRange.endDate, dateRange.startDate);
    setDateRange({
      startDate: subDays(dateRange.startDate, daysDiff + 1),
      endDate: subDays(dateRange.endDate, daysDiff + 1),
    });
    setActivePreset(null);
  };

  // Navigate to next period
  const navigateNext = () => {
    if (!dateRange.startDate || !dateRange.endDate) return;

    const daysDiff = differenceInDays(dateRange.endDate, dateRange.startDate);
    setDateRange({
      startDate: addDays(dateRange.startDate, daysDiff + 1),
      endDate: addDays(dateRange.endDate, daysDiff + 1),
    });
    setActivePreset(null);
  };

  // Format date display
  const formatDateDisplay = () => {
    if (!dateRange.startDate || !dateRange.endDate) return "Select date range";

    if (isSameDay(dateRange.startDate, dateRange.endDate)) {
      return formatDate(dateRange.startDate, formatString);
    }

    return `${formatDate(dateRange.startDate, formatString)} - ${formatDate(dateRange.endDate, formatString)}`;
  };

  // Render a month calendar
  const renderCalendar = (
    date: Date | null,
    onChange: (date: Date) => void,
    isStart: boolean,
  ) => {
    if (!date) date = new Date();

    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const weeks = [];
    let days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(currentYear, currentMonth, day);
      const isSelected =
        (isStart &&
          dateRange.startDate &&
          isSameDay(dateObj, dateRange.startDate)) ||
        (!isStart &&
          dateRange.endDate &&
          isSameDay(dateObj, dateRange.endDate));
      const isInRange =
        dateRange.startDate &&
        dateRange.endDate &&
        dateObj >= dateRange.startDate &&
        dateObj <= dateRange.endDate;

      days.push(
        <button
          key={`day-${day}`}
          onClick={() => {
            onChange(dateObj);
            if (isStart) setShowStartCalendar(false);
            else setShowEndCalendar(false);
          }}
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            isSelected
              ? "bg-green-500 text-white"
              : isInRange
                ? "bg-green-100"
                : "hover:bg-gray-100"
          }`}
        >
          {day}
        </button>,
      );

      // Start a new row every 7 days
      if (days.length % 7 === 0 || day === daysInMonth) {
        weeks.push(
          <div key={`week-${weeks.length}`} className="grid grid-cols-7 gap-1">
            {days}
          </div>,
        );
        days = [];
      }
    }

    return (
      <div className="absolute z-20 mt-1 rounded-lg border bg-white p-2 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="mb-2 flex items-center justify-between">
            <button
              onClick={() => onChange(subMonths(date as Date, 1))}
              className="rounded p-1 hover:bg-gray-100"
            >
              &lt;
            </button>
            <div className="font-medium">
              {date.toLocaleString("default", { month: "long" })} {currentYear}
            </div>
            <button
              onClick={() => onChange(addMonths(date as Date, 1))}
              className="rounded p-1 hover:bg-gray-100"
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="mb-1 grid grid-cols-7 gap-1 text-center text-xs">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="w-8 font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="space-y-1">{weeks}</div>
      </div>
    );
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Main selector button */}

      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex w-full items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-700" />
          <span className="text-sm font-medium">{formatDateDisplay()}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${showDropdown ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown content */}
      {showDropdown && (
        <div className="absolute left-0 z-10 mt-2 w-full min-w-[300px] rounded-md border bg-white shadow-lg">
          <div className="p-4">
            {/* Navigation controls */}
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={navigatePrevious}
                className="rounded-md p-2 hover:bg-gray-100 disabled:opacity-50"
                disabled={!dateRange.startDate || !dateRange.endDate}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div className="text-center font-medium">
                {dateRange.startDate &&
                  dateRange.endDate &&
                  (isSameDay(dateRange.startDate, dateRange.endDate)
                    ? formatDate(dateRange.startDate, "MMMM yyyy")
                    : `${formatDate(dateRange.startDate, "MMM yyyy")} - ${formatDate(dateRange.endDate, "MMM yyyy")}`)}
              </div>

              <button
                onClick={navigateNext}
                className="rounded-md p-2 hover:bg-gray-100 disabled:opacity-50"
                disabled={!dateRange.startDate || !dateRange.endDate}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Preset ranges */}
            <div className="mb-4 grid grid-cols-2 gap-2">
              {presetRanges.slice(0, -1).map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => applyPresetRange(preset)}
                  className={`rounded-md px-3 py-2 text-left text-sm ${
                    activePreset === preset.label
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Custom range section */}
            <div className="border-t pt-4">
              <button
                onClick={() =>
                  applyPresetRange(presetRanges[presetRanges.length - 1])
                }
                className={`mb-3 w-full rounded-md px-3 py-2 text-left text-sm ${
                  isCustomRange
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Custom Range
              </button>

              {isCustomRange && (
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium">
                      Start Date
                    </label>
                    <input
                      type="text"
                      value={
                        dateRange.startDate
                          ? formatDate(dateRange.startDate, formatString)
                          : ""
                      }
                      readOnly
                      onClick={() => {
                        setShowStartCalendar(!showStartCalendar);
                        setShowEndCalendar(false);
                      }}
                      placeholder="Select start date"
                      className="w-full rounded-md border p-2 outline-none"
                    />
                    {showStartCalendar &&
                      renderCalendar(
                        dateRange.startDate || new Date(),
                        (date) => {
                          setDateRange((prev) => ({
                            ...prev,
                            startDate: date,
                          }));
                          if (dateRange.endDate && date > dateRange.endDate) {
                            setDateRange((prev) => ({
                              ...prev,
                              endDate: date,
                            }));
                          }
                          setActivePreset(null);
                        },
                        true,
                      )}
                  </div>
                  <div className="relative">
                    <label className="mb-1 block text-sm font-medium">
                      End Date
                    </label>
                    <input
                      type="text"
                      value={
                        dateRange.endDate
                          ? formatDate(dateRange.endDate, formatString)
                          : ""
                      }
                      readOnly
                      onClick={() => {
                        setShowEndCalendar(!showEndCalendar);
                        setShowStartCalendar(false);
                      }}
                      placeholder="Select end date"
                      className="w-full rounded-md border p-2 outline-none"
                    />
                    {showEndCalendar &&
                      renderCalendar(
                        dateRange.endDate || dateRange.startDate || new Date(),
                        (date) => {
                          setDateRange((prev) => ({ ...prev, endDate: date }));
                          if (
                            dateRange.startDate &&
                            date < dateRange.startDate
                          ) {
                            setDateRange((prev) => ({
                              ...prev,
                              startDate: date,
                            }));
                          }
                          setActivePreset(null);
                        },
                        false,
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;
