// types/customer.ts
export interface CustomerAddress {
  id: string;
  type: "home" | "work" | "other";
  label: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault: boolean;
  createdAt: string;
}

export interface CustomerOrderSummary {
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string | null;
  averageOrderValue: number;
}

export interface CustomerPreferences {
  newsletter: boolean;
  smsNotifications: boolean;
  emailMarketing: boolean;
  language: "en" | "ar";
  currency: string;
}

export interface Customer {
  id: string;
  avatar?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender: "male" | "female" | "other" | "prefer-not-to-say";
  status: { en: string; ar: string };
  tier: "regular" | "silver" | "gold" | "platinum";
  joinDate: string;
  lastLogin: string;
  addresses: CustomerAddress[];
  orderSummary: CustomerOrderSummary;
  preferences: CustomerPreferences;
  notes?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomerActivityMetadata {
  ipAddress?: string;
  device?: string;
  orderId?: string;
  reviewId?: string;
}

export interface CustomerActivity {
  id: string;
  customerId: string;
  type: "login" | "purchase" | "review" | "profile_update" | "password_change";
  description: string;
  timestamp: string;
  metadata?: CustomerActivityMetadata;
}
