import { DollarSign, RotateCcw, ShoppingCart } from "lucide-react";

export const dummyChartData = {
  yearly: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    series: [
      {
        name: "Revenue",
        data: [
          12000, 15000, 18000, 22000, 25000, 23000, 24000, 26000, 28000, 30000,
          32000, 34000,
        ],
        color: "#3b82f6",
      },
      {
        name: "Orders",
        data: [300, 350, 400, 450, 500, 480, 470, 520, 550, 600, 620, 640],
        color: "#10b981",
      },
      {
        name: "Returns",
        data: [10, 12, 15, 11, 13, 14, 10, 9, 8, 7, 6, 5],
        color: "#ef4444",
      },
    ],
  },
  monthly: {
    categories: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    series: [
      {
        name: "Revenue",
        data: Array.from({ length: 30 }, () =>
          Math.floor(800 + Math.random() * 500),
        ),
        color: "#3b82f6",
      },
      {
        name: "Orders",
        data: Array.from({ length: 30 }, () =>
          Math.floor(20 + Math.random() * 10),
        ),
        color: "#10b981",
      },
      {
        name: "Returns",
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 5)),
        color: "#ef4444",
      },
    ],
  },
  weekly: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    series: [
      {
        name: "Revenue",
        data: [3500, 3700, 3600, 3900, 4100, 4500, 4700],
        color: "#3b82f6",
      },
      {
        name: "Orders",
        data: [80, 85, 82, 90, 95, 100, 105],
        color: "#10b981",
      },
      {
        name: "Returns",
        data: [2, 1, 2, 3, 1, 2, 1],
        color: "#ef4444",
      },
    ],
  },
};
export const dummyChartSingleData = {
  yearly: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    series: [
      {
        name: "View",
        data: [
          12000, 15000, 18000, 22000, 25000, 23000, 24000, 26000, 28000, 30000,
          32000, 34000,
        ],
        color: "#2ba149",
      },
    ],
  },
  monthly: {
    categories: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    series: [
      {
        name: "View",
        data: Array.from({ length: 30 }, () =>
          Math.floor(800 + Math.random() * 500),
        ),
        color: "#2ba149",
      },
    ],
  },
  weekly: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    series: [
      {
        name: "View",
        data: [3500, 3700, 3600, 3900, 4100, 4500, 4700],
        color: "#2ba149",
      },
    ],
  },
};

export const dummyCards = [
  {
    title: "Revenue",
    value: "$34,000",
    color: "#3b82f6",
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "1,235",
    color: "#10b981",
    icon: ShoppingCart,
  },
  {
    title: "Returns",
    value: "48",
    color: "#ef4444",
    icon: RotateCcw,
  },
];
