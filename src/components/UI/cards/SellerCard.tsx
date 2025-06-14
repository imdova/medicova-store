import React from "react";
import Image from "next/image";
import { Seller } from "@/types/product";
import { DollarSign, Package, Star, Users } from "lucide-react";
import Link from "next/link";

interface SellerCardProps {
  seller: Seller;
}

const SellerCard: React.FC<SellerCardProps> = ({ seller }) => {
  // Format numbers with proper commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Shorten large numbers (e.g., 1000 -> 1K)
  const shortenNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return formatNumber(num);
  };

  return (
    <Link
      href={`sellers/${seller.id}`}
      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
    >
      <div className="p-4">
        <div className="mb-6 flex items-center space-x-4">
          {seller.image ? (
            <div className="relative h-16 w-16 overflow-hidden rounded-xl">
              <Image
                src={seller.image}
                alt={seller.name}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-2xl font-bold text-white">
              {seller.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {seller.name}
              </h3>

              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm text-gray-500">
                  {seller.country}, {seller.city}
                </p>
                <div className="flex items-center gap-2 text-gray-500">
                  <Star className="text-orange-500" size={15} />{" "}
                  <span className="text-xs">({seller.rating} Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-primary" />
            <p className="text-xs text-gray-900">
              {formatNumber(seller.products ?? 0)} Products
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-primary" />
            <p className="text-xs text-gray-900">
              {shortenNumber(seller.customers ?? 0)} Customers
            </p>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-primary" />
            <p className="text-xs text-gray-900">
              {shortenNumber(1212)} Revenue
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SellerCard;
