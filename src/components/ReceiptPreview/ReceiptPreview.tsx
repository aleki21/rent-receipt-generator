import type { Receipt } from "../../types/receipt";
import { formatDate } from "../../utils/date";

interface ReceiptPreviewProps {
  receipt: Receipt;
}

function ReceiptPreview({ receipt }: ReceiptPreviewProps) {
  return (
    <section className="mt-8 w-full max-w-2xl">
      <div className="rounded-xl bg-white shadow-sm">
        {/* Receipt Header */}
        <div className="border-b px-8 py-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            {receipt.landlord.businessName}
          </h2>

          <p className="mt-2 text-sm font-semibold tracking-widest text-gray-500">
            RENT PAYMENT RECEIPT
          </p>

          <div className="mt-5 inline-block rounded-full bg-green-100 px-4 py-2">
            <span className="text-sm font-bold text-green-700">
              PAID
            </span>
          </div>
        </div>

        {/* Receipt Information */}
        <div className="grid grid-cols-2 gap-6 border-b px-8 py-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Receipt Number
            </p>

            <p className="mt-1 font-semibold">
              {receipt.receiptNumber}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Issue Date
            </p>

            <p className="mt-1 font-semibold">
              {formatDate(receipt.issueDate)}
            </p>
          </div>
        </div>

        {/* Landlord Details */}
        <div className="border-b px-8 py-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Landlord Details
          </h3>

          <div className="mt-3 space-y-1 text-sm">
            <p className="font-medium">
              {receipt.landlord.businessName}
            </p>

            <p className="text-gray-600">
              {receipt.landlord.phoneNumber}
            </p>

            {receipt.landlord.address && (
              <p className="text-gray-600">
                {receipt.landlord.address}
              </p>
            )}

            {receipt.landlord.email && (
              <p className="text-gray-600">
                {receipt.landlord.email}
              </p>
            )}
          </div>
        </div>

        {/* Payer Details */}
        <div className="border-b px-8 py-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Payment From
          </h3>

          <div className="mt-3 space-y-1 text-sm">
            <p className="font-medium">
              {receipt.payment.payerName}
            </p>

            <p className="text-gray-600">
              {receipt.payment.phoneNumber}
            </p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="border-b px-8 py-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Payment Details
          </h3>

          <div className="mt-4 divide-y rounded-lg border">
            <div className="flex justify-between gap-4 px-4 py-3">
              <span className="text-sm text-gray-500">
                Amount
              </span>

              <span className="font-semibold">
                Ksh{" "}
                {receipt.payment.amount.toLocaleString(
                  "en-KE",
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </span>
            </div>

            <div className="flex justify-between gap-4 px-4 py-3">
              <span className="text-sm text-gray-500">
                Payment Method
              </span>

              <span className="text-sm font-medium">
                {receipt.paymentMethod}
              </span>
            </div>

            <div className="flex justify-between gap-4 px-4 py-3">
              <span className="text-sm text-gray-500">
                Transaction Code
              </span>

              <span className="text-sm font-medium">
                {receipt.payment.transactionCode}
              </span>
            </div>

            <div className="flex justify-between gap-4 px-4 py-3">
              <span className="text-sm text-gray-500">
                Payment Date
              </span>

              <span className="text-sm font-medium">
                {formatDate(receipt.payment.paymentDate)}
              </span>
            </div>

            <div className="flex justify-between gap-4 px-4 py-3">
              <span className="text-sm text-gray-500">
                Payment Time
              </span>

              <span className="text-sm font-medium">
                {receipt.payment.paymentTime}
              </span>
            </div>
          </div>
        </div>

        {/* Rental Period */}
        <div className="border-b px-8 py-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Rental Period
          </h3>

          <div className="mt-4 rounded-lg bg-gray-50 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">
                  Start
                </p>

                <p className="mt-1 text-sm font-medium">
                  {formatDate(
                    receipt.rentalPeriod.startDate
                  )}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  End
                </p>

                <p className="mt-1 text-sm font-medium">
                  {formatDate(
                    receipt.rentalPeriod.endDate
                  )}
                </p>
              </div>
            </div>

            {receipt.rentalPeriod.description && (
              <p className="mt-4 border-t pt-4 text-sm text-gray-600">
                {receipt.rentalPeriod.description}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-8 text-center">
          <p className="text-sm font-medium">
            Thank you for your payment.
          </p>

          <p className="mt-2 text-xs text-gray-500">
            This is a rent payment receipt generated from
            an M-Pesa payment confirmation.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ReceiptPreview;