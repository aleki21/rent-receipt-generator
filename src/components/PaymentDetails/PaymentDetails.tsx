import type { PaymentDetails as PaymentDetailsType } from "../../types/receipt";

interface PaymentDetailsProps {
  payment: PaymentDetailsType;
  onConfirm: () => void;
  onEdit: () => void;
}

function PaymentDetails({
  payment,
  onConfirm,
  onEdit,
}: PaymentDetailsProps) {
  return (
    <section className="mt-8 w-full max-w-2xl rounded-xl bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold sm:text-xl">
        Payment Details
      </h2>

      <p className="mt-2 text-sm leading-6 text-gray-600">
        Review the payment information extracted from the M-Pesa message.
      </p>

      <div className="mt-6 divide-y rounded-lg border">
        <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-sm text-gray-500">
            Transaction Code
          </p>

          <p className="break-all font-medium">
            {payment.transactionCode}
          </p>
        </div>

        <div className="flex flex-col gap-1 bg-gray-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-sm text-gray-500">
            Amount
          </p>

          <p className="text-xl font-bold sm:text-lg">
            Ksh{" "}
            {payment.amount.toLocaleString("en-KE", {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-sm text-gray-500">
            Paid By
          </p>

          <p className="break-words font-medium">
            {payment.payerName}
          </p>
        </div>

        <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-sm text-gray-500">
            Phone
          </p>

          <p className="font-medium">
            {payment.phoneNumber}
          </p>
        </div>

        <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-sm text-gray-500">
            Date
          </p>

          <p className="font-medium">
            {payment.paymentDate}
          </p>
        </div>

        <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-sm text-gray-500">
            Time
          </p>

          <p className="font-medium">
            {payment.paymentTime}
          </p>
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
          Edit
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="w-full rounded-lg bg-black px-5 py-3.5 text-sm font-medium text-white"
        >
          Confirm & Continue
        </button>
      </div>
    </section>
  );
}

export default PaymentDetails;