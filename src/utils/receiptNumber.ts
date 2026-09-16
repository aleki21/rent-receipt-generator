const STORAGE_KEY = "receipt_number";

export function getNextReceiptNumber(
  prefix: string
): string {
  const storedValue = localStorage.getItem(
    STORAGE_KEY
  );

  const currentNumber = Number(storedValue);

  const safeCurrentNumber =
    Number.isFinite(currentNumber) && currentNumber >= 0
      ? currentNumber
      : 0;

  const nextNumber = safeCurrentNumber + 1;

  return `${prefix}-${String(nextNumber).padStart(5, "0")}`;
}

export function saveReceiptNumber(
  receiptNumber: string
): void {
  const match = receiptNumber.match(
    /(\d+)$/
  );

  if (!match) {
    return;
  }

  const number = Number(match[1]);

  if (!Number.isFinite(number)) {
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    String(number)
  );
}