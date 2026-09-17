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

  it("parses M-Pesa messages with masked phone numbers", () => {
    const message =
        "UIFG26DTEV Confirmed.You have received Ksh2,000.00 from CHEPKURUI  NANCY 0721***985 on 15/9/26 at 12:26 PM  New M-PESA balance is Ksh2,010.44. Invest & earn daily interest with ZIIDI on https://saf.cx/cF6ir";

    const result = parseMpesaMessage(message);

    expect(result.success).toBe(true);

    expect(result.data).toEqual({
        transactionCode: "UIFG26DTEV",
        amount: 2000,
        payerName: "CHEPKURUI  NANCY",
        phoneNumber: "0721***985",
        paymentDate: "15/9/26",
        paymentTime: "12:26 PM",
    });
    });

    it("handles Confirmed followed immediately by the message", () => {
        const message =
            "UIFG26DTEV Confirmed.You have received Ksh2,000.00 from CHEPKURUI NANCY 0721***985 on 15/9/26 at 12:26 PM New M-PESA balance is Ksh2,010.44.";

        const result = parseMpesaMessage(message);

        expect(result.success).toBe(true);
        expect(result.data?.transactionCode).toBe("UIFG26DTEV");
        expect(result.data?.amount).toBe(2000);
    });

    it("handles extra spaces between payer name and phone number", () => {
        const message =
            "UIFG26DTEV Confirmed. You have received Ksh2,000.00 from CHEPKURUI    NANCY    0721***985 on 15/9/26 at 12:26 PM.";

        const result = parseMpesaMessage(message);

        expect(result.success).toBe(true);
        expect(result.data?.payerName).toBe(
            "CHEPKURUI    NANCY"
        );
        expect(result.data?.phoneNumber).toBe(
            "0721***985"
        );
    });

    it("handles a full unmasked phone number", () => {
        const message =
            "UIFG26DTEV Confirmed. You have received Ksh2,000.00 from JOHN KIPKEMOI 0721234567 on 15/9/26 at 12:26 PM.";

        const result = parseMpesaMessage(message);

        expect(result.success).toBe(true);
        expect(result.data?.payerName).toBe(
            "JOHN KIPKEMOI"
        );
        expect(result.data?.phoneNumber).toBe(
            "0721234567"
        );
    });

    it("ignores the M-Pesa balance when extracting the payment amount", () => {
        const message =
            "UIFG26DTEV Confirmed. You have received Ksh2,000.00 from JOHN KIPKEMOI 0721234567 on 15/9/26 at 12:26 PM. New M-PESA balance is Ksh25,000.00.";

        const result = parseMpesaMessage(message);

        expect(result.success).toBe(true);
        expect(result.data?.amount).toBe(2000);
    });

    it("parses payments from Remitly without a phone number", () => {
      const message =
        "UHBG22AE4L confirmed. You have received Ksh200,001.00 from Anyier Anei in GB via Remitly on 11/8/26 at 12:04 PM. New M-PESA balance is Ksh345,964.50.";

      const result = parseMpesaMessage(message);

      expect(result.success).toBe(true);

      expect(result.data).toEqual({
        transactionCode: "UHBG22AE4L",
        amount: 200001,
        payerName: "Anyier Anei in GB via Remitly",
        phoneNumber: undefined,
        paymentDate: "11/8/26",
        paymentTime: "12:04 PM",
      });
    });
});