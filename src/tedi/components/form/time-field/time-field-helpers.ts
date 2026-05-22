/* istanbul ignore file */
export const ITEM_HEIGHT = 40;
export const TIMEPICKER_OFFSET = 6;

/**
 * Generates an array of hours (00–23)
 */
export const generateHours = (): string[] => {
  return Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
};

/**
 * Generates minute values based on a step (e.g. 5, 10, 15)
 */
export const generateMinutes = (stepMinutes: number): string[] => {
  const step = Math.max(1, stepMinutes ?? 1);
  const mins: string[] = [];

  for (let i = 0; i < 60; i += step) {
    mins.push(i.toString().padStart(2, '0'));
  }

  return mins;
};

/**
 * Finds the closest available minute to a target value
 */
export const findClosestMinute = (target: string, mins: string[]): string => {
  if (!mins.length) return '00';

  const t = Number(target);

  if (isNaN(t)) return mins[0];

  return mins.reduce((best, curr) => {
    const diff = Math.abs(Number(curr) - t);
    const bestDiff = Math.abs(Number(best) - t);

    return diff < bestDiff || (diff === bestDiff && Number(curr) > Number(best)) ? curr : best;
  }, mins[0]);
};

/**
 * Parses HH:mm time string
 */
export const parseTime = (time: string): { hour: string; minute: string } => {
  if (!time || !time.includes(':')) {
    return { hour: '00', minute: '00' };
  }

  const [hour, minute] = time.split(':');
  return {
    hour: hour.padStart(2, '0'),
    minute: minute.padStart(2, '0'),
  };
};

/**
 * Returns nearest wheel index from scroll position
 */
export const snapToNearestItem = (scrollTop: number, length: number): number => {
  const index = Math.round(scrollTop / ITEM_HEIGHT);

  return Math.max(0, Math.min(index, length - 1));
};

/**
 * Returns scrollTop position for index
 */
export const getScrollTopForIndex = (index: number) => index * ITEM_HEIGHT;

/**
 * Checks if scroll correction is needed
 */
export const needsScrollCorrection = (current: number, target: number, tolerance = 1) =>
  Math.abs(current - target) > tolerance;

/**
 * Scrolls element to index
 */
export const scrollToIndex = (element: HTMLDivElement, index: number, behavior: ScrollBehavior = 'auto') => {
  element.scrollTo({
    top: getScrollTopForIndex(index),
    behavior,
  });
};

/**
 * Clears scroll timeout safely
 */
export const clearScrollTimeout = (timeout?: NodeJS.Timeout) => {
  if (timeout) clearTimeout(timeout);
};

export const isValidTime = (time: string): boolean => {
  if (!time) return false;
  const regex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(time.trim());
};

/**
 * Normalizes common typing patterns into HH:mm or returns null if impossible
 * Examples:
 *   "9:5"   → "09:05"
 *   "14:5"  → "14:05"
 *   "2359"  → "23:59"
 *   "4:89"  → null
 */
export const normalizeTime = (input: string): string | null => {
  const cleaned = input.trim();
  if (!cleaned) return '';

  if (isValidTime(cleaned)) return cleaned;

  const digitsOnly = cleaned.replace(/[^0-9]/g, '');
  if (digitsOnly.length === 3) {
    const h = digitsOnly.slice(0, 1).padStart(2, '0');
    const m = digitsOnly.slice(1);
    const candidate = `${h}:${m}`;
    return isValidTime(candidate) ? candidate : null;
  }
  if (digitsOnly.length === 4) {
    const h = digitsOnly.slice(0, 2);
    const m = digitsOnly.slice(2);
    const candidate = `${h}:${m}`;
    return isValidTime(candidate) ? candidate : null;
  }

  if (cleaned.includes(':')) {
    const [hPart, mPart] = cleaned.split(':');
    const hour = parseInt(hPart, 10);
    const min = parseInt(mPart, 10);

    if (!isNaN(hour) && !isNaN(min) && hour >= 0 && hour <= 23 && min >= 0 && min <= 59) {
      return `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
    }
  }

  return null;
};
