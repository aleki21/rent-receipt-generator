import { useState } from "react";
import type { PaymentDetails as PaymentDetailsType } from "../../types/receipt";

interface PaymentDetailsProps {
  payment: PaymentDetailsType;
  onConfirm: (payment: PaymentDetailsType) => void;
  onEdit: () => void;
}

function PaymentDetails({
  payment,
  onConfirm,
  onEdit,
}: PaymentDetailsProps) {
  const [transactionCode, setTransactionCode] =
    useState(payment.transactionCode);

  const [amount, setAmount] = useState(
    String(payment.amount)
  );

  const [payerName, setPayerName] = useState(
    payment.payerName
  );

  const [phoneNumber, setPhoneNumber] = useState(
    payment.phoneNumber
  );

  const [paymentDate, setPaymentDate] = useState(
    payment.paymentDate
  );

  const [paymentTime, setPaymentTime] = useState(
    payment.paymentTime
  );

  const [error, setError] = useState("");

  function handleConfirm() {
    setError("");

    const numericAmount = Number(amount);

    if (!transactionCode.trim()) {
      setError("Please enter the transaction code.");
      return;
    }

    if (
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      setError("Please enter a valid payment amount.");
      return;
    }

    if (!payerName.trim()) {
      setError("Please enter the payer name.");
      return;
    }

    if (!phoneNumber.trim()) {
      setError("Please enter the payer phone number.");
      return;
    }

    if (!paymentDate.trim()) {
      setError("Please enter the payment date.");
      return;
    }

    if (!paymentTime.trim()) {
      setError("Please enter the payment time.");
      return;
    }

    const updatedPayment: PaymentDetailsType = {
      transactionCode:
        transactionCode.trim().toUpperCase(),
      amount: numericAmount,
      payerName: payerName.trim(),
      phoneNumber: phoneNumber.trim(),
      paymentDate: paymentDate.trim(),
      paymentTime: paymentTime.trim(),
    };

    onConfirm(updatedPayment);
  }

  return (
    <section className="mt-8 w-full max-w-2xl rounded-xl bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold sm:text-xl">
        Confirm Payment Details
      </h2>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        Check the extracted information and correct
        anything that is inaccurate.
      </p>

      {error && (
        <div
          role="alert"
          className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4"
        >
          <p className="text-sm font-medium leading-6 text-red-700">
            {error}
          </p>
        </div>
      )}

      <div className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="transactionCode"
            className="block text-sm font-medium"
          >
            Transaction Code
          </label>

          <input
            id="transactionCode"
            type="text"
            value={transactionCode}
            onChange={(event) => {
              setTransactionCode(event.target.value);
              setError("");
            }}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3.5 text-sm uppercase outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium"
          >
            Amount
          </label>

          <input
            id="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value);
              setError("");
            }}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3.5 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label
            htmlFor="payerName"
            className="block text-sm font-medium"
          >
            Payer Name
          </label>

          <input
            id="payerName"
            type="text"
            value={payerName}
            onChange={(event) => {
              setPayerName(event.target.value);
              setError("");
            }}
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
            onChange={(event) => {
              setPhoneNumber(event.target.value);
              setError("");
            }}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3.5 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label
            htmlFor="paymentDate"
            className="block text-sm font-medium"
          >
            Payment Date
          </label>

          <input
            id="paymentDate"
            type="text"
            value={paymentDate}
            onChange={(event) => {
              setPaymentDate(event.target.value);
              setError("");
            }}
            placeholder="e.g. 14/9/26"
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3.5 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label
            htmlFor="paymentTime"
            className="block text-sm font-medium"
          >
            Payment Time
          </label>

          <input
            id="paymentTime"
            type="text"
            value={paymentTime}
            onChange={(event) => {
              setPaymentTime(event.target.value);
              setError("");
            }}
            placeholder="e.g. 10:42 AM"
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3.5 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />
        </div>
      </div>

      <p className="mt-8 text-sm font-semibold">
        Are these payment details correct?
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onEdit}
          className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium"
        >
          Back to Message
        </button>

        <button
          type="button"
          onClick={handleConfirm}
          className="w-full rounded-lg bg-black px-5 py-3.5 text-sm font-medium text-white"
        >
          Confirm & Continue
        </button>
      </div>
    </section>
  );
}

export default PaymentDetails;