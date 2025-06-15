import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";

// Type definitions
type Country = {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
};

type PhoneInputProps = {
  name: string;
  required?: boolean;
  defaultValue?: string;
};

// Sample country data (you can expand this list)
const COUNTRIES: Country[] = [
  // Arab countries
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "sa" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "ae" },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: "eg" },
  { code: "JO", name: "Jordan", dialCode: "+962", flag: "jo" },
  { code: "KW", name: "Kuwait", dialCode: "+965", flag: "kw" },
  { code: "QA", name: "Qatar", dialCode: "+974", flag: "qa" },
  { code: "BH", name: "Bahrain", dialCode: "+973", flag: "bh" },
  { code: "OM", name: "Oman", dialCode: "+968", flag: "om" },
  { code: "DZ", name: "Algeria", dialCode: "+213", flag: "dz" },
  { code: "MA", name: "Morocco", dialCode: "+212", flag: "ma" },
  { code: "TN", name: "Tunisia", dialCode: "+216", flag: "tn" },
  { code: "LB", name: "Lebanon", dialCode: "+961", flag: "lb" },
  { code: "IQ", name: "Iraq", dialCode: "+964", flag: "iq" },
  { code: "SY", name: "Syria", dialCode: "+963", flag: "sy" },
  { code: "YE", name: "Yemen", dialCode: "+967", flag: "ye" },
  { code: "SD", name: "Sudan", dialCode: "+249", flag: "sd" },
  { code: "PS", name: "Palestine", dialCode: "+970", flag: "ps" },

  // Common international countries
  { code: "US", name: "United States", dialCode: "+1", flag: "us" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "gb" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "ca" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "au" },
  { code: "FR", name: "France", dialCode: "+33", flag: "fr" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "de" },
  { code: "IN", name: "India", dialCode: "+91", flag: "in" },
  { code: "PK", name: "Pakistan", dialCode: "+92", flag: "pk" },
];

const PhoneInput: React.FC<PhoneInputProps> = ({
  name,
  required = false,
  defaultValue = "",
}) => {
  const { control, setValue, register } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]); // Default to US

  useEffect(() => {
    setValue("phone_code", selectedCountry.dialCode); // set hidden field
  }, [selectedCountry, setValue]);

  // Filter countries for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.dialCode.includes(searchTerm),
    );
  }, [searchTerm]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Phone Number
      </label>

      <div className="relative flex rounded-md shadow-sm">
        {/* Country code dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="inline-flex h-full items-center justify-center rounded-l-md border border-gray-300 bg-gray-50 px-2 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image
              width={300}
              height={300}
              src={`https://flagcdn.com/h20/${selectedCountry.flag.toString()}.png`}
              alt={selectedCountry.name}
              className="mr-1 h-4 w-4 rounded-full"
            />
            <span>{selectedCountry.dialCode}</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-1 max-h-60 w-64 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search countries..."
                  className="mb-2 w-full rounded-md border border-gray-300 p-2 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ul>
                {filteredCountries.map((country) => (
                  <li
                    key={country.code}
                    className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setSelectedCountry(country);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                  >
                    <Image
                      width={300}
                      height={300}
                      src={`https://flagcdn.com/h20/${country.flag.toString()}.png`}
                      alt={country.name}
                      className="mr-1 h-5 w-5 rounded-full"
                    />
                    <span className="mr-2">{country.dialCode}</span>
                    <span className="text-sm text-gray-600">
                      {country.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Phone number input */}
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={{
            required: required ? "Phone number is required" : false,
            pattern: {
              value: /^[\d\s\-()]+$/,
              message: "Please enter a valid phone number",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div className="flex-1">
              <input
                {...field}
                type="tel"
                className="block w-full rounded-r-md border border-gray-300 px-3 py-2 focus:outline-none"
                placeholder="(201) 555-0124"
              />
              {error && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
              )}
            </div>
          )}
        />
        <input
          type="hidden"
          value={selectedCountry.dialCode}
          {...register("phone_code")}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
