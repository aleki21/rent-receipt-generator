import { useState } from "react";
import MpesaInput from "./components/MpesaInput/MpesaInput";
import PaymentDetails from "./components/PaymentDetails/PaymentDetails";
import RentalPeriodForm from "./components/RentalPeriodForm/RentalPeriodForm";
import ReceiptPreview from "./components/ReceiptPreview/ReceiptPreview";
import type {
  LandlordSettings,
  RentalPeriod,
  Receipt,
} from "./types/receipt";
import type { ParseResult } from "./services/mpesaParser";
import { getNextReceiptNumber } from "./utils/receiptNumber";
import { getToday } from "./utils/date";

function App() {
  const [parseResult, setParseResult] =
    useState<ParseResult | null>(null);

  const [confirmed, setConfirmed] = useState(false);

  const [, setRentalPeriod] =
    useState<RentalPeriod | null>(null);

  const [receipt, setReceipt] =
    useState<Receipt | null>(null);

  const landlord: LandlordSettings = {
    businessName: "Alex Rentals",
    phoneNumber: "0712345678",
    address: "Nairobi, Kenya",
    receiptPrefix: "REC",
  };

  function handleParsed(result: ParseResult) {
    setParseResult(result);
    setConfirmed(false);
    setRentalPeriod(null);
    setReceipt(null);
  }

  function handleConfirm() {
    setConfirmed(true);
  }

  function handleEdit() {
    setConfirmed(false);
  }

  function handleRentalPeriodSubmit(period: RentalPeriod) {
    setRentalPeriod(period);

    if (parseResult?.success && parseResult.data) {
      const newReceipt: Receipt = {
        receiptNumber: getNextReceiptNumber(
          landlord.receiptPrefix
        ),
        issueDate: getToday(),
        payment: parseResult.data,
        rentalPeriod: period,
        landlord,
        paymentMethod: "M-PESA",
      };

      setReceipt(newReceipt);
    }
  }

  const payment = parseResult?.success
    ? parseResult.data
    : undefined;

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10">
          <h1 className="text-3xl font-bold">
            M-Pesa Rent Receipt Generator
          </h1>

          <p className="mt-2 text-gray-600">
            Generate a rental payment receipt from an M-Pesa
            confirmation.
          </p>
        </header>

        <MpesaInput onParsed={handleParsed} />

        {payment && !confirmed && (
          <PaymentDetails
            payment={payment}
            onConfirm={handleConfirm}
            onEdit={handleEdit}
          />
        )}

        {parseResult && !parseResult.success && (
          <div className="mt-8 rounded-lg border border-red-200 bg-red-50 p-5">
            <h2 className="font-semibold text-red-800">
              We couldn't process this message
            </h2>

            <ul className="mt-3 list-disc pl-5 text-red-700">
              {parseResult.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {confirmed && payment && (
          <RentalPeriodForm
            onSubmit={handleRentalPeriodSubmit}
          />
        )}

        {receipt && (
          <ReceiptPreview receipt={receipt} />
        )}
      </div>
    </main>
  );
}

export default App;