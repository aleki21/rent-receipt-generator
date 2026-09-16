import { useState } from "react";
import type { RentalPeriod } from "../../types/receipt";

interface RentalPeriodFormProps {
  onSubmit: (period: RentalPeriod) => void;
}

function RentalPeriodForm({
  onSubmit,
}: RentalPeriodFormProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!startDate || !endDate) {
      setError("Please enter both the start and end dates.");
      return;
    }

    if (endDate < startDate) {
      setError(
        "The rental period end date cannot be before the start date."
      );
      return;
    }

    const period: RentalPeriod = {
      startDate,
      endDate,
      description: description.trim() || undefined,
    };

    onSubmit(period);
  }

  return (
    <section className="mt-8 w-full max-w-2xl rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        Rental Period
      </h2>

      <p className="mt-2 text-gray-600">
        Enter the period covered by this payment.
      </p>

      {error && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">
            {error}
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium"
          >
            Payment period start
          </label>

          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(event) => {
              setStartDate(event.target.value);
              setError("");
            }}
            required
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3"
          />
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium"
          >
            Payment period end
          </label>

          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(event) => {
              setEndDate(event.target.value);
              setError("");
            }}
            required
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium"
          >
            Description
          </label>

          <input
            id="description"
            type="text"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="e.g. Rent for September 2026"
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-black px-5 py-3 font-medium text-white"
        >
          Continue
        </button>
      </form>
    </section>
  );
}

export default RentalPeriodForm;