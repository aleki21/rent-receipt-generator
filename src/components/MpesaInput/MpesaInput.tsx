import { useState } from "react";
import {
  parseMpesaMessage,
  type ParseResult,
} from "../../services/mpesaParser";

interface MpesaInputProps {
  onParsed: (result: ParseResult) => void;
}

function MpesaInput({ onParsed }: MpesaInputProps) {
  const [message, setMessage] = useState("");

  function handleExtract() {
    const result = parseMpesaMessage(message);
    onParsed(result);
  }

  function handleClear() {
    setMessage("");
    onParsed({
      success: false,
      errors: [],
    });
  }

  return (
    <section className="w-full max-w-2xl">
      <h2 className="text-lg font-semibold sm:text-xl">
        Paste M-Pesa confirmation
      </h2>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        Copy the complete M-Pesa payment confirmation and paste it below.
      </p>

      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Paste the complete M-Pesa confirmation message here..."
        className="mt-4 min-h-52 w-full resize-y rounded-lg border border-gray-300 bg-white p-4 text-sm leading-6 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
      />

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleClear}
          className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium"
        >
          Clear
        </button>

        <button
          type="button"
          onClick={handleExtract}
          disabled={!message.trim()}
          className="w-full rounded-lg bg-black px-5 py-3.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Extract Payment
        </button>
      </div>
    </section>
  );
}

export default MpesaInput;