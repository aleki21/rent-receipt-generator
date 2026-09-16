import type { Receipt } from "../../types/receipt";
import { formatDate } from "../../utils/date";

interface ReceiptPreviewProps {
  receipt: Receipt;
}

function ReceiptPreview({ receipt }: ReceiptPreviewProps) {
  return (
    <section className="mt-8 w-full max-w-2xl">
      <div className="rounded-xl bg-white p-8 shadow-sm">
        {/* Header */}
        <div className="border-b pb-6 text-center">
          <h2 className="text-2xl font-bold">
            {receipt.landlord.businessName}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            RENT PAYMENT RECEIPT
          </p>

          <p className="mt-4 text-sm font-medium">
            Receipt No: {receipt.receiptNumber}
          </p>
        </div>

        {/* Landlord information */}
        <div className="border-b py-6">
          <h3 className="font-semibold">
            Landlord Details
          </h3>

          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <p>{receipt.landlord.businessName}</p>

            <p>
              Phone: {receipt.landlord.phoneNumber}
            </p>

            {receipt.landlord.address && (
              <p>
                Address: {receipt.landlord.address}
              </p>
            )}

            {receipt.landlord.email && (
              <p>
                Email: {receipt.landlord.email}
              </p>
            )}
          </div>
        </div>

        {/* Tenant / payer */}
        <div className="border-b py-6">
          <h3 className="font-semibold">
            Payment From
          </h3>

          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <p>{receipt.payment.payerName}</p>

            <p>
              Phone: {receipt.payment.phoneNumber}
            </p>
          </div>
        </div>

        {/* Payment */}
        <div className="border-b py-6">
          <h3 className="font-semibold">
            Payment Details
          </h3>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">
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

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">
                Payment Method
              </span>

              <span className="font-medium">
                {receipt.paymentMethod}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">
                Transaction Code
              </span>

              <span className="font-medium">
                {receipt.payment.transactionCode}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">
                Payment Date
              </span>

              <span className="font-medium">
                {receipt.payment.paymentDate}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">
                Payment Time
              </span>

              <span className="font-medium">
                {receipt.payment.paymentTime}
              </span>
            </div>
          </div>
        </div>

        {/* Rental period */}
        <div className="border-b py-6">
          <h3 className="font-semibold">
            Rental Period
          </h3>

          <div className="mt-3 space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium text-gray-900">
                From:
              </span>{" "}
              {formatDate(receipt.rentalPeriod.startDate)}
            </p>

            <p>
              <span className="font-medium text-gray-900">
                To:
              </span>{" "}
              {formatDate(receipt.rentalPeriod.endDate)}
            </p>

            {receipt.rentalPeriod.description && (
              <p>
                {receipt.rentalPeriod.description}
              </p>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="py-6 text-center">
          <p className="text-lg font-bold">
            PAID
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Issued on {formatDate(receipt.issueDate)}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ReceiptPreview;