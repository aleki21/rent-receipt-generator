import type { Receipt } from "../types/receipt";

export interface ReceiptValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateReceipt(
  receipt: Receipt
): ReceiptValidationResult {
  const errors: string[] = [];

  // Payment validation
  if (!receipt.payment.transactionCode.trim()) {
    errors.push(
      "Transaction code is required."
    );
  }

  if (
    !Number.isFinite(receipt.payment.amount) ||
    receipt.payment.amount <= 0
  ) {
    errors.push(
      "Payment amount must be greater than zero."
    );
  }

  if (!receipt.payment.payerName.trim()) {
    errors.push(
      "Payer name is required."
    );
  }

  if (!receipt.payment.phoneNumber.trim()) {
    errors.push(
      "Payer phone number is required."
    );
  }

  if (!receipt.payment.paymentDate.trim()) {
    errors.push(
      "Payment date is required."
    );
  }

  if (!receipt.payment.paymentTime.trim()) {
    errors.push(
      "Payment time is required."
    );
  }

  // Rental period validation
  if (!receipt.rentalPeriod.startDate) {
    errors.push(
      "Rental period start date is required."
    );
  }

  if (!receipt.rentalPeriod.endDate) {
    errors.push(
      "Rental period end date is required."
    );
  }

  if (
    receipt.rentalPeriod.startDate &&
    receipt.rentalPeriod.endDate &&
    receipt.rentalPeriod.endDate <
      receipt.rentalPeriod.startDate
  ) {
    errors.push(
      "Rental period end date cannot be before the start date."
    );
  }

  // Landlord validation
  if (!receipt.landlord.businessName.trim()) {
    errors.push(
      "Landlord or business name is required."
    );
  }

  if (!receipt.landlord.phoneNumber.trim()) {
    errors.push(
      "Landlord phone number is required."
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}