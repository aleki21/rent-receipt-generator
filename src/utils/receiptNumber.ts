const STORAGE_KEY = "receipt_number";

export function getNextReceiptNumber(
  prefix: string
): string {
  const currentNumber = Number(
    localStorage.getItem(STORAGE_KEY) || "0"
  );

  const nextNumber = currentNumber + 1;

  return `${prefix}-${String(nextNumber).padStart(5, "0")}`;
}

export function saveReceiptNumber(
  receiptNumber: string
): void {
  const number = Number(
    receiptNumber.split("-").pop()
  );

  localStorage.setItem(
    STORAGE_KEY,
    String(number)
  );
}