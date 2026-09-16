export function formatDate(dateString: string): string {
  const parts = dateString.split("/");

  if (parts.length === 3) {
    const day = Number(parts[0]);
    const month = Number(parts[1]);
    let year = Number(parts[2]);

    if (year < 100) {
      year += 2000;
    }

    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-KE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const date = new Date(dateString);

  return date.toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getToday(): string {
  return new Date().toISOString().split("T")[0];
}