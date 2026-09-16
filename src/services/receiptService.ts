import type { Receipt } from "../types/receipt";
import {
  getNextReceiptNumber,
  saveReceiptNumber,
} from "../utils/receiptNumber";
import { validateReceipt } from "./receiptValidator";

export function finalizeReceipt(
  receipt: Receipt
): Receipt {
  const validation =
    validateReceipt(receipt);

  if (!validation.valid) {
    throw new Error(
      validation.errors.join(" ")
    );
  }

  const receiptNumber =
    getNextReceiptNumber(
      receipt.landlord.receiptPrefix
    );

  const finalizedReceipt: Receipt = {
    ...receipt,
    receiptNumber,
  };

  saveReceiptNumber(receiptNumber);

  return finalizedReceipt;
}