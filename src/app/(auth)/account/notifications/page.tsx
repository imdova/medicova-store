"use client";
import React, { useState } from "react";

const NotificationsPage = () => {
  const [language, setLanguage] = useState("English");
  const [marketingPrefs, setMarketingPrefs] = useState({
    email: false,
    sms: true,
    whatsapp: true,
  });

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handlePrefChange = (channel: keyof typeof marketingPrefs) => {
    setMarketingPrefs({
      ...marketingPrefs,
      [channel]: !marketingPrefs[channel],
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-700">Notifications</h1>
      </div>

      {/* Language Selection Card */}
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Receive Communications In
        </h2>

        <div className="flex items-center">
          <label
            htmlFor="language"
            className="mr-3 block text-sm font-medium text-gray-700"
          >
            Language
          </label>
          <div className="relative">
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm focus:outline-none"
            >
              <option value="English">English</option>
              <option value="Arabic">العربية</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Marketing Preferences Card */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Marketing Preferences
        </h2>

        <div className="flex flex-col items-center gap-3 md:flex-col lg:flex-row xl:flex-row">
          {/* Email Toggle */}
          <div className="flex w-full items-center justify-between rounded-md border border-gray-300 p-3">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <button
              type="button"
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-green-500 ${marketingPrefs.email ? "bg-green-600" : "bg-gray-200"}`}
              onClick={() => handlePrefChange("email")}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${marketingPrefs.email ? "translate-x-6" : "translate-x-1"}`}
              />
            </button>
          </div>

          {/* SMS Toggle */}
          <div className="flex w-full items-center justify-between rounded-md border border-gray-300 p-3">
            <span className="text-sm font-medium text-gray-700">SMS</span>
            <button
              type="button"
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${marketingPrefs.sms ? "bg-green-600" : "bg-gray-200"}`}
              onClick={() => handlePrefChange("sms")}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${marketingPrefs.sms ? "translate-x-6" : "translate-x-1"}`}
              />
            </button>
          </div>

          {/* WhatsApp Toggle */}
          <div className="flex w-full items-center justify-between rounded-md border border-gray-300 p-3">
            <span className="text-sm font-medium text-gray-700">WhatsApp</span>
            <button
              type="button"
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-green-500 ${marketingPrefs.whatsapp ? "bg-green-600" : "bg-gray-200"}`}
              onClick={() => handlePrefChange("whatsapp")}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${marketingPrefs.whatsapp ? "translate-x-6" : "translate-x-1"}`}
              />
            </button>
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-6 rounded-md border border-gray-100 bg-gray-50 p-3">
          <p className="text-xs text-gray-600">
            Opting out halts promotional messages, but youll still receive
            important service updates.
          </p>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              // Save preferences logic here
              alert("Preferences saved successfully");
            }}
            className="rounded-md bg-green-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-green-700"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
