import type { LandlordSettings } from "../types/receipt";

const STORAGE_KEY = "landlord_settings";

const DEFAULT_SETTINGS: LandlordSettings = {
  businessName: "Alex Rentals",
  phoneNumber: "0712345678",
  address: "Nairobi, Kenya",
  receiptPrefix: "REC",
};

export function getLandlordSettings(): LandlordSettings {
  const savedSettings = localStorage.getItem(STORAGE_KEY);

  if (!savedSettings) {
    return DEFAULT_SETTINGS;
  }

  try {
    return JSON.parse(savedSettings) as LandlordSettings;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveLandlordSettings(
  settings: LandlordSettings
): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(settings)
  );
}