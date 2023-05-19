export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formattedDate: string = date.toLocaleDateString("pt-BR", options);

  return formattedDate;
}
