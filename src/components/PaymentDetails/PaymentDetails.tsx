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
    <section className="mt-8 w-full max-w-2xl rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        Payment Details
      </h2>

      <div className="mt-6 space-y-5">
        <div>
          <p className="text-sm text-gray-500">Transaction Code</p>
          <p className="font-medium">{payment.transactionCode}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Amount</p>
          <p className="text-lg font-semibold">
            Ksh {payment.amount.toLocaleString("en-KE", {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Paid By</p>
          <p className="font-medium">{payment.payerName}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">{payment.phoneNumber}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p className="font-medium">{payment.paymentDate}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Time</p>
          <p className="font-medium">{payment.paymentTime}</p>
        </div>
      </div>

      <p className="mt-8 font-medium">
        Are these payment details correct?
      </p>

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={onEdit}
          className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={onConfirm}
          className="rounded-lg bg-black px-5 py-3 font-medium text-white"
        >
          Confirm & Continue
        </button>
      </div>
    </section>
  );
}

export default PaymentDetails;