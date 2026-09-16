const STORAGE_KEY = "receipt_number";

export function getNextReceiptNumber(prefix: string): string {
  const currentNumber = Number(
    localStorage.getItem(STORAGE_KEY) || "0"
  );

  const nextNumber = currentNumber + 1;

  localStorage.setItem(STORAGE_KEY, String(nextNumber));

  return `${prefix}-${String(nextNumber).padStart(5, "0")}`;
}