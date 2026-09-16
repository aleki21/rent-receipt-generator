import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
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

  const [isDownloading, setIsDownloading] =
    useState(false);

  const [isSharing, setIsSharing] =
    useState(false);

  const currentReceipt =
    finalReceipt ?? receipt;

  function handleFinalize(): Receipt {
    if (finalReceipt) {
      return finalReceipt;
    }

    const finalized =
      finalizeReceipt(receipt);

    setFinalReceipt(finalized);

    return finalized;
  }

  async function handleDownload() {
    try {
      setIsDownloading(true);

      const receiptToDownload =
        handleFinalize();

      const blob = await pdf(
        <ReceiptPDF
          receipt={receiptToDownload}
        />
      ).toBlob();

      const fileName = `${receiptToDownload.receiptNumber}-${receiptToDownload.payment.payerName.replace(
        /\s+/g,
        "-"
      )}.pdf`;

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Failed to download receipt:",
        error
      );

      alert(
        "We couldn't download the receipt. Please try again."
      );
    } finally {
      setIsDownloading(false);
    }
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

      const receiptToShare =
        handleFinalize();

      const blob = await pdf(
        <ReceiptPDF
          receipt={receiptToShare}
        />
      ).toBlob();

      const fileName = `${receiptToShare.receiptNumber}-${receiptToShare.payment.payerName.replace(
        /\s+/g,
        "-"
      )}.pdf`;

      const file = new File(
        [blob],
        fileName,
        {
          type: "application/pdf",
        }
      );

      if (
        navigator.canShare &&
        !navigator.canShare({
          files: [file],
        })
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

      console.error(
        "Failed to share receipt:",
        error
      );

      alert(
        "We couldn't share the receipt. Please download the PDF instead."
      );
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <section className="mt-8 w-full max-w-2xl">
      {/* Receipt */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {/* Header */}
        <div className="border-b px-5 py-7 text-center sm:px-8">
          <h2 className="break-words text-2xl font-bold tracking-tight">
            {currentReceipt.landlord.businessName}
          </h2>

          <div className="mt-2 space-y-1 text-sm text-gray-500">
            <p>
              {currentReceipt.landlord.phoneNumber}
            </p>

            {currentReceipt.landlord.address && (
              <p>
                {currentReceipt.landlord.address}
              </p>
            )}

            {currentReceipt.landlord.email && (
              <p className="break-all">
                {currentReceipt.landlord.email}
              </p>
            )}
          </div>

          <p className="mt-5 text-xs font-semibold tracking-[0.2em] text-gray-500">
            RENT PAYMENT RECEIPT
          </p>

          <div className="mt-4 inline-flex rounded-full bg-green-100 px-4 py-2">
            <span className="text-sm font-bold text-green-700">
              PAID
            </span>
          </div>
        </div>

        {/* Receipt information */}
        <div className="grid grid-cols-1 gap-5 border-b px-5 py-5 sm:grid-cols-2 sm:px-8">
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
              {formatDate(
                currentReceipt.issueDate
              )}
            </p>
          </div>
        </div>

        {/* Amount */}
        <div className="border-b px-5 py-6 sm:px-8">
          <div className="rounded-xl bg-gray-50 px-5 py-6 text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
              Amount Received
            </p>

            <p className="mt-2 text-3xl font-bold tracking-tight">
              Ksh{" "}
              {currentReceipt.payment.amount.toLocaleString(
                "en-KE",
                {
                  minimumFractionDigits: 2,
                }
              )}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Payment Method:{" "}
              {currentReceipt.paymentMethod}
            </p>
          </div>
        </div>

        {/* Paid by */}
        <div className="border-b px-5 py-5 sm:px-8">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Paid By
          </h3>

          <p className="mt-3 text-base font-semibold">
            {currentReceipt.payment.payerName}
          </p>

          <p className="mt-1 text-sm text-gray-600">
            {currentReceipt.payment.phoneNumber}
          </p>
        </div>

        {/* Transaction details */}
        <div className="border-b px-5 py-5 sm:px-8">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Transaction Details
          </h3>

          <div className="mt-4 divide-y rounded-lg border">
            <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4">
              <span className="text-sm text-gray-500">
                Transaction Code
              </span>

              <span className="break-all text-sm font-semibold sm:text-right">
                {currentReceipt.payment.transactionCode}
              </span>
            </div>

            <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4">
              <span className="text-sm text-gray-500">
                Payment Date
              </span>

              <span className="text-sm font-semibold sm:text-right">
                {formatDate(
                  currentReceipt.payment.paymentDate
                )}
              </span>
            </div>

            <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4">
              <span className="text-sm text-gray-500">
                Payment Time
              </span>

              <span className="text-sm font-semibold sm:text-right">
                {currentReceipt.payment.paymentTime}
              </span>
            </div>
          </div>
        </div>

        {/* Rental period */}
        <div className="border-b px-5 py-5 sm:px-8">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Rental Period
          </h3>

          <div className="mt-4 rounded-lg bg-gray-50 p-4">
            <p className="text-sm font-semibold">
              {formatDate(
                currentReceipt.rentalPeriod.startDate
              )}{" "}
              –{" "}
              {formatDate(
                currentReceipt.rentalPeriod.endDate
              )}
            </p>

            {currentReceipt.rentalPeriod
              .description && (
              <p className="mt-2 text-sm text-gray-600">
                {
                  currentReceipt.rentalPeriod
                    .description
                }
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-7 text-center sm:px-8">
          <p className="text-sm font-semibold">
            Thank you for your payment.
          </p>

          <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-gray-500">
            This is a rent payment receipt
            generated from an M-Pesa payment
            confirmation.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full rounded-lg bg-black px-5 py-3.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDownloading
            ? "Preparing PDF..."
            : "Download PDF"}
        </button>

        <button
          type="button"
          onClick={handleShare}
          disabled={isSharing}
          className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSharing
            ? "Preparing PDF..."
            : "Share PDF"}
        </button>
      </div>

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