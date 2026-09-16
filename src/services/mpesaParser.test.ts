import { describe, expect, it } from "vitest";
import { parseMpesaMessage } from "./mpesaParser";

describe("parseMpesaMessage", () => {
  it("parses a valid M-Pesa confirmation", () => {
    const message =
      "QJH7K2L9P3 Confirmed. Ksh15,000.00 received " +
      "from JOHN KIPKEMOI 0712345678 on 14/9/26 " +
      "at 10:42 AM. New M-PESA balance is Ksh45,000.00.";

    const result = parseMpesaMessage(message);

    expect(result.success).toBe(true);

    expect(result.data).toEqual({
      transactionCode: "QJH7K2L9P3",
      amount: 15000,
      payerName: "JOHN KIPKEMOI",
      phoneNumber: "0712345678",
      paymentDate: "14/9/26",
      paymentTime: "10:42 AM",
    });
  });

  it("does not include the M-Pesa balance as the payment amount", () => {
    const message =
      "QJH7K2L9P3 Confirmed. Ksh15,000.00 received " +
      "from JOHN KIPKEMOI 0712345678 on 14/9/26 " +
      "at 10:42 AM. New M-PESA balance is Ksh45,000.00.";

    const result = parseMpesaMessage(message);

    expect(result.success).toBe(true);
    expect(result.data?.amount).toBe(15000);
  });

  it("rejects an incomplete message", () => {
    const message =
      "QJH7K2L9P3 Confirmed. Ksh15,000.00 received.";

    const result = parseMpesaMessage(message);

    expect(result.success).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("rejects a message without a transaction code", () => {
    const message =
      "Ksh15,000.00 received from JOHN KIPKEMOI " +
      "0712345678 on 14/9/26 at 10:42 AM.";

    const result = parseMpesaMessage(message);

    expect(result.success).toBe(false);
    expect(result.errors).toContain(
      "Transaction code could not be detected."
    );
  });

  it("rejects a message without an amount", () => {
    const message =
      "QJH7K2L9P3 Confirmed. Payment received from " +
      "JOHN KIPKEMOI 0712345678 on 14/9/26 at 10:42 AM.";

    const result = parseMpesaMessage(message);

    expect(result.success).toBe(false);
    expect(result.errors).toContain(
      "Payment amount could not be detected."
    );
  });
});