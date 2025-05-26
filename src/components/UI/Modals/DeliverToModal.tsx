"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Loader2, MapPin, Home, Briefcase, Plus, X, Map } from "lucide-react";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMapEvent } from "react-leaflet";

type AddressType = "home" | "work" | "other";

interface Address {
  id: string;
  type: AddressType;
  name: string;
  details: string;
  area: string;
  city: string;
  isDefault: boolean;
  location: {
    lat: number;
    lng: number;
  };
}

interface DeliverToModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAddress?: Address | null;
  onAddressSelect: (address: Address) => void;
  locale?: string;
  savedAddresses?: Address[];
}

// Default Cairo coordinates
const DEFAULT_COORDS = { lat: 30.0444, lng: 31.2357 };

// Dynamic imports with proper typing
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[400px] w-full items-center justify-center bg-gray-100">
        Loading map...
      </div>
    ),
  },
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

function ClickHandler({
  onMapClick,
}: {
  onMapClick: (e: L.LeafletMouseEvent) => void;
}) {
  useMapEvent("click", onMapClick);
  return null;
}

export default function DeliverToModal({
  isOpen,
  onClose,
  currentAddress,
  onAddressSelect,
  locale = "en",
  savedAddresses = [],
}: DeliverToModalProps) {
  // State management
  const [addresses, setAddresses] = useState<Address[]>(savedAddresses);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showAddNew, setShowAddNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [mapView, setMapView] = useState(false);
  const [mapCenter, setMapCenter] = useState(DEFAULT_COORDS);
  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [tempAddress, setTempAddress] = useState<
    Omit<Address, "id" | "location"> & {
      location?: { lat: number; lng: number };
    }
  >({
    type: "home",
    name: "",
    details: "",
    area: "",
    city: "",
    isDefault: false,
  });

  const mapRef = useRef<L.Map | null>(null);

  // Initialize addresses
  useEffect(() => {
    if (savedAddresses.length === 0) {
      setAddresses([
        {
          id: "1",
          type: "home",
          name: "Home",
          details: "123 Main St, Apt 4B",
          area: "Downtown",
          city: "Cairo",
          isDefault: true,
          location: DEFAULT_COORDS,
        },
      ]);
    } else {
      setAddresses(savedAddresses);
    }
  }, [savedAddresses]);

  // Set selected address and map center
  useEffect(() => {
    if (currentAddress) {
      setSelectedAddress(currentAddress);
      setMapCenter(currentAddress.location);
    } else {
      const defaultAddress = addresses.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
        setMapCenter(defaultAddress.location);
      }
    }
  }, [currentAddress, addresses]);

  // Memoized reverse geocoding function
  async function reverseGeocode(latitude: number, longitude: number) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=en`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }

    const data = await response.json();

    return {
      details: data.display_name,
      area: data.address.suburb || data.address.neighbourhood || "",
      city:
        data.address.city || data.address.town || data.address.village || "",
      country: data.address.country || "",
    };
  }

  const handleLocateMe = useCallback(async () => {
    setIsLocating(true);
    setLocationError("");

    try {
      if (!navigator.geolocation) {
        throw new Error("Geolocation not supported");
      }

      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
          });
        },
      );

      const newLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      setMapCenter(newLocation);
      setSelectedPosition(newLocation);
      setMapView(true);

      const addressDetails = await reverseGeocode(
        newLocation.lat,
        newLocation.lng,
      );
      setTempAddress((prev) => ({
        ...prev,
        details: addressDetails.details || "",
        area: addressDetails.area || "",
        city: addressDetails.city || "Cairo",
      }));
    } catch (error) {
      console.error("Location error:", error);
      setLocationError(
        locale === "ar"
          ? "تعذر الحصول على الموقع. يرجى التأكد من تفعيل خدمات الموقع."
          : "Could not get location. Please ensure location services are enabled.",
      );
    } finally {
      setIsLocating(false);
    }
  }, [locale, reverseGeocode]);

  const handleMapClick = useCallback(
    async (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      setSelectedPosition({ lat, lng });

      const addressDetails = await reverseGeocode(lat, lng);
      setTempAddress((prev) => ({
        ...prev,
        details: addressDetails.details || "Detected location",
        area: addressDetails.area || "Auto-detected",
        city: addressDetails.city || "Cairo",
      }));
    },
    [reverseGeocode],
  );

  const saveMapLocation = useCallback(() => {
    if (!selectedPosition || !tempAddress.name) {
      setLocationError(
        locale === "ar"
          ? "الرجاء إدخال اسم العنوان وتحديد الموقع على الخريطة"
          : "Please enter address name and select location on map",
      );
      return;
    }

    const newAddress: Address = {
      id: `map-${Date.now()}`,
      type: tempAddress.type,
      name: tempAddress.name,
      details: tempAddress.details || "",
      area: tempAddress.area || "",
      city: tempAddress.city || "Cairo",
      isDefault: tempAddress.isDefault || false,
      location: selectedPosition,
    };

    const updatedAddresses = newAddress.isDefault
      ? addresses.map((addr) => ({ ...addr, isDefault: false }))
      : [...addresses];

    setAddresses([...updatedAddresses, newAddress]);
    setSelectedAddress(newAddress);
    onAddressSelect(newAddress);
    setMapView(false);
    setShowAddNew(false);
    onClose();
  }, [
    selectedPosition,
    tempAddress,
    locale,
    addresses,
    onAddressSelect,
    onClose,
  ]);

  const handleSelectAddress = useCallback(
    (address: Address) => {
      setSelectedAddress(address);
      setMapCenter(address.location);
      onAddressSelect(address);
      onClose();
    },
    [onAddressSelect, onClose],
  );

  // Filter addresses based on search query
  const filteredAddresses = addresses.filter((addr) =>
    `${addr.name} ${addr.details} ${addr.area} ${addr.city}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-hidden rounded-lg bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-gray-100 p-4">
          <h2 className="text-lg font-semibold">
            {locale === "ar" ? "التوصيل إلى" : "Deliver To"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label={locale === "ar" ? "إغلاق" : "Close"}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="border-b p-4">
          <div className="relative">
            <input
              type="text"
              placeholder={locale === "ar" ? "ابحث عن موقع" : "Search location"}
              className="w-full rounded-lg border p-3 pl-10 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MapPin
              className="absolute left-3 top-3.5 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto">
          {mapView ? (
            <div className="flex flex-col">
              <div className="p-4">
                <h3 className="mb-2 font-medium">
                  {locale === "ar"
                    ? "حدد موقعك على الخريطة"
                    : "Select your location"}
                </h3>
                <input
                  type="text"
                  placeholder={locale === "ar" ? "اسم العنوان" : "Address name"}
                  className="mb-2 w-full rounded-lg border p-2 outline-none"
                  value={tempAddress.name}
                  onChange={(e) =>
                    setTempAddress({ ...tempAddress, name: e.target.value })
                  }
                  required
                />
              </div>

              {/* Optimized Map Container */}
              <div className="relative h-[300px] w-full">
                <MapContainer
                  center={mapCenter}
                  zoom={15}
                  style={{ height: "300px", width: "100%" }}
                  ref={mapRef}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {selectedPosition && (
                    <Marker position={selectedPosition}>
                      <Popup>
                        {locale === "ar"
                          ? "الموقع المحدد"
                          : "Selected location"}
                      </Popup>
                    </Marker>
                  )}
                  <ClickHandler onMapClick={handleMapClick} />
                </MapContainer>
              </div>

              <div className="flex justify-between p-4">
                <button
                  onClick={() => setMapView(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2"
                >
                  {locale === "ar" ? "رجوع" : "Back"}
                </button>
                <button
                  onClick={saveMapLocation}
                  className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                  {locale === "ar" ? "حفظ الموقع" : "Save Location"}
                </button>
              </div>
            </div>
          ) : showAddNew ? (
            <AddNewAddressForm
              locale={locale}
              onSave={(newAddress) => {
                const updatedAddresses = newAddress.isDefault
                  ? addresses.map((addr) => ({ ...addr, isDefault: false }))
                  : [...addresses];

                setAddresses([...updatedAddresses, newAddress]);
                setSelectedAddress(newAddress);
                onAddressSelect(newAddress);
                setShowAddNew(false);
                onClose();
              }}
              onCancel={() => setShowAddNew(false)}
              onUseMap={() => setMapView(true)}
            />
          ) : (
            <>
              {/* Current location option */}
              <div
                className={`flex cursor-pointer items-center border-b p-4 hover:bg-gray-50 ${
                  isLocating ? "opacity-70" : ""
                }`}
                onClick={handleLocateMe}
              >
                <div className="mr-3 rounded-full bg-green-100 p-2">
                  <MapPin size={18} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">
                    {locale === "ar" ? "موقعي الحالي" : "Current Location"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {locale === "ar"
                      ? "كشف الموقع تلقائياً"
                      : "Detect automatically"}
                  </p>
                  {locationError && (
                    <p className="mt-1 text-xs text-red-500">{locationError}</p>
                  )}
                </div>
                {isLocating && (
                  <Loader2 className="ml-auto h-5 w-5 animate-spin text-green-500" />
                )}
              </div>

              {/* Saved addresses */}
              {filteredAddresses.length > 0 && (
                <div className="border-b">
                  <h3 className="bg-gray-50 p-4 font-medium text-gray-700">
                    {locale === "ar" ? "العناوين المحفوظة" : "Saved Addresses"}
                  </h3>
                  {filteredAddresses.map((address) => (
                    <div
                      key={address.id}
                      className={`flex cursor-pointer items-center p-4 hover:bg-gray-50 ${
                        selectedAddress?.id === address.id ? "bg-green-50" : ""
                      }`}
                      onClick={() => handleSelectAddress(address)}
                    >
                      <div className="mr-3 rounded-full bg-gray-100 p-2">
                        {address.type === "home" ? (
                          <Home size={18} className="text-gray-600" />
                        ) : address.type === "work" ? (
                          <Briefcase size={18} className="text-gray-600" />
                        ) : (
                          <MapPin size={18} className="text-gray-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{address.name}</h3>
                          {address.isDefault && (
                            <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                              {locale === "ar" ? "افتراضي" : "Default"}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {address.details}
                        </p>
                        <p className="text-xs text-gray-500">
                          {address.area}, {address.city}
                        </p>
                      </div>
                      {selectedAddress?.id === address.id && (
                        <div className="ml-2 text-green-500">✓</div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Add new address button */}
              <div
                className="flex cursor-pointer items-center p-4 hover:bg-gray-50"
                onClick={() => setShowAddNew(true)}
              >
                <div className="mr-3 rounded-full bg-gray-100 p-2">
                  <Plus size={18} className="text-gray-600" />
                </div>
                <h3 className="font-medium">
                  {locale === "ar" ? "إضافة عنوان جديد" : "Add new address"}
                </h3>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

type AddNewAddressFormProps = {
  onSave: (address: Address) => void;
  onCancel: () => void;
  onUseMap: () => void;
  locale?: string;
};

function AddNewAddressForm({
  onSave,
  onCancel,
  onUseMap,
  locale = "en",
}: AddNewAddressFormProps) {
  const [formData, setFormData] = useState({
    type: "home" as const,
    name: "",
    details: "",
    area: "",
    city: "Cairo",
    isDefault: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress: Address = {
      id: `addr-${Date.now()}`,
      ...formData,
      location: DEFAULT_COORDS, // Default location
    };
    onSave(newAddress);
  };

  return (
    <div className="p-4">
      <h3 className="mb-4 font-medium">
        {locale === "ar" ? "إضافة عنوان جديد" : "Add New Address"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {locale === "ar" ? "نوع العنوان" : "Address Type"}
          </label>
          <div className="flex space-x-2">
            {["home", "work", "other"].map((type) => (
              <button
                key={type}
                type="button"
                className={`rounded-lg border px-4 py-2 ${
                  formData.type === type
                    ? "border-green-500 bg-green-100"
                    : "border-gray-300 bg-white"
                }`}
                onClick={() => setFormData({ ...formData })}
              >
                {type === "home"
                  ? locale === "ar"
                    ? "منزل"
                    : "Home"
                  : type === "work"
                    ? locale === "ar"
                      ? "عمل"
                      : "Work"
                    : locale === "ar"
                      ? "أخرى"
                      : "Other"}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {locale === "ar" ? "اسم العنوان" : "Address Name"}
          </label>
          <input
            type="text"
            className="w-full rounded-lg border p-2"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {locale === "ar" ? "تفاصيل العنوان" : "Address Details"}
          </label>
          <textarea
            className="w-full rounded-lg border p-2"
            rows={3}
            value={formData.details}
            onChange={(e) =>
              setFormData({ ...formData, details: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {locale === "ar" ? "المنطقة" : "Area"}
            </label>
            <input
              type="text"
              className="w-full rounded-lg border p-2"
              value={formData.area}
              onChange={(e) =>
                setFormData({ ...formData, area: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {locale === "ar" ? "المدينة" : "City"}
            </label>
            <select
              className="w-full rounded-lg border p-2"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            >
              <option value="Cairo">Cairo</option>
              <option value="Alexandria">Alexandria</option>
              <option value="Giza">Giza</option>
              <option value="Luxor">Luxor</option>
            </select>
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="defaultAddress"
            className="mr-2"
            checked={formData.isDefault}
            onChange={(e) =>
              setFormData({ ...formData, isDefault: e.target.checked })
            }
          />
          <label htmlFor="defaultAddress" className="text-sm text-gray-700">
            {locale === "ar"
              ? "تعيين كعنوان افتراضي"
              : "Set as default address"}
          </label>
        </div>

        <div className="mb-4">
          <button
            type="button"
            onClick={onUseMap}
            className="flex w-full items-center justify-center rounded-lg border border-green-500 bg-white px-4 py-2 text-green-500 hover:bg-green-50"
          >
            <Map className="mr-2" size={18} />
            {locale === "ar" ? "تحديد على الخريطة" : "Select on Map"}
          </button>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-4 py-2"
            onClick={onCancel}
          >
            {locale === "ar" ? "إلغاء" : "Cancel"}
          </button>
          <button
            type="submit"
            className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            {locale === "ar" ? "حفظ العنوان" : "Save Address"}
          </button>
        </div>
      </form>
    </div>
  );
}
