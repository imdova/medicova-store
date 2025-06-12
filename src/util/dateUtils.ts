// utils/dateUtils.ts
export const formatDate = (
  date: Date | null,
  formatStr: string = "MMM dd, yyyy",
) => {
  if (!date) return "";

  const months = [
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
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const pad = (num: number) => num.toString().padStart(2, "0");

  return formatStr
    .replace(/yyyy/g, date.getFullYear().toString())
    .replace(/yy/g, date.getFullYear().toString().slice(-2))
    .replace(/MMMM/g, months[date.getMonth()])
    .replace(/MMM/g, months[date.getMonth()].slice(0, 3))
    .replace(/MM/g, pad(date.getMonth() + 1))
    .replace(/M/g, (date.getMonth() + 1).toString())
    .replace(/dd/g, pad(date.getDate()))
    .replace(/d/g, date.getDate().toString())
    .replace(/HH/g, pad(date.getHours()))
    .replace(/H/g, date.getHours().toString())
    .replace(/hh/g, pad(date.getHours() % 12 || 12))
    .replace(/h/g, (date.getHours() % 12 || 12).toString())
    .replace(/mm/g, pad(date.getMinutes()))
    .replace(/m/g, date.getMinutes().toString())
    .replace(/ss/g, pad(date.getSeconds()))
    .replace(/s/g, date.getSeconds().toString())
    .replace(/a/g, date.getHours() < 12 ? "am" : "pm")
    .replace(/A/g, date.getHours() < 12 ? "AM" : "PM")
    .replace(/EEEE/g, days[date.getDay()])
    .replace(/E/g, days[date.getDay()].slice(0, 3));
};

export const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const subDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

export const startOfWeek = (date: Date, firstDayOfWeek: number = 0) => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;
  result.setDate(result.getDate() - diff);
  result.setHours(0, 0, 0, 0);
  return result;
};

export const endOfWeek = (date: Date, firstDayOfWeek: number = 0) => {
  const result = startOfWeek(date, firstDayOfWeek);
  result.setDate(result.getDate() + 6);
  result.setHours(23, 59, 59, 999);
  return result;
};

export const startOfMonth = (date: Date) => {
  const result = new Date(date);
  result.setDate(1);
  result.setHours(0, 0, 0, 0);
  return result;
};

export const endOfMonth = (date: Date) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1);
  result.setDate(0);
  result.setHours(23, 59, 59, 999);
  return result;
};

export const startOfYear = (date: Date) => {
  const result = new Date(date);
  result.setMonth(0, 1);
  result.setHours(0, 0, 0, 0);
  return result;
};

export const endOfYear = (date: Date) => {
  const result = new Date(date);
  result.setMonth(11, 31);
  result.setHours(23, 59, 59, 999);
  return result;
};

export const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const differenceInDays = (date1: Date, date2: Date) => {
  const timeDiff = date1.getTime() - date2.getTime();
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
};

export const addMonths = (date: Date, months: number) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

export const subMonths = (date: Date, months: number) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() - months);
  return result;
};
