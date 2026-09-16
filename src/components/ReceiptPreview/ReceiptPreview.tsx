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
      <div className="rounded-xl bg-white shadow-sm">
        {/* Receipt Header */}
        <div className="border-b px-8 py-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            {currentReceipt.landlord.businessName}
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
              {currentReceipt.receiptNumber}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Issue Date
            </p>

            <p className="mt-1 font-semibold">
              {formatDate(currentReceipt.issueDate)}
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
              {currentReceipt.landlord.businessName}
            </p>

            <p className="text-gray-600">
              {currentReceipt.landlord.phoneNumber}
            </p>

            {currentReceipt.landlord.address && (
              <p className="text-gray-600">
                {currentReceipt.landlord.address}
              </p>
            )}

            {currentReceipt.landlord.email && (
              <p className="text-gray-600">
                {currentReceipt.landlord.email}
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
              {currentReceipt.payment.payerName}
            </p>

            <p className="text-gray-600">
              {currentReceipt.payment.phoneNumber}
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
                {currentReceipt.payment.amount.toLocaleString(
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
                {currentReceipt.paymentMethod}
              </span>
            </div>

            <div className="flex justify-between gap-4 px-4 py-3">
              <span className="text-sm text-gray-500">
                Transaction Code
              </span>

              <span className="text-sm font-medium">
                {currentReceipt.payment.transactionCode}
              </span>
            </div>

            <div className="flex justify-between gap-4 px-4 py-3">
              <span className="text-sm text-gray-500">
                Payment Date
              </span>

              <span className="text-sm font-medium">
                {formatDate(
                  currentReceipt.payment.paymentDate
                )}
              </span>
            </div>

            <div className="flex justify-between gap-4 px-4 py-3">
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
              <p className="mt-4 border-t pt-4 text-sm text-gray-600">
                {currentReceipt.rentalPeriod.description}
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
          className="rounded-lg bg-black px-5 py-3 text-center font-medium text-white"
        >
          Download PDF
        </PDFDownloadLink>

        <button
          type="button"
          onClick={handleShare}
          disabled={isSharing}
          className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium disabled:opacity-50"
        >
          {isSharing ? "Preparing PDF..." : "Share PDF"}
        </button>
      </div>

      {/* Start Over */}
      <button
        type="button"
        onClick={onStartOver}
        className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium"
      >
        Start New Receipt
      </button>
    </section>
  );
}

export default ReceiptPreview;