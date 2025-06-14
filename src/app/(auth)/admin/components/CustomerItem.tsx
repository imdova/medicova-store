import Avatar from "@/components/UI/Avatar";
import React from "react";

interface CustomerItemProps {
  id: string;
  name: string;
  phone: string;
  orders: number;
  avatarUrl?: string;
}

const CustomerItem: React.FC<CustomerItemProps> = ({
  name,
  phone,
  orders,
  avatarUrl,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-3">
      <div className="flex items-center space-x-3">
        <Avatar
          name={name}
          imageUrl={avatarUrl}
          className="h-10 w-10"
          RandomColor
        />
        <div>
          <p className="font-medium text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{phone}</p>
        </div>
      </div>
      <div className="text-sm text-gray-500">Orders: {orders}</div>
    </div>
  );
};

export default CustomerItem;
