import { useState } from "react";
import MpesaInput from "./components/MpesaInput/MpesaInput";
import PaymentDetails from "./components/PaymentDetails/PaymentDetails";
import type { ParseResult } from "./services/mpesaParser";

function App() {
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  function handleParsed(result: ParseResult) {
    setParseResult(result);
    setConfirmed(false);
  }

  function handleConfirm() {
    setConfirmed(true);
  }

  function handleEdit() {
    setConfirmed(false);
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
            Generate a rental payment receipt from an M-Pesa confirmation.
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

        {confirmed && (
          <div className="mt-8 rounded-lg bg-green-50 p-5">
            <p className="font-medium text-green-800">
              Payment details confirmed.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;