import { format, isToday, parseISO } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const formatDisplayDate = (date: Date): string => {
  return format(date, 'MMMM d, yyyy');
};

export const isDateToday = (date: string): boolean => {
  return isToday(parseISO(date));
};

export const getTodayFormatted = (): string => {
  return formatDate(new Date());
};

export const getMonthDay = (date: Date): string => {
  return format(date, 'MM-dd');
};