import { useState } from "react";
import type { LandlordSettings } from "../../types/receipt";

interface SettingsProps {
  settings: LandlordSettings;
  onSave: (settings: LandlordSettings) => void;
}

function Settings({
  settings,
  onSave,
}: SettingsProps) {
  const [businessName, setBusinessName] = useState(
    settings.businessName
  );

  const [phoneNumber, setPhoneNumber] = useState(
    settings.phoneNumber
  );

  const [email, setEmail] = useState(
    settings.email || ""
  );

  const [address, setAddress] = useState(
    settings.address || ""
  );

  const [receiptPrefix, setReceiptPrefix] = useState(
    settings.receiptPrefix
  );

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const updatedSettings: LandlordSettings = {
      businessName: businessName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim() || undefined,
      address: address.trim() || undefined,
      receiptPrefix:
        receiptPrefix.trim().toUpperCase() || "REC",
    };

    onSave(updatedSettings);
  }

  return (
    <section className="mt-8 w-full max-w-2xl rounded-xl bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold sm:text-xl">
        Landlord Settings
      </h2>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        These details will appear on your receipts.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >
        <div>
          <label
            htmlFor="businessName"
            className="block text-sm font-medium"
          >
            Business / Landlord Name
          </label>

          <input
            id="businessName"
            type="text"
            value={businessName}
            onChange={(event) =>
              setBusinessName(event.target.value)
            }
            required
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3.5 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium"
          >
            Phone Number
          </label>

          <input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(event) =>
              setPhoneNumber(event.target.value)
            }
            required
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3.5 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium"
          >
            Email
            <span className="ml-1 font-normal text-gray-500">
              (optional)
            </span>
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="example@email.com"
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3.5 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium"
          >
            Address
            <span className="ml-1 font-normal text-gray-500">
              (optional)
            </span>
          </label>

          <input
            id="address"
            type="text"
            value={address}
            onChange={(event) =>
              setAddress(event.target.value)
            }
            placeholder="e.g. Nairobi, Kenya"
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3.5 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label
            htmlFor="receiptPrefix"
            className="block text-sm font-medium"
          >
            Receipt Number Prefix
          </label>

          <input
            id="receiptPrefix"
            type="text"
            value={receiptPrefix}
            onChange={(event) =>
              setReceiptPrefix(event.target.value)
            }
            placeholder="REC"
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3.5 text-sm uppercase outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />

          <p className="mt-2 text-xs leading-5 text-gray-500">
            Example: REC-00001
          </p>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-black px-5 py-3.5 text-sm font-medium text-white"
        >
          Save Settings
        </button>
      </form>
    </section>
  );
}

export default Settings;