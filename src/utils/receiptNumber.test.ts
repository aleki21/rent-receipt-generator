import { beforeEach, describe, expect, it } from "vitest";
import {
  getNextReceiptNumber,
  saveReceiptNumber,
} from "./receiptNumber";

describe("receipt number utilities", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("generates the first receipt number", () => {
    const receiptNumber =
      getNextReceiptNumber("REC");

    expect(receiptNumber).toBe("REC-00001");
  });

  it("continues from the saved receipt number", () => {
    saveReceiptNumber("REC-00001");

    const receiptNumber =
      getNextReceiptNumber("REC");

    expect(receiptNumber).toBe("REC-00002");
  });

  it("handles invalid stored values", () => {
    localStorage.setItem(
      "receipt_number",
      "invalid"
    );

    const receiptNumber =
      getNextReceiptNumber("REC");

    expect(receiptNumber).toBe("REC-00001");
  });

  it("supports different receipt prefixes", () => {
    const receiptNumber =
      getNextReceiptNumber("RENT");

    expect(receiptNumber).toBe("RENT-00001");
  });

  it("extracts the number from a saved receipt", () => {
    saveReceiptNumber("RENT-00125");

    const receiptNumber =
      getNextReceiptNumber("RENT");

    expect(receiptNumber).toBe("RENT-00126");
  });
});