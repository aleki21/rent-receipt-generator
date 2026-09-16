import type { LandlordSettings } from "../types/receipt";

const STORAGE_KEY = "landlord_settings";

export function getLandlordSettings():
  | LandlordSettings
  | null {
  const savedSettings =
    localStorage.getItem(STORAGE_KEY);

  if (!savedSettings) {
    return null;
  }

  try {
    const settings = JSON.parse(
      savedSettings
    ) as LandlordSettings;

    if (
      !settings.businessName?.trim() ||
      !settings.phoneNumber?.trim() ||
      !settings.receiptPrefix?.trim()
    ) {
      return null;
    }

    return settings;
  } catch {
    return null;
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