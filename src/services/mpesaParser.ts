import type { PaymentDetails } from "../types/receipt";

export interface ParseResult {
  success: boolean;
  data?: PaymentDetails;
  errors: string[];
}

export function parseMpesaMessage(
  message: string
): ParseResult {
  const errors: string[] = [];

  const transactionMatch = message.match(
    /\b([A-Z0-9]{8,12})\s+Confirmed\b/i
  );

  const amountMatch = message.match(
    /Ksh\s*([\d,]+(?:\.\d{2})?)/i
  );

  const senderMatch = message.match(
    /from\s+(.+?)\s+(07\d{2}(?:\*{3}\d{3}|\d{6})|01\d{2}(?:\*{3}\d{3}|\d{6}))\s+on\b/i
  );

  const dateMatch = message.match(
    /\bon\s+(\d{1,2}\/\d{1,2}\/\d{2,4})\b/i
  );

  const timeMatch = message.match(
    /\bat\s+(\d{1,2}:\d{2}\s*(?:AM|PM))\b/i
  );

  if (!transactionMatch) {
    errors.push("Transaction code could not be detected.");
  }

  if (!amountMatch) {
    errors.push("Payment amount could not be detected.");
  }

  if (!senderMatch) {
    errors.push(
      "Payer name and phone number could not be detected."
    );
  }

  if (!dateMatch) {
    errors.push("Payment date could not be detected.");
  }

  if (!timeMatch) {
    errors.push("Payment time could not be detected.");
  }

  if (errors.length > 0) {
    return {
      success: false,
      errors,
    };
  }

  const transactionCode =
    transactionMatch![1].toUpperCase();

  const amount = Number(
    amountMatch![1].replace(/,/g, "")
  );

  if (!Number.isFinite(amount) || amount <= 0) {
    return {
      success: false,
      errors: [
        "The payment amount is invalid.",
      ],
    };
  }

  const payerName = senderMatch![1].trim();
  const phoneNumber = senderMatch![2];

  const paymentDate = dateMatch![1];
  const paymentTime = timeMatch![1];

  const payment: PaymentDetails = {
    transactionCode,
    amount,
    payerName,
    phoneNumber,
    paymentDate,
    paymentTime,
  };

  return {
    success: true,
    data: payment,
    errors: [],
  };
}