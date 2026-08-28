export const resolveDropdownWidth = (
  width: 'auto' | 'trigger' | 'full' | number | string,
  triggerWidth?: number,
  containerWidth?: number
): string | number | undefined => {
  if (width === 'full') return containerWidth;
  if (width === 'trigger') return triggerWidth;
  if (width === 'auto') return undefined;
  if (typeof width === 'number') return `${width}px`;
  return width;
};
