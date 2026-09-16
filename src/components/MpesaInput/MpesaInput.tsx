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
      <h2 className="text-xl font-semibold">
        Paste M-Pesa confirmation
      </h2>

      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Paste the complete M-Pesa confirmation message here..."
        className="mt-3 w-full min-h-48 rounded-lg border border-gray-300 bg-white p-4 outline-none focus:ring-2"
      />

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={handleClear}
          className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium"
        >
          Clear
        </button>

        <button
          type="button"
          onClick={handleExtract}
          disabled={!message.trim()}
          className="rounded-lg bg-black px-5 py-3 font-medium text-white disabled:opacity-50"
        >
          Extract Payment
        </button>
      </div>
    </section>
  );
}

export default MpesaInput;