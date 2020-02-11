import { isToday, isPast } from "date-fns";

export const focusOnElementById = (id: string, document: Document) => {
  document.getElementById(id)?.focus();
  return document.getElementById(id);
};

export const isOverdue = (deadline: Date) => {
  return isPast(deadline) && !isToday(deadline);
};

export const colors = {
  positive: "violet" as any,
  negative: "pink" as any
};
