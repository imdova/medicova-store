"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  appLinks,
  legalLinks,
  paymentMethods,
  sections,
  socialMedia,
} from "@/constants/footer";

const FullFooter = () => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <footer className="border-t border-gray-200 bg-white text-gray-800">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-8">
        {/* Help section */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold">Were Always Here To Help</h2>
          <p className="text-gray-600">
            Reach out to us through any of these support channels
          </p>
        </div>

        {/* Footer sections grid - mobile accordion */}
        <div className="mb-8 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-4 xl:grid-cols-7">
          {sections.map((section, index) => (
            <div
              key={index}
              className="mb-4 border-b border-gray-200 md:mb-6 md:border-none"
            >
              {/* Section header with toggle button for mobile */}
              <button
                className="flex w-full items-center justify-between py-3 text-left font-semibold uppercase md:pointer-events-none md:py-0"
                onClick={() => toggleSection(section.title)}
                aria-expanded={expandedSections[section.title] || false}
                aria-controls={`footer-section-${index}`}
              >
                <h3 className="text-sm">{section.title}</h3>
                <span className="md:hidden">
                  {expandedSections[section.title] ? (
                    <ChevronUp size={17} />
                  ) : (
                    <ChevronDown size={17} />
                  )}
                </span>
              </button>

              {/* Section content - collapsible on mobile */}
              <div
                id={`footer-section-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedSections[section.title]
                    ? "max-h-96 py-2"
                    : "max-h-0 py-0"
                } md:max-h-full md:py-2`}
              >
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="block py-1 text-xs text-gray-600 transition-colors hover:text-green-600"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* App download section */}
        <div className="mb-8 flex flex-col justify-between gap-4 border-gray-200 pt-8 md:flex-row md:border-t">
          <div className="flex flex-col items-center">
            <h3 className="mb-4 text-sm font-bold uppercase">SHOP ON THE GO</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {appLinks.map((app, index) => (
                <Link
                  key={index}
                  href={app.href}
                  className="inline-block transition-opacity hover:opacity-80"
                >
                  <Image
                    src={app.icon}
                    alt={app.name}
                    width={120}
                    height={40}
                    className="h-10 object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="mb-4 text-sm font-bold uppercase">
              Connect With Us
            </h3>
            <div className="mb-4 flex items-center space-x-4 md:mb-0">
              {socialMedia.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={28}
                    height={28}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pb-12 md:py-3 md:pb-0 xl:flex-row xl:items-start">
          {/* Social media and copyright */}
          <p className="w-fit text-gray-600">
            © {new Date().getFullYear()} Medicova. All Rights Reserved
          </p>

          {/* Payment methods */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {paymentMethods.map((method, index) => (
              <div key={index} className="flex items-center">
                <Image
                  src={method.icon}
                  alt={method.name}
                  width={40}
                  height={24}
                  className="h-6 object-contain"
                />
              </div>
            ))}
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {legalLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-gray-600 transition-colors hover:text-green-600"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FullFooter;
