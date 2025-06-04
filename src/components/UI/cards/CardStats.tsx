import { DollarSign, ShoppingCart, Package, Star } from "lucide-react";

interface CardStatsProps {
  title: string;
  value: string;
  change: string;
  icon: "dollar" | "shoppingCart" | "package" | "star";
}

const iconMap = {
  dollar: DollarSign,
  shoppingCart: ShoppingCart,
  package: Package,
  star: Star,
};

export function CardStats({ title, value, change, icon }: CardStatsProps) {
  const Icon = iconMap[icon];
  const isPositive = change.startsWith("+");

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <div className="mt-4">
        <p className="text-2xl font-semibold">{value}</p>
        <p
          className={`mt-1 text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}
        >
          {change} from last month
        </p>
      </div>
    </div>
  );
}
