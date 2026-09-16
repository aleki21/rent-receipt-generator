import { useState } from "react";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import type { Receipt } from "../../types/receipt";
import { formatDate } from "../../utils/date";
import ReceiptPDF from "../ReceiptPDF/ReceiptPDF";
import { finalizeReceipt } from "../../services/receiptService";

interface ReceiptPreviewProps {
  receipt: Receipt;
  onStartOver: () => void;
}

function ReceiptPreview({
  receipt,
  onStartOver,
}: ReceiptPreviewProps) {
  const [finalReceipt, setFinalReceipt] =
    useState<Receipt | null>(null);

  const [isSharing, setIsSharing] = useState(false);

  const currentReceipt = finalReceipt ?? receipt;

  function handleFinalize() {
    if (finalReceipt) {
      return finalReceipt;
    }

    const finalized = finalizeReceipt(receipt);

    setFinalReceipt(finalized);

    return finalized;
  }

  async function handleShare() {
    if (!navigator.share) {
      alert(
        "Sharing is not supported on this device. Please download the PDF instead."
      );
      return;
    }

    try {
      setIsSharing(true);

      const receiptToShare = handleFinalize();

      const blob = await pdf(
        <ReceiptPDF receipt={receiptToShare} />
      ).toBlob();

      const fileName = `${receiptToShare.receiptNumber}-${receiptToShare.payment.payerName.replace(
        /\s+/g,
        "-"
      )}.pdf`;

      const file = new File([blob], fileName, {
        type: "application/pdf",
      });

      if (
        navigator.canShare &&
        !navigator.canShare({ files: [file] })
      ) {
        alert(
          "This device cannot share PDF files. Please download the PDF instead."
        );
        return;
      }

      await navigator.share({
        title: `Rent Receipt ${receiptToShare.receiptNumber}`,
        text: `Rent payment receipt for ${receiptToShare.payment.payerName}`,
        files: [file],
      });
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      console.error("Failed to share receipt:", error);

      alert(
        "We couldn't share the receipt. Please download the PDF instead."
      );
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <section className="mt-8 w-full max-w-2xl">
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {/* Receipt Header */}
        <div className="border-b px-5 py-6 text-center sm:px-8 sm:py-8">
          <h2 className="break-words text-xl font-bold tracking-tight sm:text-2xl">
            {currentReceipt.landlord.businessName}
          </h2>

          <p className="mt-2 text-xs font-semibold tracking-widest text-gray-500 sm:text-sm">
            RENT PAYMENT RECEIPT
          </p>

          <div className="mt-5 inline-block rounded-full bg-green-100 px-4 py-2">
            <span className="text-sm font-bold text-green-700">
              PAID
            </span>
          </div>
        </div>

        {/* Receipt Information */}
        <div className="grid grid-cols-1 gap-4 border-b px-5 py-5 sm:grid-cols-2 sm:gap-6 sm:px-8 sm:py-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Receipt Number
            </p>

            <p className="mt-1 break-all font-semibold">
              {currentReceipt.receiptNumber}
            </p>
          </div>

          <div className="sm:text-right">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Issue Date
            </p>

            <p className="mt-1 font-semibold">
              {formatDate(currentReceipt.issueDate)}
            </p>
          </div>
        </div>

        {/* Landlord Details */}
        <div className="border-b px-5 py-5 sm:px-8 sm:py-6">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 sm:text-sm">
            Landlord Details
          </h3>

          <div className="mt-3 space-y-1 text-sm">
            <p className="break-words font-medium">
              {currentReceipt.landlord.businessName}
            </p>

            <p className="text-gray-600">
              {currentReceipt.landlord.phoneNumber}
            </p>

            {currentReceipt.landlord.address && (
              <p className="break-words text-gray-600">
                {currentReceipt.landlord.address}
              </p>
            )}

            {currentReceipt.landlord.email && (
              <p className="break-all text-gray-600">
                {currentReceipt.landlord.email}
              </p>
            )}
          </div>
        </div>

        {/* Payer Details */}
        <div className="border-b px-5 py-5 sm:px-8 sm:py-6">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 sm:text-sm">
            Payment From
          </h3>

          <div className="mt-3 space-y-1 text-sm">
            <p className="break-words font-medium">
              {currentReceipt.payment.payerName}
            </p>

            <p className="text-gray-600">
              {currentReceipt.payment.phoneNumber}
            </p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="border-b px-5 py-5 sm:px-8 sm:py-6">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 sm:text-sm">
            Payment Details
          </h3>

          <div className="mt-4 divide-y rounded-lg border">
            <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4">
              <span className="text-sm text-gray-500">
                Amount
              </span>

              <span className="font-semibold">
                Ksh{" "}
                {currentReceipt.payment.amount.toLocaleString(
                  "en-KE",
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </span>
            </div>

            <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4">
              <span className="text-sm text-gray-500">
                Payment Method
              </span>

              <span className="text-sm font-medium">
                {currentReceipt.paymentMethod}
              </span>
            </div>

            <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4">
              <span className="text-sm text-gray-500">
                Transaction Code
              </span>

              <span className="break-all text-sm font-medium">
                {currentReceipt.payment.transactionCode}
              </span>
            </div>

            <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4">
              <span className="text-sm text-gray-500">
                Payment Date
              </span>

              <span className="text-sm font-medium">
                {formatDate(
                  currentReceipt.payment.paymentDate
                )}
              </span>
            </div>

            <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4">
              <span className="text-sm text-gray-500">
                Payment Time
              </span>

              <span className="text-sm font-medium">
                {currentReceipt.payment.paymentTime}
              </span>
            </div>
          </div>
        </div>

        {/* Rental Period */}
        <div className="border-b px-5 py-5 sm:px-8 sm:py-6">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 sm:text-sm">
            Rental Period
          </h3>

          <div className="mt-4 rounded-lg bg-gray-50 p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-gray-500">
                  Start
                </p>

                <p className="mt-1 text-sm font-medium">
                  {formatDate(
                    currentReceipt.rentalPeriod.startDate
                  )}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  End
                </p>

                <p className="mt-1 text-sm font-medium">
                  {formatDate(
                    currentReceipt.rentalPeriod.endDate
                  )}
                </p>
              </div>
            </div>

            {currentReceipt.rentalPeriod.description && (
              <p className="mt-4 break-words border-t pt-4 text-sm text-gray-600">
                {currentReceipt.rentalPeriod.description}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-6 text-center sm:px-8 sm:py-8">
          <p className="text-sm font-medium">
            Thank you for your payment.
          </p>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            This is a rent payment receipt generated from
            an M-Pesa payment confirmation.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <PDFDownloadLink
          document={
            <ReceiptPDF
              receipt={currentReceipt}
            />
          }
          fileName={`${currentReceipt.receiptNumber}-${currentReceipt.payment.payerName.replace(
            /\s+/g,
            "-"
          )}.pdf`}
          onClick={handleFinalize}
          className="w-full rounded-lg bg-black px-5 py-3.5 text-center text-sm font-medium text-white"
        >
          Download PDF
        </PDFDownloadLink>

        <button
          type="button"
          onClick={handleShare}
          disabled={isSharing}
          className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSharing ? "Preparing PDF..." : "Share PDF"}
        </button>
      </div>

      {/* Start Over */}
      <button
        type="button"
        onClick={onStartOver}
        className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium"
      >
        Start New Receipt
      </button>
    </section>
  );
}

export default ReceiptPreview;