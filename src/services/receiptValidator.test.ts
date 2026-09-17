import { describe, expect, it } from "vitest";
import type { Receipt } from "../types/receipt";
import { validateReceipt } from "./receiptValidator";

function createValidReceipt(): Receipt {
  return {
    receiptNumber: "DRAFT",
    issueDate: "2026-09-16",

    payment: {
      transactionCode: "QJH7K2L9P3",
      amount: 15000,
      payerName: "JOHN KIPKEMOI",
      phoneNumber: "0712345678",
      paymentDate: "14/9/26",
      paymentTime: "10:42 AM",
    },

    rentalPeriod: {
      startDate: "2026-09-01",
      endDate: "2026-09-30",
      description: "Rent for September 2026",
    },

    landlord: {
      businessName: "Alex Rentals",
      phoneNumber: "0712345678",
      address: "Nairobi, Kenya",
      receiptPrefix: "REC",
    },

    paymentMethod: "M-PESA",
  };
}

describe("validateReceipt", () => {
  it("accepts a valid receipt", () => {
    const receipt = createValidReceipt();

    const result = validateReceipt(receipt);

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("rejects a missing transaction code", () => {
    const receipt = createValidReceipt();

    receipt.payment.transactionCode = "";

    const result = validateReceipt(receipt);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Transaction code is required."
    );
  });

  it("rejects an invalid payment amount", () => {
    const receipt = createValidReceipt();

    receipt.payment.amount = 0;

    const result = validateReceipt(receipt);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Payment amount must be greater than zero."
    );
  });

  it("rejects a missing payer name", () => {
    const receipt = createValidReceipt();

    receipt.payment.payerName = "";

    const result = validateReceipt(receipt);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Payer name is required."
    );
  });

  it("accepts a receipt without a payer phone number", () => {
    const receipt = createValidReceipt();

    receipt.payment.phoneNumber = undefined;

    const result = validateReceipt(receipt);

    expect(result.valid).toBe(true);
  });

  it("rejects a missing payment date", () => {
    const receipt = createValidReceipt();

    receipt.payment.paymentDate = "";

    const result = validateReceipt(receipt);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Payment date is required."
    );
  });

  it("rejects a missing payment time", () => {
    const receipt = createValidReceipt();

    receipt.payment.paymentTime = "";

    const result = validateReceipt(receipt);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Payment time is required."
    );
  });

  it("rejects a missing rental start date", () => {
    const receipt = createValidReceipt();

    receipt.rentalPeriod.startDate = "";

    const result = validateReceipt(receipt);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Rental period start date is required."
    );
  });

  it("rejects a missing rental end date", () => {
    const receipt = createValidReceipt();

    receipt.rentalPeriod.endDate = "";

    const result = validateReceipt(receipt);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Rental period end date is required."
    );
  });

  it("rejects an invalid rental date range", () => {
    const receipt = createValidReceipt();

    receipt.rentalPeriod.startDate =
      "2026-09-30";

    receipt.rentalPeriod.endDate =
      "2026-09-01";

    const result = validateReceipt(receipt);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Rental period end date cannot be before the start date."
    );
  });

  it("rejects a missing landlord name", () => {
    const receipt = createValidReceipt();

    receipt.landlord.businessName = "";

    const result = validateReceipt(receipt);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Landlord or business name is required."
    );
  });

  it("rejects a missing landlord phone number", () => {
    const receipt = createValidReceipt();

    receipt.landlord.phoneNumber = "";

    const result = validateReceipt(receipt);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Landlord phone number is required."
    );
  });

  it("reports multiple validation errors", () => {
    const receipt = createValidReceipt();

    receipt.payment.transactionCode = "";
    receipt.payment.amount = 0;
    receipt.payment.payerName = "";
    receipt.landlord.businessName = "";

    const result = validateReceipt(receipt);

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBe(4);
  });
});