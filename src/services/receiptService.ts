import type { Receipt } from "../types/receipt";
import {
  getNextReceiptNumber,
  saveReceiptNumber,
} from "../utils/receiptNumber";

export function finalizeReceipt(receipt: Receipt): Receipt {
  const receiptNumber = getNextReceiptNumber(
    receipt.landlord.receiptPrefix
  );

  const finalizedReceipt: Receipt = {
    ...receipt,
    receiptNumber,
  };

  saveReceiptNumber(receiptNumber);

  return finalizedReceipt;
}