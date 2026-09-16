export function formatDate(dateString: string): string {
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