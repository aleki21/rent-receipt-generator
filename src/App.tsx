import { useState } from "react";
import MpesaInput from "./components/MpesaInput/MpesaInput";
import PaymentDetails from "./components/PaymentDetails/PaymentDetails";
import RentalPeriodForm from "./components/RentalPeriodForm/RentalPeriodForm";
import ReceiptPreview from "./components/ReceiptPreview/ReceiptPreview";
import ProgressIndicator from "./components/ProgressIndicator/ProgressIndicator";
import Settings from "./components/Settings/Settings";
import type {
  LandlordSettings,
  PaymentDetails as PaymentDetailsType,
  RentalPeriod,
  Receipt,
} from "./types/receipt";
import type { ParseResult } from "./services/mpesaParser";
import type { ReceiptStep } from "./types/workflow";
import { getToday } from "./utils/date";
import {
  getLandlordSettings,
  saveLandlordSettings,
} from "./utils/settings";

function App() {
  const [step, setStep] =
    useState<ReceiptStep>("input");

  const [parseResult, setParseResult] =
    useState<ParseResult | null>(null);

  const [, setRentalPeriod] =
    useState<RentalPeriod | null>(null);

  const [receipt, setReceipt] =
    useState<Receipt | null>(null);

  const [landlord, setLandlord] =
    useState<LandlordSettings>(
      getLandlordSettings()
    );

  const [showSettings, setShowSettings] =
    useState(false);

  function handleParsed(result: ParseResult) {
    setParseResult(result);
    setRentalPeriod(null);
    setReceipt(null);

    if (result.success) {
      setStep("payment-confirmation");
    } else {
      setStep("input");
    }
  }

  function handleConfirm(
    updatedPayment: PaymentDetailsType
  ) {
    setParseResult({
      success: true,
      data: updatedPayment,
      errors: [],
    });

    setStep("rental-period");
  }

  function handleEdit() {
    setStep("input");
  }

  function handleRentalPeriodSubmit(
    period: RentalPeriod
  ) {
    setRentalPeriod(period);

    if (
      parseResult?.success &&
      parseResult.data
    ) {
      const newReceipt: Receipt = {
        receiptNumber: "DRAFT",
        issueDate: getToday(),
        payment: parseResult.data,
        rentalPeriod: period,
        landlord,
        paymentMethod: "M-PESA",
      };

      setReceipt(newReceipt);
      setStep("preview");
    }
  }

  function handleSaveSettings(
    settings: LandlordSettings
  ) {
    saveLandlordSettings(settings);
    setLandlord(settings);
    setShowSettings(false);
  }

  function handleStartOver() {
    setParseResult(null);
    setRentalPeriod(null);
    setReceipt(null);
    setStep("input");
  }

  const payment = parseResult?.success
    ? parseResult.data
    : undefined;

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-4xl">
        <ProgressIndicator currentStep={step} />

        <header className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              M-Pesa Rent Receipt Generator
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
              Generate a rental payment receipt from an
              M-Pesa confirmation.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setShowSettings(!showSettings)
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium sm:w-auto"
          >
            {showSettings
              ? "Close Settings"
              : "Settings"}
          </button>
        </header>

        {showSettings && (
          <Settings
            settings={landlord}
            onSave={handleSaveSettings}
          />
        )}

        {step === "input" && (
          <>
            <MpesaInput
              onParsed={handleParsed}
            />

            {parseResult &&
              !parseResult.success && (
                <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4 sm:p-5">
                  <h2 className="font-semibold text-red-800">
                    We couldn't process this message
                  </h2>

                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-red-700">
                    {parseResult.errors.map(
                      (error) => (
                        <li key={error}>
                          {error}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
          </>
        )}

        {step === "payment-confirmation" &&
          payment && (
            <PaymentDetails
              payment={payment}
              onConfirm={handleConfirm}
              onEdit={handleEdit}
            />
          )}

        {step === "rental-period" &&
          payment && (
            <RentalPeriodForm
              onSubmit={
                handleRentalPeriodSubmit
              }
            />
          )}

        {step === "preview" && receipt && (
          <ReceiptPreview
            receipt={receipt}
            onStartOver={handleStartOver}
          />
        )}
      </div>
    </main>
  );
}

export default App;