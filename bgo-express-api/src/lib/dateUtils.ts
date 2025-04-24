export const parseDate = (date: Date | null): string | null => {
  return date ? new Date(date).toISOString() : null
}
