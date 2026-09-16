import { useState } from "react";
import MpesaInput from "./components/MpesaInput/MpesaInput";
import type { ParseResult } from "./services/mpesaParser";

function App() {
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);

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

        <MpesaInput onParsed={setParseResult} />

        {parseResult && (
          <pre className="mt-8 overflow-auto rounded-lg bg-white p-5">
            {JSON.stringify(parseResult, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}

export default App;