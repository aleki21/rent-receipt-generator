const STORAGE_KEY = "receipt_number";

export function getNextReceiptNumber(
  prefix: string
): string {
  const normalizedPrefix =
    prefix.trim().toUpperCase() || "REC";

  const storedValue =
    localStorage.getItem(STORAGE_KEY);

  let currentNumber = 0;

  if (storedValue) {
    try {
      const storedData = JSON.parse(storedValue);

      if (
        storedData &&
        typeof storedData === "object" &&
        storedData.prefix === normalizedPrefix &&
        Number.isFinite(storedData.number)
      ) {
        currentNumber = storedData.number;
      }
    } catch {
      currentNumber = 0;
    }
  }

  const nextNumber = currentNumber + 1;

  return `${normalizedPrefix}-${String(
    nextNumber
  ).padStart(5, "0")}`;
}

export function saveReceiptNumber(
  receiptNumber: string
): void {
  const match = receiptNumber.match(
    /^(.+)-(\d+)$/
  );

  if (!match) {
    return;
  }

  const prefix = match[1];
  const number = Number(match[2]);

  if (!Number.isFinite(number)) {
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      prefix,
      number,
    })
  );
}